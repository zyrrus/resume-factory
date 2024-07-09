"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
    return merge({}, localCV, defaultValues);
  }
  return defaultValues;
};

export const useLocalCVStorage = () => {
  const { user } = useUser();
  const key =
    user?.id !== undefined ? queryKeys.cv("local", user.id) : undefined;

  const query = useQuery<DatedCVSchema>({
    queryKey: key!,
    enabled: key !== undefined,
    queryFn: () => {
      const localCV = getFromLocal(key![1]);
      return localCV;
    },
  });

  const queryClient = useQueryClient();
  const saveToLocal = (value: DeepPartial<ResumeFormSchema>) => {
    if (!user?.id) {
      console.error("Error: must be logged in to save CV locally.");
      return;
    }

    if (!key) {
      console.error("Error: cannot save CV locally without key.");
      return;
    }

    const storageKey = queryKeys.cvStorageKey(user.id);

    const parsed = resumeFormSchema.safeParse(value);
    if (parsed.success && parsed.data) {
      const localData = {
        ...parsed.data,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(storageKey, JSON.stringify(localData));
      queryClient.setQueryData(key, () => localData);
    } else {
      toast.error("There was an issue while autosaving locally.");
      console.error("Local Parsing Error:", parsed.error.message);
    }
  };

  return { query, localCV: query.data, saveToLocal };
};
