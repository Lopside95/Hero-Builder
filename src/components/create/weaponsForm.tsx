/* eslint-disable @next/next/no-img-element */

// import { HeroInterface } from "@/pages/items"
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Boots, FinalHeroSchema, Weapon } from "@/types/hero";
// import { finalItemsSchema } from "@/types/hero";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Suspense, useEffect, useRef, useState } from "react";

import { Coins } from "lucide-react";
import { bootsSchema } from "@/types/hero";
import { FormControl, FormField, FormItem } from "../ui/form";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
export type WeaponProps = {
  name: string;
  damage: number;
  bonus: string;
  description: string;
  url: string;
};
const WeaponsForm = () => {
  const { control, watch, getValues, setValue } =
    useFormContext<FinalHeroSchema>();

  const { data: weapons, isLoading } = trpc.shop.getAllWeapons.useQuery();
  const [api, setApi] = useState<CarouselApi>();

  const watchedWeapon = watch("weapon");

  return (
    <FormField
      name="weapon"
      control={control}
      render={({ field }) => (
        <div className=" w-[300px]  flex flex-col gap-10">
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            className="w-96 flex flex-col items-center justify-center"
          >
            <CarouselContent className="">
              {weapons?.map((weapon) => {
                return (
                  <CarouselItem key={weapon.name} className="pl-5 ">
                    <Card className="flex flex-col text-xl  h-full items-center justify-center gap-5 py-5 w-full">
                      <h3>{weapon.name}</h3>
                      <p>{`Damage: ${weapon.damage}`}</p>
                      <p>{weapon.description}</p>
                      {/* <p>{`Description: ${weapon.description}`}</p> */}
                      <span className="flex gap-3">
                        <Coins className="text-yellow-500" />{" "}
                        <p>{weapon.cost}</p>
                      </span>
                      {/* <img
                        src={weapon.img}
                        alt=""
                        className="w-60 rounded-md  "
                      /> */}
                      <Image
                        src={weapon.img}
                        alt=""
                        height={200}
                        width={200}
                        className="w-60 rounded-md  "
                      />
                      <FormControl key={weapon.id}>
                        <FormItem>
                          <Button
                            className=""
                            variant={
                              watchedWeapon.name === weapon.name
                                ? "disabled"
                                : "select"
                            }
                            {...field}
                            value={weapon.id}
                            onClick={(event) => {
                              event?.preventDefault();
                              field.onChange(weapon);
                              setValue("weapon", weapon);
                              setValue("details.damage", weapon.damage);
                            }}
                          >
                            Select
                          </Button>
                        </FormItem>
                      </FormControl>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            {/* <CarouselPrevious className="absolute left-[5.5rem] bottom-1.5 bg-transparent hover:text-white text-white  border-none hover:bg-transparent  " />

            <CarouselNext className="absolute  right-[5.5rem] bottom-1.5 border-none hover:bg-transparent hover:text-white bg-transparent text-white  " /> */}
            <CarouselPrevious className="z-30 self-end ml-32 bottom-1.5 bg-transparent hover:text-white text-white  border-none hover:bg-transparent  " />
            <CarouselNext className=" z-30 self-end mr-32  bottom-1.5 border-none hover:bg-transparent hover:text-white bg-transparent text-white  " />
          </Carousel>
        </div>
      )}
    />
  );
};

export default WeaponsForm;
