import { trpc } from "@/utils/trpc";
import GalleryCard from "./galleryCard";
import { Boots, Details, Weapon } from "@/types/hero";
import { Separator } from "../../ui/separator";

export interface HeroInterface {
  details: Details;
  boots: Boots;
  weapon: Weapon;
}

const Gallery = () => {
  const { data: heroes } = trpc.user.getHeroesByUser.useQuery();

  return (
    <div className="w-full pt-20 flex flex-col items-center justify-center  min-h-screen bg-base-bg text-base-txtClr">
      {heroes &&
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
                {/* above prevents separator from rendering below the final hero */}
              </div>
            );
          })}
    </div>
  );
};

export default Gallery;
