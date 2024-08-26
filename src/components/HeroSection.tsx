"use client";
import Link from "next/link";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";
import { Spotlight } from "./ui/spotlight";
import { Button } from "./ui/moving-border";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import Image from "next/image";

import Logo from "@/assets/logo-svg.svg";

const HeroSection = () => {
  const text = "We build and deploy cutting-edge blockchain solutions";

  return (
    <>
      <BackgroundGradientAnimation>
        <div className="h-auto md:h-[50rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
          <div className="absolute opacity-10 h-[40rem] w-[40rem]">
            <Image src={Logo} alt="logo" />
          </div>

          <div className="p-4 relative z-10 w-full text-center">
            {/* <h1
              className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text
        text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
            >
              We build and deploy cutting-edge blockchain solutions
            </h1> */}
            <TextGenerateEffect words={text} size="" />

            <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">
              Join pioneers of blockchain solutions to bring revolutionary trust
              and transparency with unprecedented privacy and security
            </p>
            <div className="mt-4">
              <Link href="#services">
                <Button
                  className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
                  borderRadius="1.75rem"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </BackgroundGradientAnimation>
    </>
  );
};

export default HeroSection;
