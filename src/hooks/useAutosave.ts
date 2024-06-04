"use client";

import { useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import { useFormContext } from "react-hook-form";
import { type ResumeFormSchema } from "~/lib/schemas/resume-form-schema";
import { useCVStorage } from "./useCVStorage";

/**
 * debounced delay between saves, passed to lodash debounce wait parameter
 */
const debounce_save_delay = 500;
/**
 * max save between debounced saves
 */
const max_save_delay = 5000;

export const useAutosave = () => {
  const { saveToLocal } = useCVStorage();
  const form = useFormContext<ResumeFormSchema>();

  const debouncedLocalSave = useMemo(
    () =>
      debounce(saveToLocal, debounce_save_delay, {
        leading: false,
        trailing: true,
        maxWait: max_save_delay,
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
