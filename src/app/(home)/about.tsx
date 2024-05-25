"use client";

import Image from "next/image";
import { cn } from "~/lib/utils";
import {
  type MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const ABOUT_STEPS = [
  {
    title: "Create your CV",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. maxime facilis, soluta nesciunt corrupti quia quis facere ex minima?",
  },
  {
    title: "Create a resume category",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. maxime facilis, soluta nesciunt corrupti quia quis facere ex minima?",
  },
  {
    title: "Build your tailored resume",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. maxime facilis, soluta nesciunt corrupti quia quis facere ex minima?",
  },
  {
    title: "Save and export your PDF",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. maxime facilis, soluta nesciunt corrupti quia quis facere ex minima?",
  },
];

export const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <div ref={ref} className="container grid gap-x-8 md:grid-cols-2">
      <div className="relative pt-44 md:order-1">
        <p className="mb-4 font-mono text-base font-bold text-primary-500">
          About
        </p>
        <h2 className="mb-20 font-mono text-4xl font-bold">
          What is Resume Factory?
        </h2>
        <ol className="flex flex-col gap-y-20">
          {ABOUT_STEPS.map(({ title, description }) => (
            <li key={title}>
              <h3 className="mb-2 font-mono text-xl font-semibold">{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
      {/* Desktop */}
      <Laptop scrollYProgress={scrollYProgress} />
      {/* Mobile */}
      <StaticLaptop />
    </div>
  );
};

const Laptop = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const scaleX = useTransform(scrollYProgress, [0, 0.15], [1, 1.05]);
  const scaleY = useTransform(scrollYProgress, [0, 0.15], [0.9, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.5], [0, 500]);
  const rotateX = useTransform(scrollYProgress, [0.08, 0.25], [-70, 0]);

  return (
    <div className="relative mx-auto mt-20 hidden aspect-[12/11] w-full max-w-lg [perspective:1400px] md:block lg:mr-0">
      <Image src="/images/home/laptop.svg" alt="" className="" fill />
      <motion.div
        style={{
          scaleX,
          scaleY,
          rotateX,
          translateY,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="relative mx-auto mt-[9%] aspect-[4/3] h-auto w-[92%] overflow-hidden rounded-lg border border-[#272729]"
      >
        <Image
          src="/images/home/cv-demo.png"
          alt="Resume Factory demo"
          className="object-contain object-top"
          fill
        />
      </motion.div>
    </div>
  );
};

const StaticLaptop = () => {
  return (
    <div className="relative mx-auto mt-20 aspect-[12/11] w-full max-w-lg [perspective:1400px] md:hidden lg:mr-0">
      <Image src="/images/home/laptop.svg" alt="" className="" fill />
      <motion.div
        style={{
          scaleY: 0.9,
          rotateX: -70,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="relative mx-auto mt-[9%] aspect-[4/3] h-auto w-[92%] overflow-hidden rounded-lg border border-[#272729]"
      >
        <Image
          src="/images/home/cv-demo.png"
          alt="Resume Factory demo"
          className="object-contain object-top"
          fill
        />
      </motion.div>
    </div>
  );
};
