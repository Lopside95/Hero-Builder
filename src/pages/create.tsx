import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { User, userSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";
import { prisma } from "./api/db";
import {
  Boots,
  FinalHeroSchema,
  finalHeroSchema,
  heroDetails,
} from "@/types/hero";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TRPCError } from "@trpc/server";
import Navbar from "@/components/Navbar";
import BootsForm from "@/components/bootsForm";
import WeaponsForm from "@/components/weaponForm";
import DetailsForm from "@/components/detailsForm";
import { useSession } from "next-auth/react";

const Home = () => {
  const form = useForm<FinalHeroSchema>({
    resolver: zodResolver(finalHeroSchema),
    defaultValues: {
      // make a thing so that every time making new hero it randomises stuff?
      boots: {
        name: "",
        moveSpeed: 0,
        bonus: "",
        description: "",
        cost: 0,
        url: "",
      },
      weapon: {
        name: "",
        damage: 0,
        bonus: "",
        description: "",
        cost: 0,
        url: "",
      },
      speed: 0,
      damage: 0,
      name: "",
      profilePic: "",
      backstory: "",

      gold: 85,
    },
  });

  // const { data: user } = trpc.user.findAll.useQuery();

  const { data: user } = trpc.user.getUserById.useQuery();
  const utils = trpc.useUtils();

  const { update: updateSession } = useSession();

  // const createNewHero = trpc.hero.createFinalhero.useMutation({
  //   onSuccess: async () => {
  //     alert("new hero created");
  //     await trpcUtils.hero.invalidate();
  //   },
  // });

  const createNewHero = trpc.hero.createNewHero.useMutation({
    onSuccess: async () => {
      alert("new hero created");
      // await utils.user.invalidate();
      // updateSession();
    },
  });

  const onSubmit: SubmitHandler<FinalHeroSchema> = async (
    data: FinalHeroSchema
  ) => {
    alert("clicked");
    await createNewHero.mutateAsync(data);

    // await createNewFinalHero.mutateAsync(data);
    // try {
    //   await createNewFinalHero.mutateAsync(data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const gold = form.watch("gold");
  const boots = form.watch("boots");
  const weapon = form.watch("weapon");
  const damage = form.watch("damage");
  const speed = form.watch("speed");
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
          </div>
          <Button type="submit">Submit</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Log
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Home;

// const allBoots = trpc.shop.getAllBoots.useQuery();
// const allWeapons = trpc.shop.getAllWeapons.useQuery();

// const firstBoots = allBoots[0]

// const { data: bootsAndWeapons } = trpc.shop.getAllItems.useQuery();
// // const {bootsData: boots, weaponData: weapon} = trpc.shop.getAllItems.useQuery()

// const bootsArr = bootsAndWeapons ? bootsAndWeapons.boots : [];
// const weaponsArr = bootsAndWeapons ? bootsAndWeapons.weapons : [];
// const firstBoots = bootsArr[0];
// const firstWeapon = weaponsArr[0];

// const form = useForm<FinalHeroSchema>({
//   resolver: zodResolver(finalHeroSchema),
//   defaultValues: {
//     // make a thing so that every time making new hero it randomises stuff?
//     boots: firstBoots,
//     weapon: firstWeapon,
//     details: {
//       totalMS: 0,
//       totalDmg: 0,
//       backstory: "",
//       name: "",
//       profilePic: "",
//     },
//     user: {
//       name: "",
//       email: "",
//       pic: "",
//     },
//     // gold: 90,
//   },
// });

// import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
// import { User, userSchema } from "@/types/user";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { trpc } from "@/utils/trpc";
// import { useEffect, useState } from "react";
// import { prisma } from "./api/db";
// import {
//   Boots,
//   FinalHeroSchema,
//   finalHeroSchema,
//   heroDetails,
// } from "@/types/hero";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { TRPCError } from "@trpc/server";
// import Navbar from "@/components/Navbar";

// const HomePage = () => {
//   // const allBoots = trpc.shop.getAllBoots.useQuery();
//   // const allWeapons = trpc.shop.getAllWeapons.useQuery();

//   // const firstBoots = allBoots[0]

//   const { data: bootsAndWeapons } = trpc.shop.getAllItems.useQuery();
//   // const {bootsData: boots, weaponData: weapon} = trpc.shop.getAllItems.useQuery()

//   const bootsArr = bootsAndWeapons ? bootsAndWeapons.boots : [];
//   const weaponsArr = bootsAndWeapons ? bootsAndWeapons.weapons : [];
//   const firstBoots = bootsArr[0];
//   const firstWeapon = weaponsArr[0];

//   // const form = useForm<FinalHeroSchema>({
//   //   resolver: zodResolver(finalHeroSchema),
//   //   defaultValues: {
//   //     // make a thing so that every time making new hero it randomises stuff?
//   //     boots: firstBoots,
//   //     weapon: firstWeapon,
//   //     details: {
//   //       totalMS: 0,
//   //       totalDmg: 0,
//   //       backstory: "",
//   //       name: "",
//   //       profilePic: "",
//   //     },
//   //     user: {
//   //       name: "",
//   //       email: "",
//   //       pic: "",
//   //     },
//   //     // gold: 90,
//   //   },
//   // });
//   const form = useForm<FinalHeroSchema>({
//     resolver: zodResolver(finalHeroSchema),
//     defaultValues: {
//       // make a thing so that every time making new hero it randomises stuff?
//       boots: {
//         name: "",
//         moveSpeed: 0,
//         bonus: "",
//         description: "",
//         cost: 0,
//         url: "",
//       },
//       weapon: {
//         name: "",
//         damage: 0,
//         bonus: "",
//         description: "",
//         cost: 0,
//         url: "",
//       },
//       details: {
//         totalSpeed: "",
//         totalDamage: "",
//         backstory: "",
//         name: "",
//         profilePic: "",
//       },
//       email: "",
//       // gold: 90,
//     },
//   });

//   console.log(bootsAndWeapons);
//   // const { data: user } = trpc.user.findAll.useQuery();

//   const [currentUser, setCurrentUser] = useState();

//   const createAUser = trpc.user.createUser.useMutation({
//     onSuccess: async () => {
//       alert("made");
//     },
//   });

//   const { data: user } = trpc.user.getUserById.useQuery();

//   const onSubmit: SubmitHandler<FinalHeroSchema> = async (
//     data: FinalHeroSchema
//   ) => {
//     // await createNewFinalHero.mutateAsync(data);
//     // try {
//     //   await createNewFinalHero.mutateAsync(data);
//     // } catch (error) {
//     //   console.error(error);
//     // }
//   };

//   return (
//     <FormProvider {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)}>
//         <div className="bg-gray-500 flex flex-col items-center justify-center align-middle min-h-screen">
//           <Navbar />
//           <div className="w-1/4 ">
//             <Select>
//               <SelectTrigger>
//                 <SelectValue placeholder="select boots" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectLabel>Boots</SelectLabel>
//                   {bootsArr.map((boot) => {
//                     return (
//                       <SelectItem
//                         key={boot.id}
//                         value={boot.name}
//                         {...form.register("boots")}
//                       >
//                         {boot.name}
//                       </SelectItem>
//                     );
//                   })}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//             <Select>
//               <SelectTrigger>
//                 <SelectValue placeholder="select boots" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectLabel>Boots</SelectLabel>
//                   {weaponsArr.map((weapon) => {
//                     return (
//                       <SelectItem
//                         key={weapon.id}
//                         value={weapon.name}
//                         {...form.register("weapon")}
//                       >
//                         {weapon.name}
//                       </SelectItem>
//                     );
//                   })}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//             <div>
//               <Input {...form.register("details.name")} />
//               <Input {...form.register("details.backstory")} />
//               <Input {...form.register("details.profilePic")} />
//               <Input {...form.register("details.totalDamage")} />
//               <Input {...form.register("details.totalSpeed")} />
//             </div>

//             <Input {...form.register("email")} placeholder="email" />

//             <Button variant="default" type="submit">
//               Submit
//             </Button>
//           </div>
//         </div>
//       </form>
//     </FormProvider>
//   );
// };

// export default HomePage;
