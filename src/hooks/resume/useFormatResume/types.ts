export interface Experience {
  role: string;
  company?: string;
  date?: string;
  description: string[];
}

export interface Skill {
  prefix?: string;
  skills: string;
}

export interface Project {
  title: string;
  description: string[];
}

// Might break up into certs + awards
export interface Education {
  heading: string;
  details: string;
}

export interface FormattedResume {
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  education: Education[];
}
