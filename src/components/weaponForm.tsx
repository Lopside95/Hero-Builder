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
import { FormControl, FormField, FormItem } from "./ui/form";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
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
          name: weapon.name,
          damage: weapon.damage,
          bonus: weapon.bonus,
          description: weapon.description,
          cost: weapon.cost,
          url: weapon.url,
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
                  <CarouselItem key={weapon.id} className="pl-5">
                    <Card className="flex h-full flex-col items-center justify-center gap-5 py-5 w-full relative">
                      <h3>{weapon.name}</h3>
                      <p>{`Damage: ${weapon.damage}`}</p>
                      <p>{`Description: ${weapon.description}`}</p>
                      {/* <p>{`Bonus: ${weapon.bonus}`}</p> */}
                      <p>{`Cost: ${weapon.cost}`}</p>
                      <img
                        src={weapon.url}
                        alt=""
                        className="w-60 rounded-md"
                      />
                      <FormControl key={weapon.id}>
                        <FormItem>
                          <Button
                            // variant="select"
                            className=""
                            // variant="select"
                            variant={
                              watchedWeapon.name === weapon.name
                                ? "disabled"
                                : "select"
                            }
                            // // className="bg-base-txtClr text-base-bg hover:text-base-bg"
                            // {...field}
                            // value={weapon.id}
                            // onClick={() => {
                            //   field.onChange(weapon);
                            //   setValue("details.totalDmg", weapon.damage);
                            //   setSelectedWeapon(weapon.id);
                            // }}
                            {...field}
                            value={weapon.name}
                            onClick={(e) => {
                              e.preventDefault();
                              field.onChange(weapon);
                              setValue("weapon", weapon);
                              setValue("details.totalDamage", weapon.damage);
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
            <CarouselPrevious className="absolute left-[5.5rem] bottom-1.5 bg-transparent hover:text-white text-white  border-none hover:bg-transparent  " />

            <CarouselNext className="absolute  right-[5.5rem] bottom-1.5 border-none hover:bg-transparent hover:text-white bg-transparent text-white  " />
            {/* <CarouselPrevious className="absolute ml-14 bg-transparent hover:text-white text-white h-12 w-12 border-none hover:bg-transparent  " />
  
              <CarouselNext className="absolute mr-14 border-none hover:bg-transparent hover:text-white bg-transparent text-white  " /> */}
          </Carousel>
        </div>
      )}
    />
  );
};

export default WeaponsForm;
