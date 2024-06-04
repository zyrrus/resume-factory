import { useQuery } from "@tanstack/react-query";
import merge from "lodash.merge";
import { type DeepPartial } from "react-hook-form";
import { toast } from "sonner";
import {
  type ResumeFormSchema,
  defaultValues,
  resumeFormSchema,
} from "~/lib/schemas/resume-form-schema";

export const useCVStorage = () => {
  const query = useQuery<ResumeFormSchema>({
    queryKey: ["cv"],
    queryFn: () => {
      const localCVString = localStorage.getItem("cv");
      if (localCVString) {
        const localCV = JSON.parse(
          localCVString,
        ) as DeepPartial<ResumeFormSchema>;
        return merge({}, defaultValues, localCV);
      }
      return defaultValues;
    },
  });

  const saveToLocal = (value: DeepPartial<ResumeFormSchema>) => {
    const parsed = resumeFormSchema.safeParse(value);
    if (parsed.success && parsed.data) {
      localStorage.setItem("cv", JSON.stringify(parsed.data));
    } else {
      toast.error("There was an issue while autosaving. Check the console.");
      console.log("ERROR", parsed.error.message);
    }
  };

  return { ...query, saveToLocal };
};
