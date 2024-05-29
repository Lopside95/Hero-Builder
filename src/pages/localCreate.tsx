"use client";

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
import { LocalHero } from "@prisma/client";
import { HeroInterface } from "@/components/user/profile/gallery";

// TODO: Add skeleton and/or suspense

const CreateLocal = () => {
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

  const { data: session, update: updateSession } = useSession();

  const { data: heroImages, isFetched } = trpc.shop.getAllItems.useQuery();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [localHeroes, setLocalHeroes] = useState<HeroInterface[]>(() => {
    if (typeof window !== "undefined") {
      const sessionHeroes = localStorage.getItem("heroes");
      return sessionHeroes ? JSON.parse(sessionHeroes) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("heroes", JSON.stringify(localHeroes));
    }
    // if (sessionHeroes) {
    //   setLocalHeroes(JSON.parse(sessionHeroes));
    // }
  }, [localHeroes]);

  useEffect(() => {
    localStorage.setItem("heroes", JSON.stringify(localHeroes));

    // console.log(localHeroes.length);
  }, [localHeroes]);

  const onSubmit: SubmitHandler<FinalHeroSchema> = async (
    data: FinalHeroSchema
  ) => {
    setIsSubmitting(true);

    const newHero: FinalHeroSchema = {
      boots: data.boots,
      weapon: data.weapon,
      details: data.details,
      gold: data.gold,
    };

    setLocalHeroes((prevHeroes) => [...prevHeroes, newHero]);

    setIsSubmitting(false);

    // setTimeout(() => {
    //   router.push("/profile");
    // }, 1000);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full min-h-screen py-20 flex gap-20 pr-52  justify-evenly">
          <div className="flex gap-10 w-full flex-col ">
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

export default CreateLocal;
// import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { trpc } from "@/utils/trpc";
// import { FinalHeroSchema, finalHeroSchema } from "@/types/hero";
// import BootsForm from "@/components/create/bootsForm";
// import WeaponsForm from "@/components/create/weaponsForm";
// import DetailsForm from "@/components/create/detailsForm";
// import { useSession } from "next-auth/react";
// import PicturesForm from "@/components/create/picsForm";
// import HeroPreview from "@/components/create/heroPreview";
// import { useRouter } from "next/router";
// import { Loader2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import AlertDialog from "@/components/alertDialog";

// // TODO: Add skeleton and/or suspense

// const Create = () => {
//   const form = useForm<FinalHeroSchema>({
//     resolver: zodResolver(finalHeroSchema),
//     defaultValues: {
//       boots: {
//         name: "",
//         speed: 0,
//         bonus: "",
//         description: "",
//         cost: 0,
//         img: "",
//       },
//       weapon: {
//         name: "",
//         damage: 0,
//         bonus: "",
//         description: "",
//         cost: 0,
//         img: "",
//       },
//       details: {
//         speed: 0,
//         damage: 0,
//         name: "",
//         img: "",
//         story:
//           "We all start somewhere but, if you don’t have a story in mind, we’ll just use this placeholder text for now.",
//       },

//       gold: 90,
//     },
//   });

//   const router = useRouter();
//   const utils = trpc.useUtils();

//   const { data: session, update: updateSession } = useSession();

//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   const { data: isLoading, isSuccess } = trpc.user.getUserById.useQuery();

//   const createNewHero = trpc.hero.createFinalHero.useMutation({
//     onSuccess: async () => {
//       utils.user.getHeroesByUser.invalidate();
//       updateSession();
//     },
//   });

//   const [userAlert, setUserAlert] = useState<boolean>(false);

//   useEffect(() => {
//     if (!isLoading && !session) {
//       setUserAlert(true);
//     } else {
//       setUserAlert(false);
//     }
//   }, [isLoading, session]);
//   // useEffect not a long-term solution but conditionally makes sure that, on load, users know they have to be logged in to save heroes
//   // additionally, it resets the the condition so that the alert also shows when users try to save the hero when they aren't logged

//   const onSubmit: SubmitHandler<FinalHeroSchema> = async (
//     data: FinalHeroSchema
//   ) => {
//     if (!session) {
//       setUserAlert(true);
//     } else {
//       setIsSubmitting(true);

//       await createNewHero.mutateAsync(data);

//       setTimeout(() => {
//         router.push("/profile");
//       }, 1000);
//     }
//   };

//   return (
//     <FormProvider {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)}>
//         <div className="w-full min-h-screen py-20 flex gap-20 pr-52  justify-evenly">
//           <div className="flex gap-10 w-full flex-col ">
//             <div>
//               {userAlert && (
//                 <AlertDialog
//                   closeClick={() => setUserAlert(false)}
//                   closeMsg="Got it"
//                   isOpen={userAlert && true}
//                   message="You need be logged in to create heroes"
//                 />
//               )}
//             </div>
//             <div className="flex w-full items-center justify-evenly pr-32">
//               <BootsForm />
//               <WeaponsForm />
//             </div>
//             <div className="flex pl-14 justify-evenly items-center w-full">
//               <PicturesForm />
//               <DetailsForm />
//             </div>
//           </div>
//           <div className="fixed right-32 top-52">
//             <HeroPreview />
//             <Button className="w-full rounded-t-none" variant="select">
//               {isSubmitting ? (
//                 <span className="flex gap-2 items-center">
//                   {" "}
//                   Saving <Loader2 className="animate-spin h-5" />{" "}
//                 </span>
//               ) : (
//                 <span className="flex gap-2 items-center">Submit</span>
//               )}
//             </Button>
//           </div>
//         </div>
//       </form>
//     </FormProvider>
//   );
// };

// export default Create;
