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
import { trpc } from "@/utils/trpc";

const Navbar = () => {
  const router = useRouter();

  const { isLoading } = trpc.user.getUserById.useQuery();

  const activePage = (path: string) => router.pathname === path; // Used to conditionally signify current page

  const { data: session } = useSession();

  const handlesSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleSignIn = async () => {
    await signIn();

    if (!isLoading) {
      router.push("/");
    }
  };

  const AuthButton = () => {
    if (session) {
      return (
        <>
          <br />
          <Button
            className="text-md text-base-txtClr w-20 hover:underline-offset-[6px]"
            onClick={handlesSignOut}
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
            onClick={() => signIn()}
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
        <Button
          className={`text-md text-base-txtClr  hover:underline-offset-[6px] ${
            activePage("/create") ? "underline underline-offset-[6px]   " : ""
          }`}
          variant="link"
        >
          <Link href="/create" tabIndex={-1}>
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
                <Link href="/profile" tabIndex={-1}>
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
