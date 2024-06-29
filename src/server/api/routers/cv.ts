import { sql } from "drizzle-orm";
import { resumeFormSchema } from "~/lib/schemas/resume-form-schema";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { cv, field } from "~/server/db/schema";
import { flattenObject } from "~/server/db/utils";

export const cvRouter = createTRPCRouter({
  load: protectedProcedure.query(({ ctx }) => {
    // TODO:
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
            .values({ userId: ctx.auth.userId, lastUpdated })
            .onConflictDoUpdate({
              target: cv.userId,
              set: { lastUpdated },
            })
            .returning({ id: cv.id });
          const cvId = cvRow[0]!.id;
          // Upsert Fields
          const fieldPaths = flattenObject(input);
          const fields = await tx
            .insert(field)
            .values(
              Object.entries(fieldPaths).map(([field, value]) => ({
                cvId,
                field,
                value,
              })),
            )
            .onConflictDoUpdate({
              target: [field.cvId, field.field],
              set: { value: sql`excluded.value` },
            });
        } catch (error) {
          console.error("Transaction failed:", error);
          throw error;
        }
      });
    }),
});
