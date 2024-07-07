"use client";

import { useRouter } from "next/navigation";
import { LuDownload } from "react-icons/lu";
import { ResumeForm } from "~/components/form/resume-form";
import { LoadingSpinner } from "~/components/loading-spinner";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { useLocalCVStorage } from "~/hooks/cv/useLocalCVStorage";

type ResumeKeys = "0" | "1" | "2";
const getResume: Record<ResumeKeys, string> = {
  "0": "Frontend",
  "1": "Backend",
  "2": "Full-stack",
};

export default function Page({ params }: { params: { id: ResumeKeys } }) {
  const { query, localCV } = useLocalCVStorage();

  const resumeName = getResume[params.id];

  return (
    <main className="relative grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
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
        {query.isLoading || !localCV ? (
          <div className="flex flex-1 flex-row items-center gap-x-4 self-center font-mono text-neutral-800">
            <LoadingSpinner />
            <p>loading your CV...</p>
          </div>
        ) : (
          <ResumeForm initialValues={localCV} />
        )}
      </div>

      {/* Preview */}
      <div className="sticky top-0 flex h-screen flex-col gap-y-4 p-4">
        <Preview />
        <ControlBar resumeName={resumeName} />
      </div>
    </main>
  );
}

const Preview = () => {
  return <Card className="aspect-paper"></Card>;
};

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
