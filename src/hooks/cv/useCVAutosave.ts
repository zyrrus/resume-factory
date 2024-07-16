"use client";

import { useLocalCVStorage } from "~/hooks/cv/useLocalCVStorage";
import { useRemoteCVStorage } from "~/hooks/cv/useRemoteCVStorage";
import { useFormContext } from "react-hook-form";
import { type ResumeFormSchema } from "~/lib/schemas/resume-form-schema";
import { useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import isEqual from "lodash.isequal";

/**
 * Combines the local and remote autosave functionality
 */
export const useCVAutosave = () => {
  // useLocalCVAutosave();
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
  const { remoteCV, saveToRemote, query: remoteQuery } = useRemoteCVStorage();

  const form = useFormContext<ResumeFormSchema>();

  /**
   * Call saveToRemote() after a 1 minute timer if dirty
   * Cancel timer otherwise
   */
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    const clearTimer = () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };

    const { unsubscribe } = form.watch((formValues) => {
      try {
        if (!remoteCV || remoteQuery.isLoading) {
          console.error("NO REMOTE");
          return;
        }

        const { lastUpdated: formDate, ...formWithoutDate } =
          formValues as ResumeFormSchema & { lastUpdated?: string };
        const { lastUpdated: remoteDate, ...remoteWithoutDate } = remoteCV;
        const isDirty = !isEqual(formWithoutDate, remoteWithoutDate);

        if (isDirty) {
          clearTimer();
          timerId = setTimeout(() => {
            saveToRemote(formWithoutDate as ResumeFormSchema);
          }, 3000);
        }
      } catch (e) {
        console.error(e);
      }
    });

    return () => {
      clearTimer();
      unsubscribe();
    };
  }, [form.watch]);

  return {
    isSaving: remoteQuery.isLoading,
    lastSaveDate: remoteQuery.data?.lastUpdated
      ? new Date(remoteQuery.data.lastUpdated)
      : undefined,
  };
};
