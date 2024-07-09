"use client";

import {
  type DatedCVSchema,
  defaultValues,
} from "~/lib/schemas/resume-form-schema";
import { useLocalCVStorage } from "~/hooks/cv/useLocalCVStorage";
import { useRemoteCVStorage } from "~/hooks/cv/useRemoteCVStorage";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "~/lib/utils/query-keys";
import { useUser } from "@clerk/nextjs";

export const useCVStorage = () => {
  const { localCV, query: localQuery } = useLocalCVStorage();
  const { remoteCV, query: remoteQuery } = useRemoteCVStorage();

  const { user } = useUser();
  const key =
    user?.id !== undefined ? queryKeys.cv("latest", user.id) : undefined;

  const query = useQuery({
    queryKey: key!,
    enabled:
      key !== undefined && !localQuery.isLoading && !remoteQuery.isLoading,
    queryFn: () => {
      // Should not occur
      if (!key || localQuery.isLoading || remoteQuery.isLoading) return;

      let latestCV: DatedCVSchema;

      // If they both exist, pick the newest one
      if (localCV && remoteCV) {
        latestCV =
          localCV.lastUpdated! > remoteCV.lastUpdated!
            ? localCV
            : (remoteCV as DatedCVSchema);
      } else {
        latestCV =
          localCV ?? (remoteCV as DatedCVSchema | undefined) ?? defaultValues;
      }

      return latestCV;
    },
  });

  return {
    query,
    latestCV: query.data,
  };
};
