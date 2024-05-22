import Link from "next/link";
import {
  LuFeather,
  LuLineChart,
  LuLayoutList,
  LuArchive,
  LuFileEdit,
  LuEye,
  LuLayoutTemplate,
  LuFileArchive,
  LuPencil,
} from "react-icons/lu";
import { About } from "~/app/(home)/about";
import { Header } from "~/app/(home)/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { CTA_LINK } from "~/lib/constants";

// TODO: https://ui.aceternity.com/components/sticky-scroll-reveal

export default async function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ResumeCount count={2504} />
        <About />
        <Benefits />
        <Features />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

const Hero: React.FC = () => {
  return (
    <section className="container my-36 max-w-5xl">
      <h1 className="font-mono text-6xl font-bold leading-tight">
        Build tailored resumes without <span className="">wasting time</span>.
      </h1>
      <p className="mt-10 text-xl leading-relaxed text-neutral-700">
        Piece together a tailored resume by selecting your most relevant career
        achievements, skills, projects, and education from your CV, and we’ll
        assemble a tailored resume PDF that highlights your strengths and
        impresses employers.
      </p>
      <div className="mt-24 flex flex-row justify-end">
        <Button asChild size="lg">
          <Link href={CTA_LINK}>Get started now</Link>
        </Button>
      </div>
    </section>
  );
};

const ResumeCount: React.FC<{ count: number }> = ({ count }) => {
  return (
    <section className="container mt-44 flex flex-row items-center gap-x-14">
      <Separator className="shrink bg-neutral-100" />
      <span className="min-w-max font-mono text-xl font-medium text-neutral-700">
        {count} resumes created so far
      </span>
      <Separator className="shrink bg-neutral-100" />
    </section>
  );
};

const BENEFITS = [
  {
    title: "Enhanced efficiency",
    description:
      "With all your experiences in one place, you can effortlessly select and customize relevant details, allowing you to focus on other crucial aspects of your job search.",
    icon: <LuLineChart className="h-24 w-24 text-primary-500" />,
  },
  {
    title: "Tailored for success",
    description:
      "Each job opportunity is unique, and a one-size-fits-all resume may not cut it. Resume Factory allows you to effortlessly select and modify the information stored in your career archive.",
    icon: <LuPencil className="h-24 w-24 text-primary-500" />,
  },
  {
    title: "Professional and polished",
    description:
      "Our carefully designed resume templates and formatting options make it easy to create aesthetically pleasing resumes that make a lasting impression.",
    icon: <LuLayoutList className="h-24 w-24 text-primary-500" />,
  },
];
const Benefits: React.FC = () => {
  return (
    <section className="mt-44">
      <div className="container">
        <p className="mb-4 text-center font-mono font-bold text-primary-500">
          Benefits
        </p>
        <h2 className="mb-12 text-center font-mono text-4xl font-bold">
          Optimize your job search
        </h2>
      </div>
      <div className="relative">
        {/* Half background */}
        <div className="absolute inset-0 top-1/2 -z-50 bg-[#F4F2F2]" />
        <div className="container flex flex-col items-center gap-8 lg:flex-row lg:items-stretch">
          {BENEFITS.map(({ title, description, icon }) => (
            <div
              key={title}
              className="max-w-sm rounded-lg bg-white p-6 shadow-2xl"
            >
              <div className="mb-4 flex flex-row items-end justify-between">
                <h3 className="text-balance font-mono text-2xl font-semibold leading-8">
                  {title}
                </h3>
                {icon}
              </div>
              <p className="text-lg leading-normal text-neutral-700">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FEATURES = [
  {
    title: "Career archive",
    Icon: LuArchive,
  },
  {
    title: "Dynamic editing",
    Icon: LuFileEdit,
  },
  {
    title: "Real-time preview",
    Icon: LuEye,
  },
  {
    title: "Professional templates",
    Icon: LuLayoutTemplate,
  },
  {
    title: "Privacy and security",
    Icon: LuFileArchive,
  },
];
const Features: React.FC = () => {
  return (
    <section className="bg-[#F4F2F2] pb-24 pt-44">
      <div className="container">
        <div className="ml-36">
          <p className="mb-4 font-mono font-bold text-primary-500">Features</p>
          <h2 className="mb-12 font-mono text-4xl font-bold">What to expect</h2>
        </div>
        <div className="flex flex-row justify-between gap-14">
          <div className="flex max-w-2xl flex-row flex-wrap justify-end gap-4">
            {FEATURES.map(({ title, Icon }) => (
              <div
                key={title}
                className="bg-bg shadow-card hover:bg-accent group w-[209px] rounded-lg p-6 transition-all duration-300 ease-in-out"
              >
                <div className="group-hover:text-bg mb-4 flex flex-col items-center justify-between gap-4 transition-all">
                  <Icon className="group-hover:text-bg h-24 w-24 text-primary-500 transition-all duration-300 ease-in-out" />
                  <h3 className="max-w-fit text-balance text-center font-mono text-xl font-semibold leading-7">
                    {title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center gap-5 font-mono">
            <p className="text-fg text-4xl font-semibold">
              Your achievements all in one place
            </p>
            <p className="text-2xl">
              Write once. Edit with ease. Reuse endlessly.
            </p>
            <p className="text-xl text-neutral-700">
              We will take care of the rest
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQs = [
  {
    question: "Can I create multiple resumes for different career paths?",
    answer:
      "Yes you can! When listing qualifications you can pick and choose which will be used in the final product. If you don't think it will be necessary for a certain job type, you can store it for later use.",
    value: "faq-1",
  },
  {
    question: "Does it cost money?",
    answer:
      "Not at all! This is a project for personal use and requires nothing other than your input.",
    value: "faq-2",
  },
  {
    question: "How many resume options are there?",
    answer:
      "I plan to have 3 available templates. One for general use and two for computer science related fields.",
    value: "faq-3",
  },
  {
    question: "The colors are a little too bright at night. Can I change them?",
    answer: "Select the moon right by the sign up button to enable dark mode.",
    value: "faq-4",
  },
];
const FAQ: React.FC = () => {
  return (
    <section className="container mt-32">
      <p className="mb-4 text-center font-mono font-bold text-primary-500">
        FAQ
      </p>
      <h2 className="mb-12 text-center font-mono text-4xl font-bold">
        Frequently asked questions
      </h2>
      <Accordion
        type="single"
        collapsible
        className="mx-auto flex max-w-4xl flex-col gap-y-5 py-5"
      >
        {FAQs.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

const CTA: React.FC = () => {
  return (
    <div className="mt-44 bg-[#F4F2F2] py-16">
      <div className="container mx-auto flex max-w-5xl flex-row items-center justify-between">
        <p className="w-1/2 text-balance font-mono text-2xl font-semibold">
          Land your next job interview with the perfect resume.
        </p>
        <Button asChild size="lg">
          <Link href={CTA_LINK}>Get started now</Link>
        </Button>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#EAE6E6]">
      <div className="container">
        <div className="flex flex-row items-stretch justify-center gap-x-16 py-36">
          {/* Links */}
          <div className="grid grid-cols-3 gap-x-20 pr-20 pt-10">
            <FooterColumn
              mainLink={{ label: "Home", url: "/" }}
              subLinks={[
                { label: "About", url: "#about" },
                { label: "Benefits", url: "#benefits" },
                { label: "Features", url: "#features" },
                { label: "FAQs", url: "#faq" },
              ]}
            />
            <FooterColumn
              mainLink={{ label: "Blog", url: "/" }}
              subLinks={[
                { label: "Blog Title 1", url: "/" },
                { label: "Title 2", url: "/" },
                { label: "Number 3", url: "/" },
                { label: "The last blog", url: "/" },
              ]}
            />
            <FooterColumn
              mainLink={{ label: "Home", url: "/" }}
              subLinks={[
                // { label: "API", url: "/" },
                {
                  label: "GitHub",
                  url: "https://github.com/zyrrus/resume-factory",
                },
              ]}
            />
          </div>

          <Separator orientation="vertical" className="h-auto bg-neutral-400" />

          {/* Branding + description */}
          <div className="max-w-md pb-16 pt-9">
            <LuFeather size="70px" />
            <p className="my-5 font-mono text-4xl font-semibold">
              Resume Factory
            </p>
            <p className="text-lg text-neutral-700">
              Get started off with a great resume. No need for any design
              knowledge, we build it for you!
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-neutral-900 py-7">
        <p className="text-center font-mono text-sm font-medium text-neutral-50">
          © 2024 Resume Factory. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

interface FooterLink {
  label: string;
  url: string;
}

interface FooterColumnProps {
  mainLink: FooterLink;
  subLinks: FooterLink[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ mainLink, subLinks }) => {
  return (
    <div className="flex flex-col gap-y-1">
      <Button
        asChild
        variant="link"
        className="w-min justify-start text-base font-semibold"
      >
        <Link href={mainLink.url}>{mainLink.label}</Link>
      </Button>
      {subLinks.map((link) => (
        <Button
          key={link.label}
          asChild
          variant="link"
          className="w-min justify-start"
        >
          <Link href={link.url}>{link.label}</Link>
        </Button>
      ))}
    </div>
  );
};
