"use client";
import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";

import { products } from "@/data";

const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem setActive={setActive} active={active} item="Products">
            <div className="flex flex-col space-y-4 text-sm">
              {products.map((item, i) => (
                <HoveredLink href="#">{item.title}</HoveredLink>
              ))}
            </div>
          </MenuItem>
        </Link>

        <Link href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Solutions"
          ></MenuItem>
        </Link>

        <Link href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Packages"
          ></MenuItem>
        </Link>

        <Link href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="About"
          ></MenuItem>
        </Link>

        <Link href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Blog"
          ></MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

export default Navbar;
