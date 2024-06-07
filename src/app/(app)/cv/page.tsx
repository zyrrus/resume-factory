"use client";

import { ResumeForm } from "~/components/form/resume-form";
import { LoadingSpinner } from "~/components/loading-spinner";
import { Separator } from "~/components/ui/separator";
import { useCVStorage } from "~/hooks/useCVStorage";
import { CategoryPanel } from "../category-panel";

export default function Page() {
  const { isLoading, data: localCV } = useCVStorage();

  return (
    <main className="relative grid grid-cols-[minmax(0,1fr)_324px]">
      {/* Form */}
      <div className="container flex max-w-2xl flex-col gap-5 py-16">
        <div className="flex flex-col gap-y-2">
          <h1 className="font-mono text-2xl font-semibold">Curriculum Vitae</h1>
          <p className="text-neutral-800">
            This is your extended resume. Add all education, skills,
            experiences, and projects.
          </p>
        </div>
        <Separator orientation="horizontal" />
        {isLoading || !localCV ? (
          <div className="flex flex-1 flex-row items-center gap-x-4 self-center font-mono text-neutral-800">
            <LoadingSpinner />
            <p>loading your CV...</p>
          </div>
        ) : (
          <ResumeForm initialValues={localCV} />
        )}
      </div>

      <CategoryPanel />
    </main>
  );
}
