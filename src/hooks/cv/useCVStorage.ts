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
  // const { localCV, query: localQuery } = useLocalCVStorage();
  const { remoteCV, query: remoteQuery } = useRemoteCVStorage();

  const isLoading = /*localQuery.isLoading ||*/ remoteQuery.isLoading;

  const getLatestCV = () => {
    let latestCV: DatedCVSchema;

    if (isLoading) return;
    return remoteCV ?? defaultValues;

    // If they both exist, pick the newest one
    // if (localCV && remoteCV) {
    //   latestCV =
    //     localCV.lastUpdated! > remoteCV.lastUpdated
    //       ? localCV
    //       : (remoteCV as DatedCVSchema);
    // } else {
    //   latestCV =
    //     localCV ?? (remoteCV as DatedCVSchema | undefined) ?? defaultValues;
    // }

    return latestCV;
  };

  const latestCV = useMemo(getLatestCV, [/*localCV, */ remoteCV, isLoading]);

  return {
    query: { isLoading },
    latestCV,
    getLatestCV,
  };
};
