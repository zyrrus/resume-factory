"use client";

import { useLocalCVStorage } from "~/hooks/cv/useLocalCVStorage";
import { useRemoteCVStorage } from "~/hooks/cv/useRemoteCVStorage";
import { useCVStorage } from "~/hooks/cv/useCVStorage";
import { useFormContext } from "react-hook-form";
import { type ResumeFormSchema } from "~/lib/schemas/resume-form-schema";
import { useCallback, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import isEqual from "lodash.isequal";

/**
 * Combines the local and remote autosave functionality
 */
export const useCVAutosave = () => {
  useLocalCVAutosave();
  return useRemoteCVAutosave();
};

/**
 * @param debounceSaveDelay - debounced delay between saves, passed to lodash debounce wait parameter
 * @param maxSaveDelay - max save between debounced saves
 */
const useLocalCVAutosave = (debounceSaveDelay = 250, maxSaveDelay = 2500) => {
  const { saveToLocal } = useLocalCVStorage();

  const form = useFormContext<ResumeFormSchema>();

  const debouncedLocalSave = useMemo(
    () =>
      debounce(saveToLocal, debounceSaveDelay, {
        leading: false,
        trailing: true,
        maxWait: maxSaveDelay,
      }),
    [],
  );

  useEffect(() => {
    const { unsubscribe } = form.watch((value) => {
      debouncedLocalSave(value);
    });
    return () => unsubscribe();
  }, [form.watch]);
};

const useRemoteCVAutosave = () => {
  const { latestCV } = useCVStorage();
  const { remoteCV, saveToRemote, query: remoteQuery } = useRemoteCVStorage();

  const save = useCallback(() => {
    saveToRemote(latestCV);
  }, [latestCV]);

  const isDirty = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return !isEqual(latestCV, remoteCV);
  }, [JSON.stringify(latestCV), JSON.stringify(remoteCV)]);

  /**
   * Call saveToRemote() after a 1 minute timer if dirty
   * Cancel timer otherwise
   */
  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined = undefined;

    if (isDirty && timerId === undefined) {
      console.log("STARTING TIMER");
      timerId = setTimeout(save, 5000);
    }

    return () => {
      if (timerId) {
        console.log("CANCELLED TIMER");
        clearTimeout(timerId);
      }
    };
  }, [isDirty]);

  return {
    isSaving: remoteQuery.isLoading,
    lastSaveDate: remoteQuery.data?.lastUpdated
      ? new Date(remoteQuery.data.lastUpdated)
      : undefined,
    save,
  };
};
