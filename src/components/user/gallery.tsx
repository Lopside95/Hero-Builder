import { trpc } from "@/utils/trpc";
import Navbar from "../Navbar";

import { Card, CardContent } from "../ui/card";
import GalleryCard from "./galleryCard";
import { Boots, Details, Weapon } from "@/types/hero";
import { Separator } from "../ui/separator";
import { Suspense } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export interface HeroInterface {
  details: Details;
  boots: Boots;
  weapon: Weapon;
}

const Gallery = () => {
  const { data: heroes, isLoading } = trpc.user.getHeroesByUser.useQuery();

  return (
    <div className="w-full pt-20 flex flex-col items-center justify-center  min-h-screen bg-base-bg text-base-txtClr">
      {heroes && heroes?.length > 0 ? (
        heroes
          .slice(0)
          .reverse()
          .map((hero, index, array) => {
            return (
              <div key={hero.id} className="">
                <GalleryCard
                  details={hero.details as Details}
                  boots={hero.boots as Boots}
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
      )}
    </div>
  );
};

export default Gallery;
