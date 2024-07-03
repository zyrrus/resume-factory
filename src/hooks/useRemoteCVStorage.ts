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
  const key = user?.id !== undefined ? queryKeys.cv(user.id, 0) : undefined;

  const query = api.cv.load.useQuery(
    // id = 0 by default to support multiple CVs in the future
    { id: 0 },
    { enabled: false },
  );

  const { mutateAsync } = api.cv.save.useMutation();
  const saveToRemote = async (value: DeepPartial<ResumeFormSchema>) => {
    if (!key) {
      toast.error("Error: tried to save CV without a key.");
      return;
    }

    const parsed = resumeFormSchema.safeParse(value);
    if (parsed.success && parsed.data) {
      await mutateAsync(parsed.data);
    } else {
      toast.error(
        "There was an issue while autosaving remotely. Check the console.",
      );
      console.error(parsed.error.message);
    }
  };

  return { ...query, saveToRemote };
};
