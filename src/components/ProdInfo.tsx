import { products } from "@/data";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

const ProdInfo = () => {
  return <HeroParallax products={products} />;
};

export default ProdInfo;
