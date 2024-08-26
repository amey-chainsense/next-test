"use client";
import React from "react";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { motion } from "framer-motion";
import { HoveredLink } from "./ui/navbar-menu";
import { businessData } from "@/data";
import { HoverEffect } from "./ui/card-hover-effect";

import { Timeline } from "@/components/ui/timeline";

const Business = () => {
  const words = [
    {
      text: "We",
    },
    {
      text: "Help",
    },
    {
      text: "Your",
    },
    {
      text: "Business",
    },
    {
      text: "Grow",
    },
    {
      text: "Faster",
    },
  ];

  const text =
    "We provide blockchain solutions with unprecedented turn around times to cater to your needs and help you scale your business with readily deployable cutting-edge web3 solutions.";

  const process = [
    {
      title: "Consulting & Development",
      content: (
        <div>
          <p className="text-neutral-800  text-xs md:text-sm font-normal mb-8">
            With a strong core team, access to a large panel of industry
            experts, and decades of experience, we can curate the best
            strategies to build any project from the ground up in any geography
            or industry.
          </p>
        </div>
      ),
    },

    {
      title: "Support & Maintenance",
      content: (
        <div>
          <p className="text-neutral-800  text-xs md:text-sm font-normal mb-8">
            We provide support and maintenance from our in-house experts for
            crucial processes and product lines. We offer product support,
            maintenance engineering, and migration services, enabling you to
            focus your resources on what matters more; new product development,
            client acquisition, and innovation.
          </p>
        </div>
      ),
    },

    {
      title: "Marketing & Growth",
      content: (
        <div>
          <p className="text-neutral-800 text-xs md:text-sm font-normal mb-8">
            In the present era, no business can flourish without proper
            marketing or PR. The same is with Web3 businesses. In our
            experience, an effective marketing strategy is crucial in building a
            project by not only attracting the right audience and clients but
            also investors and other industry collaborations.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="h-auto w-full  bg-white  bg-dot-black/[0.2] relative flex items-center justify-center flex-col">
      <div className="mt-2">
        <TypewriterEffectSmooth words={words} light={true} />
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
        <p className="mt-2  font-normal text-base md:text-lg text-neutral-800 max-w-[80rem] mx-auto text-center">
          {text}
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={businessData} />
      </div>

      <div className="w-full flex flex-col items-center justify-center px-[10rem]">
        <h2 className="text-3xl font-bold text-center text-black">
          The Best Team with <br /> the Best Process
        </h2>

        <p className="mt-4  font-normal text-base md:text-lg text-neutral-800 max-w-[40rem]  text-center">
          As a company with very low turn over, we have simply grown. Over time
          we’ve built a great team and finessed our business processes, making
          efficiency, one of our greatest USPs.
        </p>

        <Timeline data={process} />
      </div>
    </div>
  );
};

export default Business;
