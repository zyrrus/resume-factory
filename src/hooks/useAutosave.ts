"use client";

import { useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import { type DeepPartial, useFormContext } from "react-hook-form";
import { useCVStore } from "~/hooks/stores/useCVStore";
import { useStore } from "~/hooks/stores/useStore";
import { type ResumeFormSchema } from "~/lib/schemas/resume-form-schema";

/**
 * debounced delay between saves, passed to lodash debounce wait parameter
 */
const debounce_save_delay = 500;
/**
 * max save between debounced saves
 */
const max_save_delay = 5000;

export const useAutosave = () => {
  const local = useCVStore();
  const form = useFormContext<ResumeFormSchema>();

  const debouncedLocalSave = useMemo(
    () =>
      debounce(
        (value: DeepPartial<ResumeFormSchema>) => {
          local.save(value);
        },
        debounce_save_delay,
        {
          leading: false,
          trailing: true,
          maxWait: max_save_delay,
        },
      ),
    [],
  );

  useEffect(() => {
    const { unsubscribe } = form.watch((value) => {
      debouncedLocalSave(value);
    });
    return () => unsubscribe();
  }, [form.watch]);
};
