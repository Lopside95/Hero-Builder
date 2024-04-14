import Link from "next/link";
import { Button, ButtonProps } from "./ui/button";

import { useState } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import ProfileSelect from "./user/profileSelect";

const Navbar = () => {
  const router = useRouter();

  const activePage = (path: string) => router.pathname === path;

  const { data: session } = useSession();

  const AuthButton = () => {
    if (session) {
      return (
        <>
          {session.user.email}
          <br />
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      );
    } else {
      return (
        <>
          Not signed in <br />
          <Button onClick={() => signIn()}>Sign in</Button>
        </>
      );
    }
  };
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

      <AuthButton />
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
            activePage("/create") ? "underline underline-offset-[6px]   " : ""
          }`}
          variant="link"
        >
          <Link tabIndex={-1} href="/create">
            Create
          </Link>
        </Button>
        {/* <Button
          className={`text-md text-base-txtClr  hover:underline-offset-[6px] ${
            activePage("/createBoots")
              ? "underline underline-offset-[6px]   "
              : ""
          }`}
          variant="link"
        >
          <Link tabIndex={-1} href="/createBoots">
            Create boots
          </Link>
        </Button> */}
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

        <ProfileSelect />
        {/* <Button
          className={`text-md text-base-txtClr  hover:underline-offset-[6px] ${
            activePage("/profile") ? "underline underline-offset-[6px]   " : ""
          }`}
          variant="link"
        >
          <Link tabIndex={-1} href="/profile">
            Profile
          </Link>
        </Button> */}
      </span>
    </div>
  );
};

export default Navbar;
