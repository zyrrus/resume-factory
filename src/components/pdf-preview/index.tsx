"use client";

import { Card } from "~/components/ui/card";
import { type ResumeFormSchema } from "~/lib/schemas/resume-form-schema";
import { cn } from "~/lib/utils";
import { PDFViewer } from "@react-pdf/renderer";
import { Doc } from "~/components/pdf-preview/doc";

export const Preview = ({ resume }: { resume?: ResumeFormSchema }) => {
  return (
    <Card
      className={cn(
        "flex aspect-paper max-h-full transition-colors",
        !resume && "animate-pulse bg-neutral-50",
      )}
    >
      {!!resume && (
        <PDFViewer showToolbar={false} className="flex-1 bg-white">
          <Doc resume={resume} />
        </PDFViewer>
      )}
    </Card>
  );
};
