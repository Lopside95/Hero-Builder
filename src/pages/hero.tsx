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

type HeroDetails = z.infer<typeof heroDetails>;
const HeroPage = () => {
  const form = useForm<HeroDetails>({
    resolver: zodResolver(heroDetails),
    defaultValues: {
      name: "",
      totalDmg: "",
      totalMS: "",
      profilePic: "",
    },
  });

  const trpcUtils = trpc.useUtils;

  const { data: firstHero, isLoading } = trpc.hero.getHeroDetails.useQuery();

  const createNewDetails = trpc.hero.newHeroDetails.useMutation({
    onSuccess: async () => {
      alert("done");
    },
  });

  // const { data: heroes, isLoading, isError } = trpc.getAllHeroes.useQuery();

  //all the routers go through 'api'

  const onSubmit: SubmitHandler<HeroDetails> = async (data: HeroDetails) => {
    await createNewDetails.mutateAsync(data);

    console.log("data", data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="bg-black w-full min-h-screen">
            <p className="text-white">{firstHero?.name}</p>
            <img src={firstHero?.profilePic} alt="" className="w-80" />
            <Input {...form.register("name")} placeholder="name" />
            <Input {...form.register("totalDmg")} placeholder="dmg" />
            <Input {...form.register("totalMS")} placeholder="speed" />
            <Input {...form.register("profilePic")} />
            {/* <Input {...form.register("bootsImg")} placeholder="bootsIMg" />
            <Input {...form.register("weaponImg")} placeholder="wpnImg" /> */}
            <Button>Submit</Button>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default HeroPage;

// export async function getStaticProps() {
//     try {
//       const client = await clientPromise;
//       const db = client.db("hero_fighter");

//       const boots = await db
//         .collection("boots")
//         .find({})
//         .sort({ id: 1 })
//         .toArray();

//       const weapons = await db
//         .collection("weapons")
//         .find({})
//         .sort({ id: 1 })
//         .toArray();

//       const heroPics = await db
//         .collection("heroPics")
//         .find({})
//         .sort({ id: 1 })
//         .toArray();

//       return {
//         props: {
//           boots: JSON.parse(JSON.stringify(boots)),
//           weapons: JSON.parse(JSON.stringify(weapons)),
//           heroPics: JSON.parse(JSON.stringify(heroPics)),
//         },
//       };
//     } catch (e) {
//       console.error(e);
//     }
//   }
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { heroDetails } from "@/types/hero";
// import { trpc } from "@/utils/trpc";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   FormProvider,
//   SubmitErrorHandler,
//   SubmitHandler,
//   useForm,
// } from "react-hook-form";
// import { z } from "zod";

// type HeroDetails = z.infer<typeof heroDetails>
// const HeroPage = () => {
//   const form = useForm<HeroDetails>({
//     resolver: zodResolver(heroDetails),
//     defaultValues: {
//       name: "",
//       totalDmg: 0,
//       totalMS: 0,
//       profilePic: "",
//     },
//   });

//   const

//   // const { data: heroes, isLoading, isError } = trpc.getAllHeroes.useQuery();

//   //all the routers go through 'api'

//   const onSubmit: SubmitHandler<HeroDetails> = (data: HeroDetails) => {
//     console.log(data);

//   };

//   return (
//     <FormProvider {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)}>
//         {isLoading ? (
//           <div>Loading...</div>
//         ) : (
//           <div className="bg-black w-full min-h-screen">
//             <p className="text-white">

//             </p>
//             <Input {...form.register("name")} placeholder="name" />
//             <Input {...form.register("totalDmg")} placeholder="dmg" />
//             <Input {...form.register("totalMS")} placeholder="speed" />
//             <Input {...form.register("profilePic")} />
//             {/* <Input {...form.register("bootsImg")} placeholder="bootsIMg" />
//             <Input {...form.register("weaponImg")} placeholder="wpnImg" /> */}
//             <Button>Submit</Button>
//           </div>
//         )}
//       </form>
//     </FormProvider>
//   );
// };

// export default HeroPage;

// // export async function getStaticProps() {
// //     try {
// //       const client = await clientPromise;
// //       const db = client.db("hero_fighter");

// //       const boots = await db
// //         .collection("boots")
// //         .find({})
// //         .sort({ id: 1 })
// //         .toArray();

// //       const weapons = await db
// //         .collection("weapons")
// //         .find({})
// //         .sort({ id: 1 })
// //         .toArray();

// //       const heroPics = await db
// //         .collection("heroPics")
// //         .find({})
// //         .sort({ id: 1 })
// //         .toArray();

// //       return {
// //         props: {
// //           boots: JSON.parse(JSON.stringify(boots)),
// //           weapons: JSON.parse(JSON.stringify(weapons)),
// //           heroPics: JSON.parse(JSON.stringify(heroPics)),
// //         },
// //       };
// //     } catch (e) {
// //       console.error(e);
// //     }
// //   }
