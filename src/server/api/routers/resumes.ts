import { eq } from "drizzle-orm";
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
});
