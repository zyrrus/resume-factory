export const queryKeys = {
  /**
   * @param userId - Clerk user id
   * @returns  a unique CV access key
   */
  cv: (userId: string) => `cv-${userId}`,
};
