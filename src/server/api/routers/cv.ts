import { and, eq, like, sql } from "drizzle-orm";
import {
  type DatedCVSchema,
  resumeFormSchema,
} from "~/lib/schemas/resume-form-schema";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { cv, field } from "~/server/db/schema";
import {
  flattenObject,
  unflattenObject,
} from "~/lib/utils/object-tranformations";
import { type DeepPartial } from "react-hook-form";
import { removePrefix } from "~/lib/utils/strings";

export const cvRouter = createTRPCRouter({
  load: protectedProcedure.query(async ({ ctx }) => {
    const cvRow = await ctx.db.query.cv.findFirst({
      where: eq(cv.uid, ctx.auth.userId),
    });

    if (!cvRow) {
      // TODO: Throw error: CV not found
      return;
    }

    // Get all fields
    const prefix = `cv.${cvRow.uid}.`;
    const fieldRows = await ctx.db.query.field.findMany({
      columns: { field: true, value: true },
      where: and(eq(field.cvUid, cvRow.uid), like(field.field, `${prefix}%`)),
    });

    // Reconstruct CV object from fields list
    const fieldEntries = fieldRows.map(
      ({ field, value }) =>
        [removePrefix(field, prefix), value ?? ""] as [string, string],
    );
    const fields = Object.fromEntries(fieldEntries);
    const remoteCV = unflattenObject(fields) as DeepPartial<DatedCVSchema>;

    return { ...remoteCV, lastUpdated: cvRow.lastUpdated.toISOString() };
  }),
  save: protectedProcedure
    .input(resumeFormSchema)
    .mutation(async ({ input, ctx }) => {
      const lastUpdated = new Date();
      await ctx.db.transaction(async (tx) => {
        try {
          // Upsert CV
          const cvRow = await tx
            .insert(cv)
            .values({ uid: ctx.auth.userId, lastUpdated })
            .onConflictDoUpdate({
              target: cv.uid,
              set: { lastUpdated },
            })
            .returning({ uid: cv.uid });
          const cvUid = cvRow[0]!.uid;

          // Upsert Fields
          const fieldPaths = flattenObject(input, `cv.${cvUid}`);
          const fields = await tx
            .insert(field)
            .values(
              Object.entries(fieldPaths).map(([field, value]) => ({
                cvUid,
                field,
                value,
              })),
            )
            .onConflictDoUpdate({
              target: field.field,
              set: { value: sql`excluded.value` },
            });
        } catch (error) {
          console.error("Transaction failed:", error);
          throw error;
        }
      });
    }),
});
