import Link from "next/link";
import { Button, ButtonProps } from "./ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuIndicator,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuViewport,
// } from "./ui/navigation-menu";
// import { ModeToggle } from "./themeSwitcher";
import { useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const activePage = (path: string) => router.pathname === path;
  return (
    <div className="flex border justify-evenly bg-base-bg border-none fixed z-50  mb-12 top-0 w-full  gap-32">
      <span>
        <Button
          className={`text-md text-base-txtClr -ml-2 hover:underline-offset-[6px] ${
            activePage("/") ? "underline underline-offset-[6px]   " : ""
          }`}
          variant="link"
        >
          <Link tabIndex={-1} href="/">
            Home
          </Link>
        </Button>
      </span>
      <span className="flex gap-5">
        <Button
          className={`text-md text-base-txtClr  hover:underline-offset-[6px] ${
            activePage("/login") ? "underline underline-offset-[6px]   " : ""
          }`}
          variant="link"
        >
          <Link tabIndex={-1} href="/login">
            Login
          </Link>
        </Button>
        <Button
          className={`text-md text-base-txtClr  hover:underline-offset-[6px] ${
            activePage("/signup") ? "underline underline-offset-[6px]   " : ""
          }`}
          variant="link"
        >
          <Link tabIndex={-1} href="/signup">
            Sign up
          </Link>
        </Button>
        <Button
          className={`text-md text-base-txtClr  hover:underline-offset-[6px] ${
            activePage("/hero") ? "underline underline-offset-[6px]   " : ""
          }`}
          variant="link"
        >
          <Link tabIndex={-1} href="/hero">
            Hero
          </Link>
        </Button>
        <Button
          className={`text-md text-base-txtClr  hover:underline-offset-[6px] ${
            activePage("/shop") ? "underline underline-offset-[6px]   " : ""
          }`}
          variant="link"
        >
          <Link tabIndex={-1} href="/shop">
            Shop
          </Link>
        </Button>
      </span>
      {/* 
      <Button>
      <Link href="/preview">Preview</Link>
      </Button> */}
      {/* <ModeToggle /> */}
    </div>
  );
};

export default Navbar;
