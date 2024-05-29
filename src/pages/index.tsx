import { trpc } from "@/utils/trpc";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/pages/api/loginForm";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { useRouter } from "next/router";

const Home = () => {
  const [currentUser, userHeroes] = trpc.useQueries((t) => [
    t.user.getUserById(),
    t.user.getHeroesByUser(),
  ]);

  const router = useRouter();

  if (router.isFallback) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const user = currentUser.data;
  const heroes = userHeroes.data ? userHeroes.data : [];

  const quickUser = trpc.user.createUser.useMutation({
    onSuccess: async () => {
      console.log("New user created");
    },
  });

  const handleQuick = () => {
    const quickData: User = {
      userName: "Lopside",
      email: "james@email.com",
      password: "Pass1*",
      repeatPassword: "Pass1*",
      pic: "",
    };

    try {
      quickUser.mutateAsync(quickData);
    } catch (error) {
      console.error("Quick user error", error);
    }
  };

  return (
    <div className="bg-base-bg items-center flex flex-col min-h-screen">
      <div className="w-3/4 flex flex-col items-center gap-10 pt-20 ">
        <section className="flex flex-col items-center justify-center">
          <p className="text-6xl items-center text-base-txtClr">
            {user ? `Welcome ${user.userName}` : `Welcome to the hero builder`}
          </p>
          <span className="text-3xl w-3/4 text-center py-10 text-base-txtClr">
            Buy items, give your hero a backstory and save them to your gallery
          </span>
          <article className="flex gap-10 items-center">
            <span className="flex flex-col w-2/3 text-xl gap-3">
              <span className="flex gap-1 self-center">
                <Link className="text-blue-400" href="/signup">
                  Sign up
                </Link>
                or{" "}
                <Link
                  className="text-green-300 underline-offset-4"
                  href={user ? "" : "/localCreate"}
                >
                  continue
                </Link>
                without an account
              </span>
              <span className="flex">
                {" "}
                Creating an account will save your heroes in the{" "}
                <p className="text-blue-300 pl-1"> database</p>.
              </span>
              <span className="flex">
                {" "}
                Continuing without an account will save them in{" "}
                <p className="text-green-300 pl-1"> local storage</p>.
              </span>
              {/* <p>
                {" "}
                Continuing without an account will save them in local storage.
              </p> */}
              <p>
                {" "}
                You can delete your account as well as locally stored heroes.
              </p>
            </span>
            <LoginForm />
            {/* <span className="flex w-80 gap-2 text-xl">
              Want an account?
              <Link className="text-blue-400" href="/signup">
                Sign up
              </Link>
            </span> */}
          </article>
          <div className="pt-10">
            <Button onClick={() => handleQuick()}>Quick Signup</Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
