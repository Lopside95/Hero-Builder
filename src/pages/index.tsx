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

type IndexPics = {
  id: string;
  url: string;
}[];

const Home = () => {
  const [login, setLogin] = useState<boolean>(true);

  const { data: heroes, isLoading } = trpc.user.getHeroesByUser.useQuery();

  const { data: heroImgs } = trpc.shop.getAllHeroPics.useQuery();
  const { data: user } = trpc.user.getUserById.useQuery();

  const findHeroPic = (incl: string) => {
    const link = heroImgs?.find((img) => img.url.includes(incl))!.url;
    return link;
  };

  const archerPic = findHeroPic("archer");

  const vampLord = heroImgs?.find((img) =>
    img.url.includes("vampireLord")
  )!.url;

  const { data: boots } = trpc.shop.getAllBoots.useQuery();

  return (
    <div className="bg-base-bg items-center flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <div className="w-3/4 flex flex-col items-center gap-5 pt-20 ">
        {user ? (
          <div>
            <h1 className="text-6xl text-base-txtClr">
              Welcome back {user.userName}
            </h1>
            <div className="flex items-center justify-evenly py-10">
              <Image
                src={vampLord || ""}
                alt="Your pic"
                width={200}
                height={200}
              />
              <span className="text-2xl">{`${heroes?.length} Heroes`}</span>
            </div>
            {/* <img
              src="https://hero-fighter.s3.eu-north-1.amazonaws.com/heroImgs/archer.jpg"
              className="w-60 rounded-full"
              alt="m hm"
            /> */}
            <Table>
              <TableCaption></TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Damage</TableHead>
                  <TableHead>Movespeed</TableHead>
                  <TableHead>Avatar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xl">
                {heroes
                  ?.slice(0)
                  .reverse()
                  .map((hero) => {
                    return (
                      <TableRow key={hero.id}>
                        <TableCell>{hero.details.name}</TableCell>
                        <TableCell>
                          {hero.details.damage}
                          {/* <Image
                            src={hero.boots.img}
                            width={20}
                            height={20}
                            alt="boots"
                            className="w-10"
                          /> */}
                        </TableCell>
                        <TableCell>{hero.details.speed}</TableCell>
                        <TableCell>
                          <Image
                            src={hero.details.img}
                            width={30}
                            height={30}
                            className="w-12"
                            alt="avatars"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>

            {/* <ul>
              {heroes?.map((hero) => {
                return <li key={hero.id}>{hero.details.name}</li>;
              })}
            </ul> */}
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
