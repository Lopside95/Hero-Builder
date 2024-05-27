import { trpc } from "@/utils/trpc";
import GalleryCard from "./galleryCard";
import { Boots, Details, Weapon } from "@/types/hero";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { User } from "@/types/user";
import { useEffect, useState } from "react";

export interface HeroInterface {
  details: Details;
  boots: Boots;
  weapon: Weapon;
}

const LocalGallery = () => {
  return (
    <div className="w-full pt-20 flex flex-col items-center justify-center  min-h-screen ">
      {/* <Button onClick={() => handleDelete}>Delete Account</Button> */}
      {/* 
        <GalleryCard  


/> */}

      {/* {heroes && heroes?.length > 0 ? (
        heroes
          .slice(0)
          .reverse()
          .map((hero, index, array) => {
            return (
              <div className="" key={hero.id}>
                <GalleryCard
                  boots={hero.boots as Boots}
                  details={hero.details as Details}
                  weapon={hero.weapon as Weapon}
                />
                {index !== array.length - 1 && <Separator className="" />}
              </div>
            );
          })
      ) : (
        <h1 className="text-3xl fixed top-52">
          Your saved heroes will appear here
        </h1>
      )} */}
    </div>
  );
};

export default LocalGallery;

// const { data: heroes, isLoading } = trpc.user.getHeroesByUser.useQuery();

// const utils = trpc.useUtils();
// const { data: session, update: updateSession } = useSession();

// const deleteUser = trpc.user.deleteAccount.useMutation({
//   onSuccess: async () => {
//     await utils.user.invalidate();
//     updateSession();
//   },
// });
// const [currentUser, userHeroes] = trpc.useQueries((t) => [
//   t.user.getUserById(),
//   t.user.getHeroesByUser(),
// ]);

// const user = currentUser.data;
// const heroes = userHeroes.data ? userHeroes.data : [];

// // deleting user is a WIP
// const handleDelete = async (user: User) => {
//   try {
//     deleteUser.mutateAsync(user);
//   } catch (error) {
//     console.error(error);
//   }
// };

//   const localOne: HeroInterface = localStorage.getItem("hero");

//   const localHero = localOne ? JSON.parse(localOne) : null;

//   console.log("localHero", localHero);

//   const localArr = [];

//   useEffect(() => {
//     localArr.push(localHero[-1]);
//   }, [localHero]);

//   console.log("localArr", localArr);

//   console.log(localArr.length);
