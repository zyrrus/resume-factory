import { Page, Text, View, Document, Link, Font } from "@react-pdf/renderer";
import { ReactNode } from "react";
import { styles } from "~/components/pdf-preview/styles";
import {
  ExperienceHeading,
  join,
  ListItem,
  ProjectHeading,
  UnorderedList,
} from "~/components/pdf-preview/utils";
import { useFormatResume } from "~/hooks/resume/useFormatResume";
import { noPrefix } from "~/hooks/resume/useFormatResume/utils";
import { type ResumeFormSchema } from "~/lib/schemas/resume-form-schema";
import { intersperse } from "~/lib/utils/lists";

// Disable hyphenated words
Font.registerHyphenationCallback((word) => [word]);

// Import font
Font.register({
  family: "Inter",
  fonts: [
    { src: `/fonts/Inter-Regular.ttf` },
    { src: `/fonts/Inter-Bold.ttf`, fontWeight: "bold" },
  ],
});

export const Doc = ({ resume }: { resume?: ResumeFormSchema }) => {
  const { experiences, projects, skills, education } = useFormatResume({
    resume,
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Personal Details */}
        <View>
          <Text style={styles.h1}>
            {join([
              resume?.name,
              // TODO: resume?.role
            ])}
          </Text>
          <Text>{join([resume?.email, resume?.phone])}</Text>
          <Text>
            {resume &&
              intersperse<ReactNode>(
                resume?.urls.map(({ value }) => (
                  <Link key={value} src={value} style={styles.link}>
                    {value.replace(/^https?:\/\//, "")}
                  </Link>
                )),
                " | ",
              )}
          </Text>
        </View>

        {/* Experiences */}
        {experiences.length > 0 && (
          <View>
            <Text style={styles.h2}>Professional Experience</Text>
            {experiences.map(({ description, ...headingProps }) => (
              <>
                <ExperienceHeading {...headingProps} />
                <UnorderedList>
                  {description.map((task) => (
                    <ListItem key={task}>{task}</ListItem>
                  ))}
                </UnorderedList>
              </>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View>
            <Text style={styles.h2}>Projects</Text>
            {projects.map(({ description, ...headingProps }) => (
              <>
                <ProjectHeading {...headingProps} />
                <UnorderedList>
                  {description.map((task) => (
                    <ListItem key={task}>{task}</ListItem>
                  ))}
                </UnorderedList>
              </>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View>
            <Text style={styles.h2}>Technical Skills</Text>
            <UnorderedList>
              {skills.map(({ prefix, skills }) => (
                <ListItem
                  key={prefix}
                  heading={prefix !== noPrefix ? prefix : undefined}
                >
                  {skills}
                </ListItem>
              ))}
            </UnorderedList>
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View>
            <Text style={styles.h2}>Education</Text>
            <UnorderedList>
              {education.map(
                ({ heading, details }) =>
                  details && (
                    <ListItem key={heading} heading={heading}>
                      {details}
                    </ListItem>
                  ),
              )}
            </UnorderedList>
          </View>
        )}
      </Page>
    </Document>
  );
};
