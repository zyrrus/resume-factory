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
  const key =
    user?.id !== undefined ? queryKeys.cv("local", user.id) : undefined;

  const query = useQuery<DatedCVSchema>({
    queryKey: key!,
    queryFn: () => {
      console.log("SAVING LOCALLY");
      const localCV = getFromLocal(key![1]);
      return localCV;
    },
    enabled: key !== undefined,
  });

  const saveToLocal = (value: DeepPartial<ResumeFormSchema>) => {
    if (!user?.id) {
      toast.error("Error: must be logged in to save CV locally.");
      return;
    }

    const storageKey = queryKeys.cvStorageKey(user.id);

    const parsed = resumeFormSchema.safeParse(value);
    if (parsed.success && parsed.data) {
      localStorage.setItem(
        storageKey,
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

  return { query, localCV: query.data, saveToLocal };
};
