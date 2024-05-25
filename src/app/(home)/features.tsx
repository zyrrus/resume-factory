import Image from "next/image";
import {
  LuClipboardCopy,
  LuFile,
  LuClipboardSignature,
  LuTable,
} from "react-icons/lu";
import {
  BentoGrid,
  BentoGridItem,
  type BentoGridItemProps,
} from "~/components/ui/bento-grid";

const SkeletonOne = () => {
  return (
    <div className="relative h-full min-h-[6rem] w-full rounded-lg bg-primary-500">
      <Image
        src="/images/home/cv-demo.png"
        alt="CV demo"
        className="object-contain object-bottom pt-4 transition-all group-hover/bento:pt-2"
        fill
      />
    </div>
  );
};

const FEATURES: BentoGridItemProps[] = [
  {
    header: <SkeletonOne />,
    title: "Build your CV",
    description:
      "Write down everything you could possibly put on a resume: job experiences, education, certifications, awards, projects, skills, ...",
    icon: <LuClipboardCopy className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1",
  },
  {
    title: "Time Efficiency",
    description:
      "Say goodbye to hours spent manually editing your resume for every job application. With Resume Factory, you can quickly generate multiple tailored resumes in just a few clicks.",
    icon: <LuFile className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-2",
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    icon: <LuClipboardSignature className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-2",
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    icon: <LuTable className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1",
  },
];

export const Features: React.FC = () => {
  return (
    <section className="bg-[#F4F2F2] pb-32 pt-44" id="features">
      <div className="container max-w-5xl">
        <div className="md:ml-20">
          <p className="mb-4 font-mono font-bold text-primary-500">Features</p>
          <h2 className="mb-12 font-mono text-4xl font-bold">What to expect</h2>
        </div>
        <BentoGrid className="md:auto-rows-[20rem]">
          {FEATURES.map((item, i) => (
            <BentoGridItem key={i} {...item} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};
