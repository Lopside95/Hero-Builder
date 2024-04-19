import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { FinalHeroSchema, finalHeroSchema } from "@/types/hero";
import BootsForm from "@/components/create/bootsForm";
import WeaponsForm from "@/components/create/weaponsForm";
import DetailsForm from "@/components/create/detailsForm";
import { useSession } from "next-auth/react";
import PicturesForm from "@/components/create/picsForm";
import HeroPreview from "@/components/create/heroPreview";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import AlertDialog from "@/components/alertDialog";
import Image from "next/image";

// TODO: Add skeleton and/or suspense boundary

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
        story:
          "We all start somewhere but, if you don’t have a story in mind, we’ll just use this placeholder text for now.",
      },

      gold: 90,
    },
  });

  const router = useRouter();
  const utils = trpc.useUtils();

  // const { data: session } = useSession();

  const [boots, weapon, images] = trpc.useQueries((t) => [
    t.shop.getAllBoots(),
    t.shop.getAllWeapons(),
    t.shop.getAllHeroPics(),
  ]);

  const { data: session, update: updateSession } = useSession();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data: isLoading } = trpc.user.getUserById.useQuery();

  const createNewHero = trpc.hero.createFinalHero.useMutation({
    onSuccess: async () => {
      utils.user.getHeroesByUser.invalidate();
      updateSession();
    },
  });

  const [userAlert, setUserAlert] = useState<boolean>(false);

  useEffect(() => {
    if (!session) {
      setUserAlert(true);
    } else {
      setUserAlert(false);
    }
  }, [session]);

  const onSubmit: SubmitHandler<FinalHeroSchema> = async (
    data: FinalHeroSchema
  ) => {
    if (!session) {
      setUserAlert(true);
    } else {
      setIsSubmitting(true);

      await createNewHero.mutateAsync(data);

      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    }
  };

  const bootsImg = boots.data ? boots.data : "";

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full min-h-screen py-20 flex gap-20 pr-52  justify-evenly">
          <div className="flex gap-10 w-full flex-col ">
            <div>
              {userAlert && (
                <AlertDialog
                  isOpen={userAlert && true}
                  message="You need be logged in to create heroes"
                  closeMsg="Got it"
                  closeClick={() => setUserAlert(false)}
                  userAlert={userAlert}
                  session={session}
                />
              )}
            </div>
            <div className="flex w-full items-center justify-evenly pr-32">
              <BootsForm />
              <WeaponsForm />
            </div>
            <div className="flex pl-14 justify-evenly items-center w-full">
              <PicturesForm />
              <DetailsForm />
            </div>
          </div>
          <div className="fixed right-32 top-52">
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
