"use client";
import { motion } from "framer-motion";
import React from "react";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

const Contact = () => {
  const words = [
    {
      text: "Let’s",
    },
    {
      text: "innovate",
    },
    {
      text: "and",
    },
    {
      text: "co-create",
    },
  ];

  const text = "Get in touch to see how we can help";

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
    </div>
  );
};

export default Contact;
