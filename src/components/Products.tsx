"use client";
import { products } from "@/data";
import Link from "next/link";
import React from "react";
import { PinContainer } from "./ui/3d-pin";
import { BackgroundGradient } from "./ui/background-gradient";
import Image from "next/image";

const Products = () => {
  return (
    <div className="min-w-screen py-12 bg-black max-w-[100vw]">
      <div className="mt-2 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
          {products.map((item, i) => (
            <div key={i} className="flex justify-center">
              {/* <PinContainer title={item.title} href={item.url}>
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                  <p>{item.title}</p>
                  <div className=" flex flex-1 w-full rounded-lg mt-4 "></div>
                </div>
              </PinContainer> */}

              <Image src={item.img} alt="" />

              {/* <BackgroundGradient>
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                  <p>{item.title}</p>
                  <div className=" flex flex-1 w-full rounded-lg mt-4 "></div>
                </div>
              </BackgroundGradient> */}
            </div>
          ))}
        </div>
      </div>
      {/* <div className="mt-16 text-center">
        <Link
          href={"/products"}
          className="px-4 py-2 rounded border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200"
        >
          View All Products
        </Link>
      </div> */}
    </div>
  );
};

export default Products;
