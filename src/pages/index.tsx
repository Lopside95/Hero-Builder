import { trpc } from "@/utils/trpc";
import Image from "next/image";
import Link from "next/link";
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

const Home = () => {
  const [currentUser, userHeroes] = trpc.useQueries((t) => [
    t.user.getUserById(),
    t.user.getHeroesByUser(),
  ]);

  const user = currentUser.data;
  const heroes = userHeroes.data ? userHeroes.data : [];

  return (
    <div className="bg-base-bg items-center flex flex-col min-h-screen">
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
                        </TableCell>
                        <TableCell className="pl-9">
                          {hero.details.speed}
                        </TableCell>
                        <TableCell>
                          <Avatar>
                            <AvatarImage src={hero.weapon.img} />
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          <Avatar>
                            <AvatarImage src={hero.boots.img} />
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          <Avatar>
                            <AvatarImage src={hero.details.img} />
                          </Avatar>
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
