import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQueries, useQuery } from "react-query";
import LoginPage from "./login";
import { trpc } from "@/utils/trpc";
import Image from "next/image";

type IndexPics = {
  id: string;
  url: string;
}[];

const Home = () => {
  const { data: boots, isLoading } = trpc.shop.getAllBoots.useQuery();

  // const

  return (
    <div className="bg-base-bg items-center flex flex-col min-h-screen">
      <Navbar />
      <div className="w-3/4 flex flex-col items-center gap-5 pt-20 ">
        <span className="text-6xl text-base-txtClr">
          Welcome to the hero builder
        </span>
        <span className="text-3xl w-2/3 text-center py-10 text-base-txtClr">
          Buy items and use your remaining gold to adjust the final stats of
          your hero before saving them to a gallery and building your team
        </span>
        <Button variant="select" className="w-1/4 h-12 text-lg">
          <Link href="/items">Get Building</Link>
        </Button>

        <div className="flex gap-8 py-10 ">
          <Image
            src="https://zq5hzutac0xrpkxh.public.blob.vercel-storage.com/bootsOfSpeed-MxNNUTYN1f4DGczAV9l9XlPOaf1BlW.jpg"
            width={500}
            height={500}
            alt=""
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
