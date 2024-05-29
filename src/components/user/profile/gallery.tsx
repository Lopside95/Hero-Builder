import { trpc } from "@/utils/trpc";
import GalleryCard from "./galleryCard";
import { Boots, Details, Weapon } from "@/types/hero";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { useSession } from "next-auth/react";
import { User } from "@/types/user";

export interface HeroInterface {
  details: Details;
  boots: Boots;
  weapon: Weapon;
}

const Gallery = () => {
  // const { data: heroes, isLoading } = trpc.user.getHeroesByUser.useQuery();

  const utils = trpc.useUtils();
  const { data: session, update: updateSession } = useSession();

  const deleteUser = trpc.user.deleteAccount.useMutation({
    onSuccess: async () => {
      await utils.user.invalidate();
      updateSession();
    },
  });
  const [currentUser, userHeroes] = trpc.useQueries((t) => [
    t.user.getUserById(),
    t.user.getHeroesByUser(),
  ]);

  const user = currentUser.data;
  const heroes = userHeroes.data ? userHeroes.data : [];

  return (
    <div className="w-full pt-20 flex flex-col items-center justify-center  min-h-screen bg-base-bg text-base-txtClr">
      {heroes
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
