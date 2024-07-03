export const queryKeys = {
  /**
   * @param userId - Clerk user id
   * @param id - CV id (defaults to 0 because we only allow one CV per user for now)
   * @returns  a unique CV access key
   */
  cv: (userId: string, id = 0) => `cv-${id}-${userId}`,
};
