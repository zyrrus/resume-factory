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
import { Skeleton } from "~/components/ui/skeleton";

const items: BentoGridItemProps[] = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    icon: <LuClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
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
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    icon: (
      <LuAlignHorizontalDistributeCenter className="h-4 w-4 text-neutral-500" />
    ),
  },
];

export const About: React.FC = () => {
  return (
    <section className="container mt-20 max-w-6xl">
      <div className="mx-auto">
        <p className="mb-4 font-mono text-base font-bold text-primary-500">
          About
        </p>
        <h2 className="mb-11 font-mono text-5xl font-bold">
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
