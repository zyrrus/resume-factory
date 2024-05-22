import {
  LuAlignHorizontalDistributeCenter,
  LuAlignStartHorizontal,
  LuArrowUpRightSquare,
  LuClipboardCopy,
  LuClipboardSignature,
  LuFile,
  LuTable,
} from "react-icons/lu";
import {
  BentoGrid,
  BentoGridItem,
  type BentoGridItemProps,
} from "~/components/ui/bento-grid";

const items: BentoGridItemProps[] = [
  {
    title: "Time Efficiency",
    description:
      "Save valuable time by generating tailored resumes quickly and easily. Resume Factory eliminates the need for juggling dozens of resume files, allowing you to focus more on your job search.",
    icon: <LuClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Time Efficiency",
    description:
      "Say goodbye to hours spent manually editing your resume for every job application. With Resume Factory, you can quickly generate multiple tailored resumes in just a few clicks.",
    icon: <LuFile className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    icon: <LuClipboardSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    icon: <LuTable className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    icon: <LuArrowUpRightSquare className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    icon: <LuAlignStartHorizontal className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Optimized for ATS",
    description: "Embark on exciting journeys and thrilling discoveries.",
    icon: (
      <LuAlignHorizontalDistributeCenter className="h-4 w-4 text-neutral-500" />
    ),
  },
];

export const About: React.FC = () => {
  return (
    <section className="container mt-44 max-w-6xl">
      <div className="mx-auto">
        <p className="mb-4 font-mono text-base font-bold text-primary-500">
          About
        </p>
        <h2 className="mb-12 font-mono text-4xl font-bold">
          Why use Resume Factory?
        </h2>
      </div>
      <BentoGrid>
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </section>
  );
};
