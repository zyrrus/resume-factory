/**
 * @param userId - Clerk user id
 * @returns  a unique CV access key
 */
const cvStorageKey = (userId: string) => `cv-${userId}` as const;

export const queryKeys = {
  cvStorageKey,
  /**
   * @param variant - A prefix to differentiate CV keys
   * @param userId - Clerk user id
   * @returns  a unique CV access key
   */
  cv: (variant: "local" | "remote" | "latest", userId: string) =>
    [variant, cvStorageKey(userId)] as const,
};
