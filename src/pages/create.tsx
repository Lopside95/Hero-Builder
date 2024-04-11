import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { User, userSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { prisma } from "./api/db";
import { Boots, FinalHeroSchema, finalHeroSchema } from "@/types/hero";
import Navbar from "@/components/Navbar";
import BootsForm from "@/components/create/bootsForm";
import WeaponsForm from "@/components/create/weaponForm";
import DetailsForm from "@/components/create/detailsForm";
import { useSession } from "next-auth/react";
import PicturesForm from "@/components/create/picsForm";

const Home = () => {
  const form = useForm<FinalHeroSchema>({
    resolver: zodResolver(finalHeroSchema),
    defaultValues: {
      boots: {
        name: "",
        speed: 0,
        bonus: "",
        description: "",
        cost: 0,
        img: "",
      },
      weapon: {
        name: "",
        damage: 0,
        bonus: "",
        description: "",
        cost: 0,
        img: "",
      },
      details: {
        speed: 0,
        damage: 0,
        name: "",
        img: "",
        story: "",
      },

      gold: 85,
    },
  });

  const { data: user } = trpc.user.getUserById.useQuery();
  const utils = trpc.useUtils();

  const { update: updateSession } = useSession();

  const createNewHero = trpc.hero.createFinalHero.useMutation({
    onSuccess: async () => {
      alert("User hero created");
      updateSession();
    },
  });

  const onSubmit: SubmitHandler<FinalHeroSchema> = async (
    data: FinalHeroSchema
  ) => {
    await createNewHero.mutateAsync(data);
  };

  const gold = form.watch("gold");
  const boots = form.watch("boots");
  const weapon = form.watch("weapon");
  const damage = form.watch("details.damage");
  const speed = form.watch("details.speed");
  const adjustedGold = gold ? gold - (boots.cost + weapon.cost) : 0;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Navbar />
        <div className="w-full min-h-screen bg-base-bg text-base-txtClr pt-20 flex flex-col items-center">
          <div className="flex  w-full gap-10 justify-evenly items-center">
            <BootsForm />
            <WeaponsForm />
            <div className="flex items-center flex-col ">
              <span>Gold: {adjustedGold}</span>
              <span>Speed: {speed}</span>
              <span>Damage: {damage}</span>
              <DetailsForm />
              <span>Health: 0</span>
            </div>
            <PicturesForm />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Home;
