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
  LuChevronDown,
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
      <h1 className="font-mono text-7xl font-bold leading-tight">
        Build tailored resumes without <span className="">wasting time</span>.
      </h1>
      <p className="mt-12 text-2xl leading-10 text-neutral-700">
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

const Benefits: React.FC = () => {
  return (
    <div className="container mt-44">
      <section>
        <p className="text-accent mb-4 text-center font-mono text-base font-bold">
          Benefits
        </p>
        <h2 className="mb-12 text-center font-mono text-5xl font-bold">
          Optimize your job search
        </h2>
        <div className=" mb-40 flex flex-row justify-center gap-8">
          <BenefitsCard
            title="Enhanced efficiency"
            description="With all your experiences in one place, you can effortlessly select and customize relevant details, allowing you to focus on other crucial aspects of your job search."
            icon={<LuLineChart size="90px" className="text-primary-500" />}
          />
          <BenefitsCard
            title="Tailored for success"
            description="Each job opportunity is unique, and a one-size-fits-all resume may not cut it. Resume Factory allows you to effortlessly select and modify the information stored in your career archive."
            icon={<LuPencil size="90px" className="text-primary-500" />}
          />
          <BenefitsCard
            title="Professional and polished"
            description="Our carefully designed resume templates and formatting options make it easy to create aesthetically pleasing resumes that make a lasting impression."
            icon={<LuLayoutList size="90px" className="text-primary-500" />}
          />
        </div>
        <Separator className="bg-bg mb-28" id="features" />
      </section>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <div className="container">
      <section className="mb-40">
        <div className="ml-36">
          <p className="text-accent mb-4 font-mono text-base font-bold">
            Features
          </p>
          <h2 className="mb-11 font-mono text-5xl font-bold">What to expect</h2>
        </div>
        <div className="flex flex-row justify-between gap-14">
          <div className="flex max-w-2xl flex-row flex-wrap justify-end gap-4">
            <FeaturesCard
              title="Career archive"
              icon={
                <LuArchive
                  size="90px"
                  className="text-accent group-hover:text-bg transition-all duration-300 ease-in-out"
                />
              }
            />
            <FeaturesCard
              title="Dynamic editing"
              icon={
                <LuFileEdit
                  size="90px"
                  className="text-accent group-hover:text-bg transition-all duration-300 ease-in-out"
                />
              }
            />
            <FeaturesCard
              title="Real-time preview"
              icon={
                <LuEye
                  size="90px"
                  className="text-accent group-hover:text-bg transition-all duration-300 ease-in-out"
                />
              }
            />
            <FeaturesCard
              title="Professional templates"
              icon={
                <LuLayoutTemplate
                  size="90px"
                  className="text-accent group-hover:text-bg transition-all duration-300 ease-in-out"
                />
              }
            />
            <FeaturesCard
              title="Privacy and security"
              icon={
                <LuFileArchive
                  size="90px"
                  className="text-accent group-hover:text-bg transition-all duration-300 ease-in-out"
                />
              }
            />
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
        <Separator className="bg-bg mb-28" id="faq" />
      </section>
    </div>
  );
};

const FAQ: React.FC = () => {
  return (
    <section className="mb-72">
      <p className="text-accent mb-4 text-center font-mono text-base font-bold">
        FAQ
      </p>
      <h2 className="mb-12 text-center font-mono text-5xl font-bold">
        Frequently asked questions
      </h2>
      <div className="m-auto flex w-[908px] flex-col p-5">
        <Accordion type="single" collapsible>
          <FAQItem
            question="Can I create multiple resumes for different career paths?"
            answer="Yes you can! When listing qualifications you can pick and choose which will be used in the final product. If you don't think it will be necessary for a certain job type, you can store it for later use."
            value="item-1"
          />
          <FAQItem
            question="Does it cost money?"
            answer="Not at all! This is a project for personal use and requires nothing other than your input."
            value="item-2"
          />
          <FAQItem
            question="How many resume options are there?"
            answer="I plan to have 3 available templates. One for general use and two for computer science related fields."
            value="item-3"
          />
          <FAQItem
            question="This colors are a little too bright at night. Can I change them?"
            answer="Select the moon right by the sign up button to enable dark mode."
            value="item-4"
          />
        </Accordion>
      </div>
    </section>
  );
};

const CTA: React.FC = () => {
  return (
    <div className=" bg-bg-dark py-20">
      <div className="mx-auto flex max-w-5xl flex-row items-center justify-between">
        <p className="font-mono text-3xl font-semibold">
          Land your next job interview <br /> with the perfect resume.
        </p>
        <Button asChild>
          <Link href="/profile">Get started now</Link>
        </Button>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-darker">
      <div className="container">
        <div className="ml-36 flex flex-row items-stretch justify-center py-36">
          <div className="flex flex-row justify-between gap-20 pr-20 pt-10">
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
                { label: "API", url: "/" },
                {
                  label: "GitHub",
                  // Need to add href target _blank, -> FooterColumn
                  url: "https://github.com/CB-BC/resume-factory",
                },
              ]}
            />
          </div>
          <div className="w-[3px] rounded-full bg-neutral-700/25" />
          <div className="max-w-md pb-20 pl-16 pt-9">
            <LuFeather size="70px" />
            <p className="my-5 font-mono text-4xl font-semibold">
              Resume Factory
            </p>
            <p className="text-xl leading-7 text-neutral-700">
              Get started off with a great resume. No need for any design
              knowledge, we build it for you!
            </p>
          </div>
        </div>
      </div>
      <div className="bg-bg-darkest py-7">
        <p className="text-bg text-center font-mono font-semibold">
          © 2024 Resume Factory. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

interface BenefitsCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const BenefitsCard: React.FC<BenefitsCardProps> = ({
  description,
  icon,
  title,
}) => {
  return (
    <div className="bg-bg shadow-card max-w-sm rounded-lg p-6">
      <div className="mb-4 flex flex-row items-end justify-between">
        <h3 className="font-mono text-2xl font-semibold leading-8 [text-wrap:balance]">
          {title}
        </h3>
        {icon}
      </div>
      <p className="text-xl leading-[1.5] text-neutral-700">{description}</p>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
  value: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, value }) => {
  return (
    <AccordionItem
      className="bg-bg shadow-card mx-auto mb-5 w-[908px] rounded p-5 text-xl"
      value={value}
    >
      <AccordionTrigger className="flex w-full flex-row items-center justify-between font-mono">
        {question} <LuChevronDown size="25px" className="text-accent" />
      </AccordionTrigger>
      <AccordionContent className="mt-4 leading-7 text-neutral-700">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

interface FeaturesCardProps {
  title: string;
  icon: React.ReactNode;
}

const FeaturesCard: React.FC<FeaturesCardProps> = ({ icon, title }) => {
  return (
    <div className="bg-bg shadow-card hover:bg-accent group w-[209px] rounded-lg p-6 transition-all duration-300 ease-in-out">
      <div className="group-hover:text-bg mb-4 flex flex-col items-center justify-between gap-4 transition-all">
        {icon}
        <h3 className="max-w-fit text-center font-mono text-xl font-semibold leading-7 [text-wrap:balance]">
          {title}
        </h3>
      </div>
    </div>
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
    <div className="flex flex-col gap-2 text-xl">
      <Link className="font-mono font-semibold" href={mainLink.url}>
        {mainLink.label}
      </Link>
      {subLinks.map((link, index) => (
        <Link href={link.url} key={index}>
          {link.label}
        </Link>
      ))}
    </div>
  );
};
