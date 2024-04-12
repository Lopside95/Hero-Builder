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

  const [selectedWeapon, setSelectedWeapon] = useState<string | undefined>();

  const { data: weapons, isLoading } = trpc.shop.getAllWeapons.useQuery();
  const [api, setApi] = useState<CarouselApi>();
  const weaponsDictionary = weapons
    ? weapons.reduce((acc, weapon) => {
        acc[weapon.name] = {
          id: weapon.id,
          name: weapon.name,
          damage: weapon.damage,
          bonus: weapon.bonus,
          description: weapon.description,
          cost: weapon.cost,
          img: weapon.img,
        };

        return acc;
      }, {} as Record<string | number, Weapon>)
    : {};

  const watchedWeapon = watch("weapon");
  const wVal = getValues();

  return (
    <FormField
      name="weapon"
      control={control}
      render={({ field }) => (
        <div className="  flex flex-col gap-10">
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            className="w-96 flex flex-col items-center justify-center"
          >
            <CarouselContent className="">
              {weapons?.map((weapon) => {
                return (
                  <CarouselItem key={weapon.name} className="pl-5 ">
                    <Card className="flex h-full flex-col  items-center justify-center gap-5 py-5 w-full">
                      <h3>{weapon.name}</h3>
                      <p>{`Damage: ${weapon.damage}`}</p>
                      <p>{`Description: ${weapon.description}`}</p>
                      <p>{`Cost: ${weapon.cost}`}</p>
                      <img
                        src={weapon.img}
                        alt=""
                        className="w-60 rounded-md"
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
                            onClick={(e) => {
                              e.preventDefault();
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
