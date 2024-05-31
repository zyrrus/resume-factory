"use client";

import { type DeepPartial } from "react-hook-form";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type ResumeFormSchema } from "~/lib/schemas/resume-form-schema";

/**
 * TODO: Probably need to update this to be
 * cv: ...
 * resumes: {
 *   resume_id_1: ...
 *   resume_id_2: ...
 *   resume_id_3: ...
 * }
 */

interface CVState {
  cv: DeepPartial<ResumeFormSchema> | undefined;
  save: (cv: DeepPartial<ResumeFormSchema>) => void;
}

export const useCVStore = create<CVState>()(
  persist(
    (set) => ({
      cv: undefined,
      save: (cv) => set(() => ({ cv }), true),
    }),
    { name: "cv" },
  ),
);
