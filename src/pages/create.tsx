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
import { useState } from "react";
import { defaultVals } from "@/utils/helpers";

export interface LoadingProps {
  isFetched: boolean;
}

const Create = () => {
  const form = useForm<FinalHeroSchema>({
    resolver: zodResolver(finalHeroSchema),
    defaultValues: defaultVals,
  });

  const router = useRouter();
  const utils = trpc.useUtils();

  const { update: updateSession } = useSession();

  const { isFetched } = trpc.shop.getAllItems.useQuery();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const createNewHero = trpc.hero.createFinalHero.useMutation({
    onSuccess: async () => {
      utils.user.getHeroesByUser.invalidate();
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
        <div className="w-full min-h-screen py-20 flex gap-20 pr-52  justify-evenly">
          <div className="flex gap-10 w-full flex-col">
            <div className="flex w-full items-center justify-evenly pr-32">
              <BootsForm isFetched={isFetched} />
              {/* Maybe not great, but 'isFetched' ensures that all the images have loaded in and the page is laid out properly
              before the actual content is rendered. Prevents the page loading in chunks/disrupting the layout.
              */}
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

                <Button className="w-full rounded-t-none">
                  {Boolean(isSubmitting) && (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin sm:h-4 sm:w-4  " />
                  )}
                  {Boolean(isSubmitting) ? "Saving hero" : "Submit"}
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
