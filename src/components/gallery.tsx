import { trpc } from "@/utils/trpc";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { FinalHeroSchema, finalHeroSchema } from "@/types/hero";
import { Boots, FinalHero } from "@prisma/client";
import { Card, CardContent } from "./ui/card";

const Gallery = () => {
  const { data: heroes, isLoading } = trpc.user.getSecondheroes.useQuery();

  return (
    <div className="w-full pt-20 flex flex-col  items-center justify-center  min-h-screen bg-base-bg text-base-txtClr">
      <Navbar />
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          {heroes?.map((hero) => {
            return (
              <Card key={hero.name}>
                <CardContent>
                  <ul>
                    <li>{hero.name}</li>
                    <li>{hero.story}</li>
                    <li>{hero.damage}</li>
                    <li>{hero.speed}</li>
                    <li>{hero.heroBoots.name}</li>
                    {/* <li>{hero.weapon.name}</li>
                    <li>{hero.boots.name}</li> */}
                  </ul>
                </CardContent>
              </Card>
            );
          })}

          {/* <p>{allHeroes ? allHeroes[1].boots.name : "Nope"}</p> */}

          {/* <img src={firstBootsImg} alt="" className="w-40" /> */}
        </div>
      )}
    </div>
  );
};

export default Gallery;

// const { data: finalHeroes, isLoading } = trpc.user.getFinalHeroes.useQuery();
// const { data: boots } = trpc.shop.getAllBoots.useQuery();
// const { data: weapons } = trpc.shop.getAllWeapons.useQuery();

// const [allHeroes, setAllHeroes] = useState<FinalHeroSchema[]>([]);

// const bootsDictionary = boots
//   ? boots.reduce((acc, boot) => {
//       acc[boot.name] = {
//         id: boot.id,
//         name: boot.name,
//         moveSpeed: boot.moveSpeed,
//         bonus: boot.bonus,
//         description: boot.description || "",
//         cost: boot.cost,
//         url: boot.url,
//       };

//       return acc;
//     }, {} as Record<string | number, Boots>)
//   : {};

// const heroDictionary = finalHeroes
//   ? finalHeroes.reduce((acc, hero) => {
//       acc[hero.id] = {
//         name: hero.name,
//         speed: hero.speed,
//         damage: hero.damage,
//         profilePic: hero.profilePic,
//         backstory: hero.backstory,
//         id: hero.id,
//         bootsId: hero.bootsId,
//         weaponId: hero.weaponId,
//         userId: hero.userId,
//       };
//       return acc;
//     }, {} as Record<string | number, FinalHero>)
//   : {};

// const heroIds = Object.keys(heroDictionary);

// const heroVals = Object.values(heroDictionary);

// console.log("heroVals", heroVals);
// // console.log("heroNames", heroNames);

// const firstBootsImg: string =
//   allHeroes && allHeroes.length > 0 ? allHeroes[1].boots.url : "";

// console.log("bootsDictionary", bootsDictionary);
