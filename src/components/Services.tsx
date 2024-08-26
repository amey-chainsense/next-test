"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import Image from "next/image";
import { solutions } from "@/data";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { CardSpotlight } from "./ui/card-spotlight";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { ParallaxScroll } from "./ui/parallax-scroll";
import { WobbleCard } from "./ui/wobble-card";

import { motion } from "framer-motion";

const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src=""
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Version control
      </div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Running out of content
      </div>
    ),
  },
];

const Services = () => {
  const subtitle =
    "Innovation and technology foster business growth. Especially when leading experts come together to create the best solutions.";

  const words = [
    {
      text: "We're",
    },
    {
      text: "Leaders",
    },
    {
      text: "In",
    },
    {
      text: "Technology.",
    },
  ];

  return (
    <div className="h-auto w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div id="services" className="flex flex-col justify-center items-center">
        <div className="mt-2">
          <TypewriterEffectSmooth words={words} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <p className="mt-2 mb-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto text-center">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 justify-center p-4">
          {solutions.map((item, i) => (
            <WobbleCard key={i}>
              <div className="flex items-center justify-center gap-4 max-w-[40rem]">
                <Image src={item.icon} alt="" />
                <div className="flex flex-col items-start justify-start">
                  <h2 className="text-2xl font-semibold">{item.title}</h2>
                  <p>{item.desc}</p>
                </div>
              </div>
            </WobbleCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
