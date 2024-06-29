import { useQuery } from "@tanstack/react-query";
import merge from "lodash.merge";
import { type DeepPartial } from "react-hook-form";
import { toast } from "sonner";
import {
  type ResumeFormSchema,
  defaultValues,
  resumeFormSchema,
} from "~/lib/schemas/resume-form-schema";

type CVSchema = ResumeFormSchema & { lastUpdated?: string };

export const useCVStorage = () => {
  const query = useQuery<CVSchema>({
    queryKey: ["cv"],
    queryFn: () => {
      const localCV = getFromLocal();
      // TODO: const remoteCV = getFromRemote();

      const newestCV = localCV; // TODO: remoteCV?.lastUpdated < localCV?.lastUpdated ? localCV : remoteCV;

      return newestCV;
    },
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
    const parsed = resumeFormSchema.safeParse(value);
    if (parsed.success && parsed.data) {
      localStorage.setItem(
        "cv",
        JSON.stringify({
          ...parsed.data,
          lastUpdated: new Date().toISOString(),
        }),
      );
    } else {
      toast.error("There was an issue while autosaving. Check the console.");
      console.log("ERROR", parsed.error.message);
    }
  };

  return { ...query, saveToLocal };
};
