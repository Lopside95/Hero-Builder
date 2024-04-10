/* eslint-disable @next/next/no-img-element */

import Navbar from "@/components/Navbar";
import BootsForm from "@/components/bootsForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { heroDetails } from "@/types/hero";
import { User, userSchema } from "@/types/user";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";

export const simpleHeroSchema = z.object({
  name: z.string(),
  boots: z.string(),
  weapon: z.string(),
  user: z.string(),
});

const Profile = () => {
  const { data: finalHeroes } = trpc.user.getFinalHeroes.useQuery();

  console.log("finalHeroes", finalHeroes);

  // const { data: boots } = trpc.shop.getAllBoots.useQuery();
  // const { data: weapons } = trpc.shop.getAllWeapons.useQuery();

  // const heroesArr = userHeroes;

  // console.log("heroesArr", heroesArr);

  return (
    <div className="w-full min-h-screen bg-base-bg text-base-txtClr pt-20 flex flex-col items-center">
      <Navbar />
      <div>
        <h1>Hero Here</h1>
      </div>
    </div>
  );
};

export default Profile;
