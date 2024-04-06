/* eslint-disable @next/next/no-img-element */

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { heroDetails } from "@/types/hero";
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

type HeroDetails = z.infer<typeof heroDetails>;

type Simple = z.infer<typeof simpleHeroSchema>;

const HeroPage = () => {
  // const form = useForm<HeroDetails>({
  //   resolver: zodResolver(heroDetails),
  //   defaultValues: {
  //     name: "",
  //     totalDmg: "",
  //     totalMS: "",
  //     profilePic: "",
  //   },
  // });
  const form = useForm<Simple>({
    resolver: zodResolver(simpleHeroSchema),
    defaultValues: {
      name: "",
      boots: "",
      weapon: "",
    },
  });

  // const { data: firstHero, isLoading } = trpc.hero.getHeroDetails.useQuery();

  // const createNewDetails = trpc.hero.createNewHero.useMutation;

  // const createNewDetails = trpc.hero.newHeroDetails.useMutation({
  //   onSuccess: async () => {
  //     alert("done");
  //     await trpcUtils.hero.invalidate();
  //   },
  // });

  // const { data: heroes, isLoading, isError } = trpc.getAllHeroes.useQuery();

  //all the routers go through 'api'

  const createNewSimple = trpc.hero.createSimpleHero.useMutation({
    onSuccess: async () => {
      alert("It worked");
    },
  });

  const onSubmit: SubmitHandler<Simple> = async (data: Simple) => {
    // await createNewDetails.mutateAsync(data);

    await createNewSimple.mutateAsync(data);

    console.log("data", data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Navbar />
        {/* {isLoading ? (
          <div>Loading...</div>
        ) : ( */}
        <div className="bg-base-bg flex flex-col items-center py-20 w-full min-h-screen">
          <div className="w-1/3 ">
            {/* <p className="text-white">{firstHero?.name}</p>
            <img src={firstHero?.profilePic} alt="" className="w-80" /> */}
            <Input {...form.register("name")} placeholder="name" />
            <Input {...form.register("boots")} placeholder="boots" />
            <Input {...form.register("weapon")} placeholder="weapon" />
            <Input {...form.register("user")} placeholder="User" />
            {/* <Input {...form.register("profilePic")} /> */}
            {/* <Input {...form.register("bootsImg")} placeholder="bootsIMg" />
            <Input {...form.register("weaponImg")} placeholder="wpnImg" /> */}
            <Button>Submit</Button>
          </div>
        </div>
        {/* )} */}
      </form>
    </FormProvider>
  );
};

export default HeroPage;
