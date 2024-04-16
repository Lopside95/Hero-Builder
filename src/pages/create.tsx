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
import WeaponsForm from "@/components/create/weaponsForm";
import DetailsForm from "@/components/create/detailsForm";
import { useSession } from "next-auth/react";
import PicturesForm from "@/components/create/picsForm";
import HeroPreview from "@/components/create/heroPreview";
import { useRouter } from "next/router";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent } from "@/components/ui/popover";
import Link from "next/link";

const Create = () => {
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

      gold: 90,
    },
  });

  const router = useRouter();
  const { data: user, isLoading } = trpc.user.getUserById.useQuery();
  const utils = trpc.useUtils();

  const { update: updateSession } = useSession();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const createNewHero = trpc.hero.createFinalHero.useMutation({
    onSuccess: async () => {
      updateSession();
    },
  });

  const onSubmit: SubmitHandler<FinalHeroSchema> = async (
    data: FinalHeroSchema
  ) => {
    setIsSubmitting(true);

    await createNewHero.mutateAsync(data);

    setTimeout(() => {
      router.push("/profile");
    }, 1000);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* <Navbar /> */}

        <div className="w-full min-h-screen py-20 flex gap-20 pr-52  justify-evenly">
          <div className="flex gap-10 w-full flex-col ">
            {!user && (
              <h1 className="self-center text-2xl pl-32 ">
                You need to{" "}
                <Link className="text-blue-400" href="/">
                  log in
                </Link>{" "}
                or{" "}
                <Link className="text-blue-400" href="signup">
                  sign up
                </Link>{" "}
                before you can create heroes
              </h1>
            )}
            <div className="flex w-full items-center justify-evenly ">
              <BootsForm />
              <WeaponsForm />
            </div>
            <div className="flex justify-evenly items-center w-full">
              <PicturesForm />
              <DetailsForm />
            </div>
          </div>
          <div className="fixed right-32  top-52">
            <HeroPreview />
            {isSubmitting ? (
              <Button className="w-full rounded-t-none" variant="select">
                <span className="flex gap-2 items-center">
                  Saving <Loader2 className="animate-spin h-5" />
                </span>
              </Button>
            ) : (
              <Button className="w-full rounded-t-none" variant="select">
                Submit
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default Create;

{
  /* <div className="w-full min-h-screen py-10 flex justify-center relative items-center">
          <Tabs defaultValue="items" className="w-full">
            <div className="flex flex-col w-3/4 items-center border border-red relative">
              <TabsList className="w-48">
                <TabsTrigger value="items">Items</TabsTrigger>
                <TabsTrigger value="details">Hero Details</TabsTrigger>
              </TabsList>
              <TabsContent
                value="items"
                className="flex w-2/3 gap-10  h-full justify-evenly"
              >
                <BootsForm />
                <WeaponsForm />
              </TabsContent>
              <TabsContent
                value="details"
                className="flex w-2/3     items-center"
              >
                <PicturesForm />
                <DetailsForm />
              </TabsContent>
            </div>
          </Tabs>
          <div className="absolute right-20">
            <HeroPreview />
            <Button type="submit" className="">
              Submit
            </Button>
          </div>
        </div> */
}

{
  /* <div className="flex  w-full gap-10 justify-evenly items-center">
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
          </div> */
}
