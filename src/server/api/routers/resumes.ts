import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { resume } from "~/server/db/schema";

export const resumeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    // For now, a CV's unique ID is the same as their Clerk ID
    const cvUid = ctx.auth.userId;
    const resumes = await ctx.db.query.resume.findMany({
      where: eq(resume.cvUid, cvUid),
    });

    return resumes.map(({ name, uid }) => ({
      id: uid,
      name,
    }));
  }),
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // For now, a CV's unique ID is the same as their Clerk ID
      const cvUid = ctx.auth.userId;

      return ctx.db
        .insert(resume)
        .values({ name: input.name, cvUid })
        .returning({
          id: resume.uid,
          name: resume.name,
          lastUpdated: resume.lastUpdated,
        });
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      // For now, a CV's unique ID is the same as their Clerk ID
      const cvUid = ctx.auth.userId;

      const resumeRow = await ctx.db.query.resume.findFirst({
        where: and(eq(resume.cvUid, cvUid), eq(resume.uid, input.id)),
      });

      if (!resumeRow) {
        // TODO: throw resume not found error
        console.error("Could not find resume with ID: ", input.id);
      }

      return resumeRow;
    }),
});
