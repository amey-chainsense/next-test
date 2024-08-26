"use client";
import React from "react";
import { World } from "./ui/globe";
import { motion } from "framer-motion";
import { globeConfig, sampleArcs } from "@/data";
import { WobbleCard } from "./ui/wobble-card";

const Locations = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 h-screen md:h-auto dark:bg-black bg-white relative w-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
          <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
            Office and Facility Locations
          </h2>
          <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
            Our exceptional end-to-end blockchain solution services are
            available worldwide. You can also find us in person at one of our
            offices.
          </p>
        </motion.div>
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
        <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
      <div className="px-10 flex items-center justify-center gap-10">
        <WobbleCard>
          <div className="w-full flex-col items-start justify-start ">
            <h2 className="text-2xl font-bold">UAE</h2>

            <p>
              Unit No : 1501, The Dome Tower, Plot No : JLT-PH1-N1, Jumeirah
              Lakes Towers, Dubai, UAE
            </p>
          </div>
        </WobbleCard>

        <WobbleCard>
          <div className="w-full flex-col items-start justify-start ">
            <h2 className="text-2xl font-bold">UK</h2>

            <p>
              71-75 Shelton Street, Covent Garden, London, England, WC2H 9JQ
            </p>
          </div>
        </WobbleCard>

        <WobbleCard>
          <div className="w-full flex-col items-start justify-start ">
            <h2 className="text-2xl font-bold">India</h2>

            <p>
              25th Floor, Sunshine Tower, Plot No 606, Senapati Bapat Marg,
              Dadar W, Mumbai, Mumbai City, Maharashtra, 400013
            </p>
          </div>
        </WobbleCard>
      </div>
    </div>
  );
};

export default Locations;
