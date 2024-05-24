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

const Home = () => {
  const [currentUser, userHeroes] = trpc.useQueries((t) => [
    t.user.getUserById(),
    t.user.getHeroesByUser(),
  ]);

  const { isLoading } = trpc.user.getUserById.useQuery();

  const user = currentUser.data;
  const heroes = userHeroes.data ? userHeroes.data : [];

  const quickUser = trpc.user.createUser.useMutation({
    onSuccess: async () => {
      console.log("New use created");
    },
  });

  const handleQuick = () => {
    const quickData: User = {
      userName: "Lopside",
      email: "james@email.com",
      password: "pass",
      repeatPassword: "pass",
      pic: "",
    };

    try {
      quickUser.mutateAsync(quickData);
    } catch (error) {
      console.error("Quick user Error", error);
    }
  };

  return (
    <div className="bg-base-bg items-center flex flex-col min-h-screen">
      <div className="w-3/4 flex flex-col items-center gap-10 pt-20 ">
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : !user ? (
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
              <Link className="text-blue-400" href="/signup">
                Sign up
              </Link>
            </span>
            <div className="pt-10">
              <Button onClick={() => handleQuick()}>Quick Signup</Button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-6xl pl-10 text-base-txtClr">
              Welcome {user.userName}
            </h1>
            <div className="flex items-center justify-evenly py-10">
              <Image alt="Your pic" height={200} src={user.pic} width={200} />
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
                      <TableRow className="hover:bg-base-bg" key={hero.id}>
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
        )}
        <div className="flex gap-8 py-10 "></div>
      </div>
    </div>
  );
};

export default Home;
// import { trpc } from "@/utils/trpc";
// import Image from "next/image";
// import Link from "next/link";
// import LoginForm from "@/pages/api/loginForm";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { Loader2 } from "lucide-react";

// const Home = () => {
//   const [currentUser, userHeroes] = trpc.useQueries((t) => [
//     t.user.getUserById(),
//     t.user.getHeroesByUser(),
//   ]);

//   const { isLoading } = trpc.user.getHeroesByUser.useQuery();

//   const user = currentUser.data;
//   const heroes = userHeroes.data ? userHeroes.data : [];

//   return (
//     <div className="bg-base-bg items-center flex flex-col min-h-screen">
//       <div className="w-3/4 flex flex-col items-center gap-10 pt-20 ">
//         {user && !isLoading ? (
//           <div>
//             <h1 className="text-6xl pl-10 text-base-txtClr">
//               Welcome {user.userName}
//             </h1>
//             <div className="flex items-center justify-evenly py-10">
//               <Image alt="Your pic" height={200} src={user.pic} width={200} />
//               <h1 className="text-2xl">
//                 {heroes.length > 1
//                   ? heroes.length + " heroes"
//                   : heroes.length === 1
//                   ? "1 hero"
//                   : "No heroes"}
//               </h1>
//             </div>
//             <Table>
//               <TableCaption></TableCaption>
//               <TableHeader>
//                 <TableRow className="hover:bg-base-bg text-xl">
//                   <TableHead>Name</TableHead>
//                   <TableHead>Damage</TableHead>
//                   <TableHead>Movespeed</TableHead>
//                   <TableHead>Weapon</TableHead>
//                   <TableHead>Boots</TableHead>
//                   <TableHead>Avatar</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody className="text-xl ">
//                 {heroes
//                   ?.slice(0)
//                   .reverse()
//                   .map((hero) => {
//                     return (
//                       <TableRow className="hover:bg-base-bg" key={hero.id}>
//                         <TableCell>{hero.details.name}</TableCell>
//                         <TableCell className="pl-7">
//                           {hero.details.damage}
//                         </TableCell>
//                         <TableCell className="pl-9">
//                           {hero.details.speed}
//                         </TableCell>
//                         <TableCell>
//                           <Avatar>
//                             <AvatarImage src={hero.weapon.img} />
//                           </Avatar>
//                         </TableCell>
//                         <TableCell>
//                           <Avatar>
//                             <AvatarImage src={hero.boots.img} />
//                           </Avatar>
//                         </TableCell>
//                         <TableCell>
//                           <Avatar>
//                             <AvatarImage src={hero.details.img} />
//                           </Avatar>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })}
//               </TableBody>
//             </Table>
//           </div>
//         ) : !user ? (
//           <div className="flex flex-col items-center justify-center">
//             <p className="text-6xl items-center text-base-txtClr">
//               Welcome to the hero builder
//             </p>
//             <span className="text-3xl w-3/4 text-center py-10 text-base-txtClr">
//               Buy items, give your hero a backstory and save them to your
//               gallery
//             </span>
//             <LoginForm />
//             <span className="flex w-80 gap-2 text-xl">
//               Don&apos;t have an account?
//               <Link className="text-blue-400" href="/signup">
//                 Sign up
//               </Link>
//             </span>
//           </div>
//         ) : (
//           <Loader2 className="animate-spin" />
//         )}
//         <div className="flex gap-8 py-10 "></div>
//       </div>
//     </div>
//   );
// };

// export default Home;
