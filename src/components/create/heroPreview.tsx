import { Coins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useFormContext } from "react-hook-form";
import { FinalHeroSchema } from "@/types/hero";
import { LoadingProps } from "@/pages/create";
import { ShopSkeleton } from "../shopSkeleton";

const HeroPreview = () => {
  const { watch } = useFormContext<FinalHeroSchema>();

  const boots = watch("boots");
  const weapon = watch("weapon");
  const gold = watch("gold");

  const remainingGold = gold - (boots.cost + weapon.cost);

  return (
    // <div>
    //   {!isFetched ? (
    //     <ShopSkeleton />
    //   ) : (
    <Card className="border flex gap-6 justify-center w-60 flex-col rounded-b-none text-xl h-[300px]">
      <CardTitle className="self-center flex gap-1">
        <p>{remainingGold}</p> <Coins className="text-yellow-500" />
      </CardTitle>
      <CardContent className="flex flex-col gap-4">
        <span className=" ">
          <p className="">Damage: {weapon.damage}</p>
          <p>{weapon.name !== "" ? weapon.name : "Choose weapon"}</p>

          <p className="">Move speed: {boots.speed}</p>
          <p>{boots.name !== "" ? boots.name : "Choose weapon"}</p>
        </span>
      </CardContent>
    </Card>
    //   )}
    // </div>
  );
};

export default HeroPreview;
