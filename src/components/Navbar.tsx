import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { Home, User } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTriggerNoArrow,
} from "./ui/select";

const Navbar = () => {
  const router = useRouter();

  const activePage = (path: string) => router.pathname === path;

  const { data: session } = useSession();

  const AuthButton = () => {
    if (session) {
      return (
        <>
          <br />
          <Button
            className="text-md text-base-txtClr w-20 hover:underline-offset-[6px]"
            variant="link"
            onClick={() => {
              signOut();
              router.push("/");
            }}
          >
            Sign out
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            className="text-md text-base-txtClr w-20  hover:underline-offset-[6px]"
            variant="link"
            onClick={() => signIn()}
          >
            Log in
          </Button>
        </>
      );
    }
  };

  return (
    <div className="flex border justify-evenly bg-base-bg  border-none fixed z-50 pt-2  w-full mb-40 top-0 ">
      <span>
        <Button
          className={`text-md text-base-txtClr -ml-2 hover:underline-offset-[6px] ${
            activePage("/") ? "underline underline-offset-[6px]   " : ""
          }`}
          variant="link"
        >
          <Link tabIndex={-1} href="/">
            <Home className="" />
            {activePage("/") && <Separator className="mt-1" />}
          </Link>
        </Button>
      </span>

      <span className="flex gap-3 pl-[35rem]">
        {!session && (
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
        )}
        {!session && <AuthButton />}
        <Button
          className={`text-md text-base-txtClr  hover:underline-offset-[6px] ${
            activePage("/create") ? "underline underline-offset-[6px]   " : ""
          }`}
          variant="link"
        >
          <Link tabIndex={-1} href="/create">
            New Hero
          </Link>
        </Button>

        <Select>
          <SelectTriggerNoArrow className=" focus:outline-none focus:ring-none focus:border-none border-none hover:border-none bg-transparent">
            <User className="border rounded-full bg-transparent" />
          </SelectTriggerNoArrow>
          <SelectContent className="bg-transparent-ml-5 border-none">
            <SelectGroup className="flex flex-col">
              <Button
                className={`text-md text-base-txtClr w-20   hover:underline-offset-[6px] ${
                  activePage("/profile")
                    ? "underline underline-offset-[6px]"
                    : ""
                }`}
                variant="link"
              >
                <Link tabIndex={-1} href="/profile">
                  Profile
                </Link>
              </Button>
              <AuthButton />
            </SelectGroup>
          </SelectContent>
        </Select>
      </span>
    </div>
  );
};

export default Navbar;
