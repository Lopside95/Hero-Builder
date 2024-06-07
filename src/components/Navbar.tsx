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

  const activePage = (path: string) => router.pathname === path; // Used to conditionally signify current/active page

  const { data: session } = useSession();

  const AuthButton = () => {
    if (session) {
      return (
        <>
          <Button
            className="text-md text-base-txtClr w-20 hover:underline-offset-[6px]"
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
            variant="link"
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
            onClick={(e) => {
              activePage("/") ? e.preventDefault() : router.push("/"); // prevents the page from reloading if users are already on the login page.
            }}
            variant="link"
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
          <Link href="/" tabIndex={-1}>
            <Home className="" />
            {activePage("/") && <Separator className="mt-1" />}
          </Link>
        </Button>
      </span>

      <span className="flex gap-3 pl-[35rem]">
        {/* Navbar elements are conditionally rendered depending on whether or not the user is logged in */}
        {!session && (
          <Button
            className={`text-md text-base-txtClr  hover:underline-offset-[6px] ${
              activePage("/signup") ? "underline underline-offset-[6px]   " : ""
            }`}
            variant="link"
          >
            <Link href="/signup" tabIndex={-1}>
              Sign up
            </Link>
          </Button>
        )}
        {!session && <AuthButton />}

        {session ? (
          <Button
            className={`text-md text-base-txtClr  hover:underline-offset-[6px] ${
              activePage("/create") ? "underline underline-offset-[6px]   " : ""
            }`}
            variant="link"
          >
            <Link href="/create" tabIndex={-1}>
              New hero
            </Link>
          </Button>
        ) : (
          <Button
            className={`text-md text-base-txtClr  hover:underline-offset-[6px] ${
              activePage("/localCreate")
                ? "underline underline-offset-[6px]   "
                : ""
            }`}
            variant="link"
          >
            <Link href="/localCreate" tabIndex={-1}>
              New local hero
            </Link>
          </Button>
        )}

        <Select>
          <SelectTriggerNoArrow className=" focus:outline-none focus:ring-none focus:border-none border-none hover:border-none bg-transparent">
            <User
              className={`border rounded-full bg-transparent ${
                session ? `fill-blue-400` : `fill-green-400`
              }`}
            />
          </SelectTriggerNoArrow>
          <SelectContent className="bg-transparent-ml-5 border-none">
            <SelectGroup className="flex flex-col">
              {session ? (
                <Button
                  className={`text-md text-base-txtClr w-20  hover:underline-offset-[6px] ${
                    activePage("/profile")
                      ? "underline underline-offset-[6px]"
                      : ""
                  }`}
                  variant="link"
                >
                  <Link href="/profile" tabIndex={-1}>
                    Profile
                  </Link>
                </Button>
              ) : (
                <Button
                  className={`text-md text-base-txtClr w-20  hover:underline-offset-[6px] ${
                    activePage("/localProfile")
                      ? "underline underline-offset-[6px]"
                      : ""
                  }`}
                  variant="link"
                >
                  <Link href="/localProfile" tabIndex={-1}>
                    Local Profile
                  </Link>
                </Button>
              )}
              <AuthButton />
            </SelectGroup>
          </SelectContent>
        </Select>
      </span>
    </div>
  );
};

export default Navbar;
