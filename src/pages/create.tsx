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
import { Loader, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import AlertDialog from "@/components/alertDialog";
import { Skeleton } from "@/components/ui/skeleton";

// TODO: Add skeleton and/or suspense

export interface LoadingProps {
  isFetched: boolean;
}

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

  const { update: updateSession } = useSession();

  // const {
  //   data: isLoading,
  //   isFetching,
  //   isPending,
  // } = trpc.shop.getFirstItems.useQuery();

  const { data: heroImages, isFetched } = trpc.shop.getAllItems.useQuery();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const createNewHero = trpc.hero.createFinalHero.useMutation({
    onSuccess: async () => {
      utils.user.getHeroesByUser.invalidate();
      updateSession();
    },
  });

  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   if (isFetched) {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 1000);
  //   }
  // }, [isFetched]);

  // if (!isFetched) {
  //   console.log(isFetched);
  //   return (
  //     <div className="w-[300px] flex flex-col gap-10">
  //       {/* <Skeleton className="w-[300px] h-[300px]" /> */}
  //       <Loader2 className="animate-spin fixed top-52 right-52 " />
  //     </div>
  //   );
  // }

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
        <div className="w-full min-h-screen py-20 flex gap-20 pr-52  justify-evenly">
          <div className="flex gap-10 w-full flex-col">
            <div className="flex w-full items-center justify-evenly pr-32">
              <BootsForm isFetched={isFetched} />
              <WeaponsForm isFetched={isFetched} />
            </div>
            <div className="flex pl-14 justify-evenly items-center w-full">
              <PicturesForm isFetched={isFetched} />
              <DetailsForm isFetched={isFetched} />
            </div>
          </div>
          <div className="fixed right-32 top-52">
            {isFetched && (
              <div>
                <HeroPreview />
                <Button className="w-full rounded-t-none" variant="select">
                  {isSubmitting ? (
                    <span className="flex gap-2 items-center">
                      {" "}
                      Saving <Loader2 className="animate-spin h-5" />{" "}
                    </span>
                  ) : (
                    <span className="flex gap-2 items-center">Submit</span>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default Create;
