import { trpc } from "@/utils/trpc";
import Navbar from "../Navbar";

import { Card, CardContent } from "../ui/card";
import GalleryCard from "./galleryCard";
import { Boots, Details, Weapon } from "@/types/hero";
import { Separator } from "../ui/separator";
import { Suspense } from "react";
import Image from "next/image";

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

      {heroes?.reverse().map((hero) => {
        return (
          <div key={hero.id} className="">
            <GalleryCard
              details={hero.details as Details}
              boots={hero.boots as Boots}
              weapon={hero.weapon as Weapon}
            />
            <Separator className="" />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
