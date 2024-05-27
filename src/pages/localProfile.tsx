import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import DeleteUser from "@/components/user/deleteUser";
import Gallery from "@/components/user/gallery";
import GalleryCard from "@/components/user/galleryCard";
import LocalGallery, { HeroInterface } from "@/components/user/localGallery";
import NoProfile from "@/components/user/noProfile";
import NoSession from "@/components/user/noSession";
import { Boots, Details, Weapon } from "@/types/hero";
import { trpc } from "@/utils/trpc";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const LocalProfile = () => {
  const { data: session, update } = useSession();

  const { data: user, isLoading } = trpc.user.getUserById.useQuery();
  const router = useRouter();
  const utils = trpc.useUtils();

  const sessionHeroes = sessionStorage.getItem("heroes");
  useEffect(() => {
    if (sessionHeroes) {
      setLocalHeroes(JSON.parse(sessionHeroes));
    }
  }, []);

  const [localHeroes, setLocalHeroes] = useState<HeroInterface[]>([]);
  useEffect(() => {
    sessionStorage.setItem("heroes", JSON.stringify(localHeroes));

    console.log(localHeroes.length);
  }, [localHeroes]);

  return (
    <div className="w-full min-h-screen bg-base-bg text-base-txtClr pt-20 flex flex-col items-center">
      {/* <LocalGallery /> */}
      {localHeroes && localHeroes?.length > 0 ? (
        localHeroes
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
              </div>
            );
          })
      ) : (
        <h1 className="text-3xl fixed top-52">
          Your saved heroes will appear here
        </h1>
      )}

      {/* <GalleryCard  
      details={localHeroes.details as Details}
      weapon={weapon}
      boots={boots}

/> */}
      <Button onClick={() => console.log(localHeroes[0])}>Log</Button>
      <Button onClick={() => setLocalHeroes(JSON.parse(sessionHeroes))}>
        setHeroes
      </Button>
    </div>
  );
};

export default LocalProfile;
