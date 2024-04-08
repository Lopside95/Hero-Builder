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
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      pic: "",
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

  // const createNewSimple = trpc.hero.createSimpleHero.useMutation({
  //   onSuccess: async () => {
  //     alert("It worked");
  //   },
  // });

  const trpcUtils = trpc.useUtils();
  const setUpdates = trpc.user.updateUser.useMutation({
    onSuccess: async () => {
      alert("updated");
      await trpcUtils.user.findAll.invalidate();
    },
  });

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    // await createNewDetails.mutateAsync(data);

    await setUpdates.mutateAsync(data);

    // await createNewSimple.mutateAsync(data);

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
            <Input {...form.register("name")} placeholder="name" />
            <Input {...form.register("email")} placeholder="email" />
            <Input {...form.register("password")} placeholder="pass" />
            <Input {...form.register("pic")} placeholder="pic" />
            {/* <Input {...form.register("name")} placeholder="name" />
            <Input {...form.register("boots")} placeholder="boots" />
            <Input {...form.register("weapon")} placeholder="weapon" />
          <Input {...form.register("user")} placeholder="User" /> */}

            <Button>Submit</Button>
          </div>
        </div>
        {/* )} */}
      </form>
      {/* <BootsForm /> */}
    </FormProvider>
  );
};

export default HeroPage;
