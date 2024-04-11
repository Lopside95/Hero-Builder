import { trpc } from "@/utils/trpc";
import Navbar from "../Navbar";

import { Card, CardContent } from "../ui/card";
import GalleryCard from "./galleryCard";
import { Boots, Details, Weapon } from "@/types/hero";

// type HeroDetails = {
//   name: string;
//   speed: number;
//   damage: number;
//   story: string;
//   img: string;
// };
// type HeroBoots = {
//   name: string;
//   speed: number;
//   img: string;
//   bonus: string;
//   description: string;
//   cost: number;
// };

// type HeroWeapon = {
//   name: string;
//   damage: number;
//   img: string;
//   bonus: string;
//   description: string;
//   cost: number;
// };

export interface HeroInterface {
  details: Details;
  boots: Boots;
  weapon: Weapon;
}

const Gallery = () => {
  const { data: heroes, isLoading } = trpc.user.getHeroesByUser.useQuery();

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
                  details={hero.details as Details}
                  boots={hero.boots as Boots}
                  weapon={hero.weapon as Weapon}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Gallery;