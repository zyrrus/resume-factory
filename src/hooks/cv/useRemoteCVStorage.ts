"use client";

import { useUser } from "@clerk/nextjs";
import { type DeepPartial } from "react-hook-form";
import { toast } from "sonner";
import { queryKeys } from "~/lib/utils/query-keys";
import {
  type ResumeFormSchema,
  resumeFormSchema,
} from "~/lib/schemas/resume-form-schema";
import { api } from "~/trpc/react";

export const useRemoteCVStorage = () => {
  const { user } = useUser();
  const key = user?.id !== undefined ? queryKeys.cv(user.id) : undefined;

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
    if (!key) {
      toast.error("Error: tried to save CV without a key.");
      return;
    }

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
