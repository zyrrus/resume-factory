import { useQuery } from "@tanstack/react-query";
import merge from "lodash.merge";
import { type DeepPartial } from "react-hook-form";
import {
  type ResumeFormSchema,
  defaultValues,
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
    localStorage.setItem("cv", JSON.stringify(value));
  };

  return { ...query, saveToLocal };
};
