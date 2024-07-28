import { type PropsWithChildren } from "react";
import { Text, View } from "@react-pdf/renderer";
import { styles } from "~/components/pdf-preview/styles";
import type { Experience, Project } from "~/hooks/resume/useFormatResume/types";

export const join = (list: (string | undefined)[], separator = " | ") =>
  list.filter((value) => value !== undefined).join(separator);

export const ExperienceHeading = ({
  role,
  company,
  date,
}: Omit<Experience, "description">) => {
  const formattedCompany = company ? ` – ${company}` : "";

  return (
    <View style={styles.experienceHeading}>
      <Text style={styles.bold}>
        {role}
        {formattedCompany}
      </Text>
      {date && <Text style={styles.bold}>{date}</Text>}
    </View>
  );
};

export const ProjectHeading = ({ title }: Omit<Project, "description">) => (
  <ExperienceHeading role={title} />
);

export const UnorderedList = ({ children }: PropsWithChildren) => {
  return <View style={styles.listContainer}>{children}</View>;
};

export const ListItem = ({
  heading,
  children,
}: PropsWithChildren<{ heading?: string }>) => {
  return (
    <View style={styles.row}>
      <Text style={{ marginRight: 8 }}>•</Text>

      <Text style={{ flex: 1 }}>
        {heading && <Text style={styles.bold}>{heading}: </Text>}
        <Text>{children}</Text>
      </Text>
    </View>
  );
};
