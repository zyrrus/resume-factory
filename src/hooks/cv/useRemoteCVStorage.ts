"use client";

import { type DeepPartial } from "react-hook-form";
import { toast } from "sonner";
import {
  type ResumeFormSchema,
  resumeFormSchema,
} from "~/lib/schemas/resume-form-schema";
import { api } from "~/trpc/react";

export const useRemoteCVStorage = () => {
  const query = api.cv.load.useQuery(undefined);

  const { mutate } = api.cv.save.useMutation({
    onError: (error) => {
      toast.error("There was an issue while autosaving remotely.");
      console.error(error.message);
    },
  });

  const utils = api.useUtils();
  const saveToRemote = (value: DeepPartial<ResumeFormSchema>) => {
    const parsed = resumeFormSchema.safeParse(value);
    if (parsed.success && parsed.data) {
      mutate(parsed.data, {
        onSuccess: () => {
          utils.cv.load.setData(undefined, {
            ...parsed.data,
            lastUpdated: new Date().toISOString(),
          });
        },
      });
    } else {
      toast.error(
        "There was an issue with the formatting of your inputs. Check the console for more details.",
      );
      console.error("Local Parsing Error:", parsed.error.message);
    }
  };

  return { query, remoteCV: query.data, saveToRemote };
};
