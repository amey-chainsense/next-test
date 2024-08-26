"use client";
import React from "react";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { motion } from "framer-motion";
import { DirectionAwareHover } from "./ui/direction-aware-hover";

import StoryImage from "../assets/story-image.png";
import { WobbleCard } from "./ui/wobble-card";

const Story = () => {
  const words = [
    {
      text: "Our",
    },
    {
      text: "Story",
    },
  ];

  const text =
    "We began with an aim to build a comprehensive blockchain solution that could cater to the core requirements of each industry. We’ve now built technology solutions to business problems across various sectors with custom consensus algorithms.";

  const imageUrl =
    "https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div
      id="services"
      className="h-auto w-full   dark:bg-dot-white/[0.2] relative flex flex-col items-center justify-center px-10 "
    >
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
        <p className="mt-2  font-normal text-base md:text-lg text-neutral-300 max-w-[80rem] mx-auto text-center">
          {text}
        </p>
      </motion.div>

      <div className="py-10  relative  flex items-center justify-center">
        <DirectionAwareHover imageUrl={StoryImage}>
          <p className="font-bold text-xl bg-gray-400/40 px-2 rounded-xl">
            &quot; We strive to provide business solutions that can push the
            boundaries in terms of business values, honesty, and efficiency.
            &quot;
          </p>
        </DirectionAwareHover>
      </div>

      <div className=" w-150  md:w-150 mb-20">
        <div className="flex items-center justify-center gap-4 max-w-[40rem]">
          <div className="flex  items-center justify-center gap-10">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold">{"429"}</h2>
              <p>{"Exclusive Clients"}</p>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold">{"85"}</h2>
              <p>{"Completed Projects"}</p>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold">{"27"}</h2>
              <p>{"Finance Experts"}</p>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold">{"99%"}</h2>
              <p>{"Success Rate"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
