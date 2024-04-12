import { Coins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useFormContext } from "react-hook-form";
import { FinalHeroSchema } from "@/types/hero";

const HeroPreview = () => {
  const { watch } = useFormContext<FinalHeroSchema>();

  const boots = watch("boots");
  const weapon = watch("weapon");
  const gold = watch("gold");

  const remainingGold = gold - (boots.cost + weapon.cost);

  return (
    <Card className="border flex gap-6 sticky justify-center flex-col h-[300px]">
      <CardTitle className="self-center flex gap-1">
        <p>{remainingGold}</p> <Coins className="text-yellow-500" />
      </CardTitle>
      <CardContent className="flex flex-col gap-2">
        <p>{boots.name}</p>
        <p>{weapon.name}</p>

        <p className="text-xl">Damage: {weapon.damage}</p>
        <p className="text-xl">Move speed: {boots.speed}</p>
      </CardContent>
    </Card>
  );
};

export default HeroPreview;
