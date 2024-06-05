"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HeroInterface } from "@/components/user/profile/gallery";
import GalleryCard from "@/components/user/profile/galleryCard";
import { Boots, Details, Weapon } from "@/types/hero";
import { useEffect, useState } from "react";

const LocalProfile = () => {
  const [localHeroes, setLocalHeroes] = useState<HeroInterface[]>([]);

  const sessionHeroes =
    typeof window !== "undefined" ? localStorage.getItem("heroes") : [];
  useEffect(() => {
    if (sessionHeroes && sessionHeroes.length > 0) {
      setLocalHeroes(JSON.parse(sessionHeroes as string));
    }
  }, []);

  const handleDelete = () => {
    try {
      localStorage.removeItem("heroes");
    } catch (error) {
      console.error(error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div className="w-full min-h-screen bg-base-bg text-base-txtClr pt-20 flex flex-col items-center">
      <Button onClick={handleDelete}>Delete locally stored heroes</Button>
      {localHeroes && localHeroes?.length > 0 ? (
        localHeroes
          // places most recent hero at top of the gallery
          .slice(0)
          .reverse()
          .map((hero, index, array) => {
            return (
              <div className="" key={hero.details.name}>
                <GalleryCard
                  boots={hero.boots as Boots}
                  details={hero.details as Details}
                  weapon={hero.weapon as Weapon}
                />
                {index !== array.length - 1 && <Separator className="" />}
                {/* Prevents separator from being shown after the bottom-most hero */}
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

export default LocalProfile;
