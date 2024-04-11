import { trpc } from "@/utils/trpc";
import Navbar from "./Navbar";

import { Card, CardContent } from "./ui/card";
import GalleryCard from "./galleryCard";
import { UserHero } from "@/types/hero";

type HeroDetails = {
  name: string;
  speed: number;
  damage: number;
  story: string;
  img: string;
};
type HeroBoots = {
  name: string;
  speed: number;
  img: string;
  bonus: string;
  description: string;
  cost: number;
};

type HeroWeapon = {
  name: string;
  damage: number;
  img: string;
  bonus: string;
  description: string;
  cost: number;
};

export interface HeroInterface {
  details: HeroDetails;
  boots: HeroBoots;
  weapon: HeroWeapon;
}

const Gallery = () => {
  const { data: heroes, isLoading } = trpc.user.getUserHeroes.useQuery();

  // const firstHero = heroes ? heroes[0] : undefined;

  return (
    <div className="w-full pt-20 flex flex-col  items-center justify-center  min-h-screen bg-base-bg text-base-txtClr">
      <Navbar />
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          {heroes?.map((hero) => {
            return (
              <div key={hero.id}>
                <GalleryCard
                  details={hero.details as HeroDetails}
                  boots={hero.boots as HeroBoots}
                  weapon={hero.weapon as HeroWeapon}
                />
              </div>
            );
          })}
        </div>
        // <div>
        //   {heroes?.map((hero) => {
        //     return (
        //       <Card key={hero.name}>
        //         <CardContent>
        //           <ul>
        //             <li>{hero.name}</li>
        //             <li>{hero.story}</li>
        //             <li>{hero.damage}</li>
        //             <li>{hero.speed}</li>
        //             <li>{hero.heroBoots.name}</li>

        //           </ul>
        //         </CardContent>
        //       </Card>
        //     );
        //   })}

        // </div>
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
