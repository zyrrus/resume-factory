"use client";

import { type PropsWithChildren } from "react";
import { Card } from "~/components/ui/card";
import { type ResumeFormSchema } from "~/lib/schemas/resume-form-schema";
import { cn } from "~/lib/utils";
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";

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

const s = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 12,
    padding: "0.75in",
    // paddingVertical: "0.75in",
    // paddingHorizontal: "1in",
    lineHeight: 1.3,
  },

  bold: { fontWeight: "bold" },
  row: { display: "flex", flexDirection: "row" },

  h1: { fontSize: 18, fontWeight: "bold" },
  h2: {
    textTransform: "uppercase",
    borderBottom: 1,
    paddingBottom: 4,
    marginTop: 8,
  },
  link: { color: "#1155CC" },

  experienceHeading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  listContainer: {
    marginTop: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
});

const ExperienceHeading = ({
  role,
  company,
  startDate,
  endDate = "Present",
}: {
  role: string;
  company?: string;
  startDate?: string;
  endDate?: string;
}) => {
  const formattedCompany = company ? ` – ${company}` : "";
  const formattedEndDate = endDate ? ` – ${endDate}` : "";

  return (
    <View style={s.experienceHeading}>
      <Text style={s.bold}>
        {role}
        {formattedCompany}
      </Text>
      {startDate && (
        <Text style={s.bold}>
          {startDate}
          {formattedEndDate}
        </Text>
      )}
    </View>
  );
};

const UnorderedList = ({ children }: PropsWithChildren) => {
  return <View style={s.listContainer}>{children}</View>;
};

const ListItem = ({
  heading,
  children,
}: PropsWithChildren<{ heading?: string }>) => {
  return (
    <View style={s.row}>
      <Text style={{ marginRight: 8 }}>•</Text>

      <Text style={{ flex: 1 }}>
        {heading && <Text style={s.bold}>{heading}: </Text>}
        <Text>{children}</Text>
      </Text>
    </View>
  );
};

const Doc = ({ resume }: { resume?: ResumeFormSchema }) => {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Personal Details */}
        <View>
          <Text style={s.h1}>Zeke | Software Engineer</Text>
          <Text>zeke@gmail.com | 123-456-7890</Text>
          <Text>
            <Link src="https://github.com/zeke" style={s.link}>
              github.com/zeke
            </Link>
            {" | "}
            <Link src="https://linkedin.com/in/zeke" style={s.link}>
              linkedin.com/in/zeke
            </Link>
            {" | "}
            <Link src="https://zeke.dev" style={s.link}>
              zeke.dev
            </Link>
          </Text>
        </View>

        {/* Experience */}
        <View>
          <Text style={s.h2}>Professional Experience</Text>

          <ExperienceHeading
            role="Software Developer"
            company="Company 2"
            startDate="Nov 2022"
          />
          <UnorderedList>
            <ListItem>
              Contributed to the development of the official Tomb Raider
              website, building out several pages and core functionalities in
              collaboration with ThreeSixtyEight.
            </ListItem>
            <ListItem>
              Developed an automated testing suite with GitHub Actions to
              prevent regression during a major migration from two native mobile
              apps to a single Flutter app.
            </ListItem>
            <ListItem>
              Conducted code reviews, mentored interns, and kept the team up to
              date with the latest technologies and best practices.
            </ListItem>
            <ListItem>
              Demonstrated multidisciplinary expertise in frontend development,
              backend logic, quality assurance, and UI/UX design integration.
            </ListItem>
            <ListItem>
              Boosted the company website’s Google Lighthouse score from 68 to
              96 by improving overall site performance, screen-reader and
              keyboard navigation accessibility, and SEO.
            </ListItem>
            <ListItem>
              Graduated from intern to full-time employee in under 6 months,
              reflecting proficiency and valuable contributions to the team and
              company goals.
            </ListItem>
            <ListItem>
              Consistently maintained high standards of code quality and project
              delivery, earning a reputation for reliability and excellence.
            </ListItem>
          </UnorderedList>

          <ExperienceHeading
            role="Software Development Intern"
            company="Company 1"
            startDate="June 2022"
            endDate="Nov 2022"
          />
          <UnorderedList>
            <ListItem>
              Obtained secret-level clearance via rigorous Tier 3 OPM
              investigation.
            </ListItem>
            <ListItem>
              Modernized ArcMap plugin, transitioning 40-60% of the legacy VB
              codebase to C#, MVVM, and WPF in ArcGIS Pro.
            </ListItem>
            <ListItem>
              Reduced execution times from several hours to 1-2 minutes by
              parallelizing expensive procedures
            </ListItem>
            <ListItem>
              Created a comprehensive migration roadmap, offering ongoing
              guidance for project completion.
            </ListItem>
          </UnorderedList>
        </View>

        {/* Skills */}
        <View>
          <Text style={s.h2}>Technical Skills</Text>
          <UnorderedList>
            <ListItem heading="Languages">
              TypeScript, JavaScript, Python, Dart, C#, Java, and HTML/CSS
            </ListItem>
            <ListItem heading="Frameworks">
              React.js, Next.js, Flutter, and React Native
            </ListItem>
            <ListItem heading="Backend">
              Express.js, GitHub Actions, MySQL, PostgreSQL, and Firebase
            </ListItem>
            <ListItem heading="Testing">
              Mocha, Chai, Cypress, and Mockito
            </ListItem>
            <ListItem heading="Other">
              Data science, Agile/Scrum, Figma, Unity, Blender, GIMP, Inkscape,
              and LaTeX
            </ListItem>
          </UnorderedList>
        </View>

        {/* Education */}
        <View>
          <Text style={s.h2}>Education</Text>
          <UnorderedList>
            <ListItem heading="Degrees">
              B.S, Computer Science and B.S, Mathematics – Example State
              University
            </ListItem>
            <ListItem heading="Courses">
              Advanced data structures and Algorithms, Object-Oriented Design,
              Computer Architecture and Design, Software Systems Development,
              Machine Learning, and Competitive Programming
            </ListItem>
            <ListItem heading="Certifications">
              Secret-level security clearance (Tier 3 Investigation), DELF B2
              French proficiency
            </ListItem>
            <ListItem heading="Awards">
              Peg and Tom Madden Mathematics Research Scholarship and
              President’s Honor Roll
            </ListItem>
          </UnorderedList>
        </View>
      </Page>
    </Document>
  );
};
