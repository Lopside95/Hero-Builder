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

const HomePage = () => {
  // const allBoots = trpc.shop.getAllBoots.useQuery();
  // const allWeapons = trpc.shop.getAllWeapons.useQuery();

  // const firstBoots = allBoots[0]

  const { data: bootsAndWeapons } = trpc.shop.getAllItems.useQuery();
  // const {bootsData: boots, weaponData: weapon} = trpc.shop.getAllItems.useQuery()

  const bootsArr = bootsAndWeapons ? bootsAndWeapons.boots : [];
  const weaponsArr = bootsAndWeapons ? bootsAndWeapons.weapons : [];
  const firstBoots = bootsArr[0];
  const firstWeapon = weaponsArr[0];

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
      details: {
        totalMS: "",
        totalDmg: "",
        backstory: "",
        name: "",
        profilePic: "",
      },
      email: "",
      // gold: 90,
    },
  });

  console.log(bootsAndWeapons);
  // const { data: user } = trpc.user.findAll.useQuery();

  const [currentUser, setCurrentUser] = useState();

  const createAUser = trpc.user.createUser.useMutation({
    onSuccess: async () => {
      alert("made");
    },
  });

  const { data: user } = trpc.user.getUserById.useQuery();
  // const { data: currentUser } = trpc.user.getUserById.useQuery();

  const handleFind = async () => {
    if (user) {
      setCurrentUser(user);
    }
  };

  console.log("currentUser", currentUser);

  // const createNewFinalHero = trpc.hero.createFinalHero.useMutation({
  //   onSuccess: async () => {
  //     alert("Hero created!");
  //   },
  // });

  // const makeNew = trpc.createUser.useMutation({
  //   onSuccess: async () => {
  //     alert("wogoohohoho");
  //   },
  // });

  const onSubmit: SubmitHandler<FinalHeroSchema> = async (
    data: FinalHeroSchema
  ) => {
    // await createNewFinalHero.mutateAsync(data);
    // try {
    //   await createNewFinalHero.mutateAsync(data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="bg-gray-500 flex flex-col items-center justify-center align-middle min-h-screen">
          <Navbar />
          <div className="w-1/4 ">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="select boots" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Boots</SelectLabel>
                  {bootsArr.map((boot) => {
                    return (
                      <SelectItem
                        key={boot.id}
                        value={boot.name}
                        {...form.register("boots")}
                      >
                        {boot.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="select boots" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Boots</SelectLabel>
                  {weaponsArr.map((weapon) => {
                    return (
                      <SelectItem
                        key={weapon.id}
                        value={weapon.name}
                        {...form.register("weapon")}
                      >
                        {weapon.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div>
              <Input {...form.register("details.name")} />
              <Input {...form.register("details.backstory")} />
              <Input {...form.register("details.profilePic")} />
              <Input {...form.register("details.totalDmg")} />
              <Input {...form.register("details.totalMS")} />
            </div>
            {/* <Input {...form.register("boots")} />
            <Input {...form.register("weapon")} /> */}
            <Input {...form.register("email")} placeholder="email" />
            {/* <Input {...form.register("user.name")} placeholder="name" `/>
            <Input {...form.register("user.pic")} placeholder="pic" />` */}
            <Button variant="default" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
      <div>
        <Button onClick={handleFind}>Find</Button>
      </div>
    </FormProvider>
  );
};

export default HomePage;
