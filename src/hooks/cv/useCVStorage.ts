"use client";

import {
  type DatedCVSchema,
  defaultValues,
} from "~/lib/schemas/resume-form-schema";
import { useLocalCVStorage } from "~/hooks/cv/useLocalCVStorage";
import { useRemoteCVStorage } from "~/hooks/cv/useRemoteCVStorage";
import { useMemo } from "react";

/**
 * Fetches the latest CV out of the local and remote versions
 */
export const useCVStorage = () => {
  const { localCV, query: localQuery } = useLocalCVStorage();
  const { remoteCV, query: remoteQuery } = useRemoteCVStorage();

  const latestCV = useMemo(() => {
    let latestCV: DatedCVSchema;

    // If they both exist, pick the newest one
    if (localCV && remoteCV) {
      latestCV =
        localCV.lastUpdated! > remoteCV.lastUpdated
          ? localCV
          : (remoteCV as DatedCVSchema);
    } else {
      latestCV =
        localCV ?? (remoteCV as DatedCVSchema | undefined) ?? defaultValues;
    }

    return latestCV;
  }, [localCV, remoteCV]);

  return {
    query: {
      isLoading: localQuery.isLoading || remoteQuery.isLoading,
    },
    latestCV,
  };
};
