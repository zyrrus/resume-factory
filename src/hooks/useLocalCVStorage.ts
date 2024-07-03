"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import merge from "lodash.merge";
import { type DeepPartial } from "react-hook-form";
import { toast } from "sonner";
import { queryKeys } from "~/lib/query-keys";
import {
  type ResumeFormSchema,
  defaultValues,
  resumeFormSchema,
} from "~/lib/schemas/resume-form-schema";

type CVSchema = ResumeFormSchema & { lastUpdated?: string };

export const useLocalCVStorage = () => {
  const { user } = useUser();
  const key = user?.id !== undefined ? queryKeys.cv(user.id, 0) : undefined;

  const query = useQuery<CVSchema>({
    queryKey: [key],
    queryFn: () => {
      const localCV = getFromLocal();
      return localCV;
    },
    enabled: key !== undefined,
  });

  const getFromLocal = () => {
    const localCVString = localStorage.getItem("cv");
    if (localCVString) {
      const localCV = JSON.parse(localCVString) as DeepPartial<CVSchema>;
      return merge({}, defaultValues, localCV);
    }
    return defaultValues;
  };

  const saveToLocal = (value: DeepPartial<ResumeFormSchema>) => {
    if (!key) {
      toast.error("Error: tried to save CV without a key");
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
      toast.error("There was an issue while autosaving. Check the console.");
      console.error(parsed.error.message);
    }
  };

  return { ...query, saveToLocal };
};
