import { Boots, ExampleHeroSchema } from "@/types/hero";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { Button } from "./ui/button";

const DisplayExample = () => {
  // const { data: example, isLoading } = trpc.hero.getExample.useQuery();

  // const egArr: ExampleHeroSchema[] =
  //   example !== undefined && example?.length > 0 ? example : [];

  // console.log("egArr", egArr);

  const [allBoots, setAllBoots] = useState<Boots[]>();

  const { data: boots } = trpc.shop.getAllBoots.useQuery();

  console.log("boots", boots);

  const bootsArr: Boots[] =
    boots !== undefined && boots.length > 0 ? boots : [];

  console.log("bootsArr", bootsArr);
  console.log("allBoots", allBoots);

  return (
    <div className="bg-gray-700 w-1/2">
      <Button onClick={() => setAllBoots(boots)}>Set</Button>
      {/* <h1>{egArr.length > 0 ? egArr[2].name : ""}</h1>
      <img src={egArr[2].bootsImg} alt="" className="w-40" /> */}
    </div>
  );
};

export default DisplayExample;
