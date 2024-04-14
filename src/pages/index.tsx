import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import { useSession } from "next-auth/react";

type IndexPics = {
  id: string;
  url: string;
}[];

const Home = () => {
  const { data: heroImgs } = trpc.shop.getAllHeroPics.useQuery();
  const { data: user } = trpc.user.getUserById.useQuery();
  const vampLord = heroImgs?.find((img) =>
    img.url.includes("vampireLord")
  )!.url;

  return (
    <div className="bg-base-bg items-center flex flex-col min-h-screen">
      <Navbar />
      <div className="w-3/4 flex flex-col items-center gap-5 pt-20 ">
        <span className="text-6xl text-base-txtClr">
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
        </span>
        {/* <Button variant="select" className="w-1/4 h-12 text-lg">
          <Link href="/items">Get Building</Link>
        </Button> */}

        <div className="flex gap-8 py-10 ">
          {/* <LoginForm /> */}
          <Image
            src={vampLord!}
            alt=""
            className="w-80 rounded-full"
            width={350}
            height={350}
          />
          {/* {indexPics.map((pic) => {
            return (
              <img
                loading="eager"
                key={pic.id}
                alt=""
                src={pic.url}
                className="w-52 rounded-full"
              />
            );
          })} */}
        </div>
      </div>
      {/* <LoginPage /> */}
    </div>
  );
};

export default Home;
