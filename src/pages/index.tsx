import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import { useSession } from "next-auth/react";
import SignupForm from "@/components/user/signup";
import { useState } from "react";
import LoginForm from "@/components/user/loginForm";
import Link from "next/link";

type IndexPics = {
  id: string;
  url: string;
}[];

const Home = () => {
  const [login, setLogin] = useState<boolean>(true);

  const { data: heroImgs } = trpc.shop.getAllHeroPics.useQuery();
  const { data: user } = trpc.user.getUserById.useQuery();
  const vampLord = heroImgs?.find((img) =>
    img.url.includes("vampireLord")
  )!.url;

  return (
    <div className="bg-base-bg items-center flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <div className="w-3/4 flex flex-col items-center gap-5 pt-20 ">
        {user ? (
          <div>
            <h1 className="text-6xl text-base-txtClr">
              Welcome back {user.userName}
            </h1>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-6xl items-center text-base-txtClr">
              Welcome to the hero builder
            </p>
            <span className="text-3xl w-3/4 text-center py-10 text-base-txtClr">
              Buy items and use your remaining gold to adjust the final stats of
              your hero before saving them to a gallery and building your team
            </span>
            <LoginForm />
            <span className="flex w-80 gap-2">
              Don&apos;t have an account?
              <Link href="/signup" className="text-blue-400">
                Sign up
              </Link>
            </span>
            {/* <p>{`Don't have an account?  Sign up`}</p> */}
          </div>
        )}
        <div className="flex gap-8 py-10 ">
          {/* <LoginForm /> */}
          {/* <img src={vampLord!} alt="" className="w-80 rounded-full" /> */}
          {/* <Image
            src={vampLord!}
        img    alt=""
            className="w-80 rounded-full"
            width={350}
            height={350}
          /> */}
        </div>
      </div>
      {/* <LoginPage /> */}
    </div>
  );
};

export default Home;

{
  /* <span className="text-6xl text-base-txtClr">
          {user ? (
            <p>Welcome back {user.name}</p>
          ) : (
            <div className="w-3/4">
              <p>Welcome to the hero builder</p>
              <span className="text-3xl w-2/3 text-center py-10 text-base-txtClr">
                Buy items and use your remaining gold to adjust the final stats
                of your hero before saving them to a gallery and building your
                team
              </span>
            </div>
          )}
        </span> */
}
