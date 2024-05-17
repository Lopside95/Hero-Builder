import { trpc } from "@/utils/trpc";
import GalleryCard from "./galleryCard";
import { Boots, Details, Weapon } from "@/types/hero";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
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

  // deleting user is a WIP
  const handleDelete = async (user: User) => {
    try {
      deleteUser.mutateAsync(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full pt-20 flex flex-col items-center justify-center  min-h-screen bg-base-bg text-base-txtClr">
      <Button onClick={() => handleDelete}>Delete Account</Button>
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
                {/* above prevents separator from rendering below the final hero */}
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
