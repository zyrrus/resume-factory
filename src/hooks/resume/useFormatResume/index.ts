import { useMemo } from "react";
import type {
  Experience,
  Project,
  Skill,
  Education,
  FormattedResume,
} from "~/hooks/resume/useFormatResume/types";
import {
  formatDateRange,
  formatList,
  noPrefix,
} from "~/hooks/resume/useFormatResume/utils";
import { type ResumeFormSchema } from "~/lib/schemas/resume-form-schema";

export const useFormatResume = ({
  resume,
}: {
  resume?: ResumeFormSchema;
}): FormattedResume => {
  const experiences: Experience[] = useMemo(() => {
    if (!resume) return [];
    return resume.experience.map((exp) => {
      return {
        role: exp.role ?? "",
        company: exp.employer,
        date: formatDateRange(exp),
        description: exp.description.map(({ value }) => value),
      };
    });
  }, [resume?.experience]);

  const projects: Project[] = useMemo(() => {
    if (!resume) return [];
    return resume.projects
      .filter(({ title }) => title !== undefined)
      .map(({ title, description }) => ({
        title: title!,
        description: description.map(({ value }) => value),
      }));
  }, [resume?.projects]);

  const skills: Skill[] = useMemo(() => {
    if (!resume) return [];

    const rawSkills = resume.skills.map(({ value }) => value);
    const skillMap: Record<string, string[]> = {};

    for (const skill of rawSkills) {
      // Find the first non-escaped ':'
      let splitIndex = -1;
      for (let i = 0; i < skill.length; i++) {
        if (skill[i] === ":" && (i === 0 || skill[i - 1] !== "\\")) {
          splitIndex = i;
          break;
        }
      }

      let prefix: string;
      let skillName: string;
      if (splitIndex !== -1) {
        // Prefix was found
        prefix = skill.substring(0, splitIndex).replace("\\:", ":").trim();
        skillName = skill
          .substring(splitIndex + 1)
          .replace("\\:", ":")
          .trim();
      } else {
        // No prefix was found
        prefix = noPrefix;
        skillName = skill;
      }

      // Add to map
      if (skillMap[prefix]) {
        skillMap[prefix]?.push(skillName);
      } else {
        skillMap[prefix] = [skillName];
      }
    }

    const prefixList = Object.keys(skillMap).map((prefix) => ({
      prefix,
      skills: formatList(skillMap[prefix]!),
    }));

    // If there is an un-prefixed set in list that has at least one prefix,
    // Then replace noPrefix with 'Other'
    if (prefixList.length > 1) {
      for (const prefixItem of prefixList) {
        if (prefixItem.prefix === noPrefix) {
          prefixItem.prefix = "Other";
          break;
        }
      }
    }

    return prefixList;
  }, [resume?.skills]);

  const education: Education[] = useMemo(() => {
    if (!resume) return [];

    return [
      {
        heading: "Degree",
        details: resume.education
          .map(({ degree, school, gpa }) => {
            if (!degree) return undefined;

            let formatted = degree;

            if (school !== undefined) formatted += ` – ${school}`;
            if (gpa !== undefined) formatted += ` (GPA: ${gpa})`;

            return formatted;
          })
          .filter((detail) => detail !== undefined)
          .join("; "),
      },
      {
        heading: "Courses",
        details: formatList([]), // TODO:
      },
      {
        heading: "Certifications",
        details: formatList(resume.certificates.map(({ value }) => value)),
      },
      {
        heading: "Awards",
        details: formatList(resume.awards.map(({ value }) => value)),
      },
    ];
  }, [resume?.education]);

  return {
    experiences,
    projects,
    skills,
    education,
  };
};
