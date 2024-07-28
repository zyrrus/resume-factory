"use client";

import { useRouter } from "next/navigation";
import { LuDownload } from "react-icons/lu";
import { Preview } from "~/components/pdf-preview";
import { ResumeForm } from "~/components/form/resume-form";
import { LoadingSpinner } from "~/components/loading-spinner";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { useCVStorage } from "~/hooks/cv/useCVStorage";
import { api } from "~/trpc/react";

type ResumeId = `${number}`;

export default function Page({ params }: { params: { id: ResumeId } }) {
  const { latestCV, query: cvQuery } = useCVStorage();

  const id = parseInt(params.id);
  const { data: resume, ...resumeQuery } = api.resumes.getOne.useQuery({ id });

  const resumeName = resume?.name ?? "";

  const isLoading =
    resumeQuery.isLoading || cvQuery.isLoading || !latestCV || !resume;

  return (
    <main className="relative grid grid-cols-[minmax(0,1fr)_auto]">
      {/* Form */}
      <div className="container flex max-w-2xl flex-col gap-5 py-16">
        <div className="flex flex-col gap-y-2">
          <h1 className="font-mono text-2xl font-semibold">
            Editing Resume: {resumeName}
          </h1>
          <p className="text-neutral-800">
            This is your refined resume. Go through your CV and select the
            information that is most relevant to this particular, tailored
            resume.
          </p>
        </div>
        <Separator orientation="horizontal" />
        {isLoading ? (
          <div className="flex flex-1 flex-row items-center gap-x-4 self-center font-mono text-neutral-800">
            <LoadingSpinner />
            <p>loading your CV...</p>
          </div>
        ) : (
          <ResumeForm initialValues={latestCV} />
        )}
      </div>

      {/* Preview */}
      <div className="sticky top-0 grid h-screen max-h-screen grid-rows-[minmax(0,1fr)_auto] gap-y-4 p-4">
        <Preview resume={latestCV} />
        <ControlBar resumeName={resumeName} />
      </div>
    </main>
  );
}

const ControlBar = ({ resumeName }: { resumeName: string }) => {
  const router = useRouter();

  const handleDownload = () => {
    // TODO: Implement
  };

  const handleCancel = () => {
    // TODO: Implement
    router.push("/cv");
  };

  const handleSave = () => {
    // TODO: Implement
    router.push("/cv");
  };

  return (
    <Card className="flex flex-row items-center gap-x-2.5">
      <Button variant="ghost" size="icon" onClick={handleDownload}>
        <LuDownload className="h-4 w-4" />
      </Button>
      <p className="font-mono text-lg font-medium">{resumeName}</p>

      <div className="flex-1" />

      <Button variant="outline" onClick={handleCancel}>
        Cancel
      </Button>
      <Button onClick={handleSave}>Save</Button>
    </Card>
  );
};
