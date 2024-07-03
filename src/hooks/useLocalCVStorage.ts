"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import merge from "lodash.merge";
import { type DeepPartial } from "react-hook-form";
import { toast } from "sonner";
import { queryKeys } from "~/lib/utils/query-keys";
import {
  type DatedCVSchema,
  type ResumeFormSchema,
  defaultValues,
  resumeFormSchema,
} from "~/lib/schemas/resume-form-schema";

const getFromLocal = (key: string) => {
  const localCVString = localStorage.getItem(key);
  if (localCVString) {
    const localCV = JSON.parse(localCVString) as DeepPartial<DatedCVSchema>;
    return merge({}, defaultValues, localCV);
  }
  return defaultValues;
};

export const useLocalCVStorage = () => {
  const { user } = useUser();
  const key = user?.id !== undefined ? queryKeys.cv(user.id) : undefined;

  const query = useQuery<DatedCVSchema>({
    queryKey: ["local", key],
    queryFn: () => {
      const localCV = getFromLocal(key!);
      return localCV;
    },
    enabled: key !== undefined,
  });

  const saveToLocal = (value: DeepPartial<ResumeFormSchema>) => {
    if (!key) {
      toast.error("Error: tried to save CV without a key.");
      return;
    }

    const parsed = resumeFormSchema.safeParse(value);
    if (parsed.success && parsed.data) {
      localStorage.setItem(
        key,
        JSON.stringify({
          ...parsed.data,
          lastUpdated: new Date().toISOString(),
        }),
      );
    } else {
      toast.error(
        "There was an issue while autosaving locally. Check the console.",
      );
      console.error(parsed.error.message);
    }
  };

  return { ...query, saveToLocal };
};
