import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import { useSession } from "next-auth/react";
import SignupForm from "@/components/user/signupNon";
import { useState } from "react";
// import LoginForm from "@/components/user/loginForm";
import Link from "next/link";
import dynamic from "next/dynamic";
import LoginForm from "@/components/user/loginForm";
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

type IndexPics = {
  id: string;
  url: string;
}[];

const Home = () => {
  // const { data: heroes, isLoading } = trpc.user.getHeroesByUser.useQuery();

  const { data: heroImgs } = trpc.shop.getAllHeroPics.useQuery();
  // const { data: user } = trpc.user.getUserById.useQuery();

  const findHeroPic = (incl: string) => {
    const link = heroImgs?.find((img) => img.url.includes(incl))!.url;
    return link;
  };

  const [currentUser, userHeroes] = trpc.useQueries((t) => [
    t.user.getUserById(),
    t.user.getHeroesByUser(),
  ]);

  const archerPic = findHeroPic("archer");

  const vampLord = heroImgs?.find((img) =>
    img.url.includes("vampireLord")
  )!.url;

  const user = currentUser.data;
  const { data: boots } = trpc.shop.getAllBoots.useQuery();

  const heroes = userHeroes.data ? userHeroes.data : [];
  // const heroArr = heroes ? heroes : [];

  return (
    <div className="bg-base-bg items-center flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <div className="w-3/4 flex flex-col items-center gap-10 pt-20 ">
        {user ? (
          <div>
            <h1 className="text-6xl pl-10 text-base-txtClr">
              Welcome {user.userName}
            </h1>
            <div className="flex items-center justify-evenly py-10">
              <Image src={user.pic} alt="Your pic" width={200} height={200} />
              <h1 className="text-2xl">
                {heroes.length > 1
                  ? heroes.length + " heroes"
                  : heroes.length === 1
                  ? "1 hero"
                  : "No heroes"}
                {/* make so that no heroes clicks to create */}
              </h1>
            </div>

            <Table>
              <TableCaption></TableCaption>
              <TableHeader>
                <TableRow className="hover:bg-base-bg text-xl">
                  <TableHead>Name</TableHead>
                  <TableHead>Damage</TableHead>
                  <TableHead>Movespeed</TableHead>
                  <TableHead>Weapon</TableHead>
                  <TableHead>Boots</TableHead>
                  <TableHead>Avatar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xl ">
                {heroes
                  ?.slice(0)
                  .reverse()
                  .map((hero) => {
                    return (
                      <TableRow key={hero.id} className="hover:bg-base-bg">
                        <TableCell>{hero.details.name}</TableCell>
                        <TableCell className="pl-7">
                          {hero.details.damage}
                          {/* <Image
                            src={hero.boots.img}
                            width={20}
                            height={20}
                            alt="boots"
                            className="w-10"
                          /> */}
                        </TableCell>
                        <TableCell className="pl-9">
                          {hero.details.speed}
                        </TableCell>
                        <TableCell>
                          <Avatar>
                            <AvatarImage src={hero.weapon.img} />
                          </Avatar>
                          {/* <Image
                            src={hero.weapon.img}
                            width={30}
                            height={30}
                            className="w-12"
                            alt="boots"
                          /> */}
                        </TableCell>
                        <TableCell>
                          <Avatar>
                            <AvatarImage src={hero.boots.img} />
                          </Avatar>
                          {/* <Image
                            src={hero.boots.img}
                            width={80}
                            height={80}
                            className="w-12"
                            alt="boots"
                          /> */}
                        </TableCell>
                        <TableCell>
                          <Avatar>
                            <AvatarImage src={hero.details.img} />
                          </Avatar>
                          {/* <Image
                            src={hero.details.img}
                            width={30}
                            height={30}
                            className="w-12"
                            alt="avatars"
                          /> */}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-6xl items-center text-base-txtClr">
              Welcome to the hero builder
            </p>
            <span className="text-3xl w-3/4 text-center py-10 text-base-txtClr">
              Buy items, give your hero a backstory and save them to your
              gallery
            </span>
            <LoginForm />
            <span className="flex w-80 gap-2 text-xl">
              Don&apos;t have an account?
              <Link href="/signup" className="text-blue-400">
                Sign up
              </Link>
            </span>
          </div>
        )}
        <div className="flex gap-8 py-10 "></div>
      </div>
    </div>
  );
};

export default Home;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getServerAuthSession(context);

//   if (session) {
//     return {
//       redirect: {
//         destination: "/dashboard",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

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
