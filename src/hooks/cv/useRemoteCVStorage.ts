"use client";

import { type DeepPartial } from "react-hook-form";
import { toast } from "sonner";
import {
  type ResumeFormSchema,
  resumeFormSchema,
} from "~/lib/schemas/resume-form-schema";
import { api } from "~/trpc/react";

export const useRemoteCVStorage = () => {
  const query = api.cv.load.useQuery(undefined, { enabled: false });

  const { mutate } = api.cv.save.useMutation({
    onError: (error) => {
      toast.error(
        "There was an issue while autosaving remotely. Check the console for more details.",
      );
      console.error(error.message);
    },
  });

  const saveToRemote = (value: DeepPartial<ResumeFormSchema>) => {
    console.log("SAVING REMOTELY");

    const parsed = resumeFormSchema.safeParse(value);
    if (parsed.success && parsed.data) {
      mutate(parsed.data);
    } else {
      toast.error(
        "There was an issue with the formatting of your inputs. Check the console for more details.",
      );
      console.error(parsed.error.message);
    }
  };

  return { query, remoteCV: query.data, saveToRemote };
};
