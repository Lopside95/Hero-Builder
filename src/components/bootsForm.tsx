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

const BootsForm = () => {
  const [api, setApi] = useState<CarouselApi>();

  // const { chosenBoots, setChosenBoots, gold, setGold } = useHeroContext();

  const { watch, control, getValues, setValue } =
    useFormContext<FinalHeroSchema>();

  const { data: boots, isLoading } = trpc.shop.getAllBoots.useQuery();

  // const { isLoading, setIsLoading } = useFinalHero();

  console.log("boots", boots);

  const bootsDictionary = boots
    ? boots.reduce((acc, boot) => {
        acc[boot.name] = {
          // id: boot.id,
          name: boot.name,
          moveSpeed: boot.moveSpeed,
          bonus: boot.bonus,
          description: boot.description || "",
          cost: boot.cost,
          url: boot.url,
        };

        return acc;
      }, {} as Record<string | number, Boots>)
    : {};

  const watchedBootsName = watch("boots.name");

  console.log("watchedBootsName", watchedBootsName);

  // console.log("watchedBoots", watchedBoots);

  return (
    <FormField
      name="boots"
      control={control}
      render={({ field }) => (
        <div className=" ">
          <div className="flex flex-col gap-10">
            <Carousel
              setApi={setApi}
              opts={{ loop: true }}
              className=" w-96 flex flex-col items-center justify-center"
            >
              <CarouselContent className="">
                {boots?.map((boot) => {
                  return (
                    <CarouselItem key={boot.name} className="pl-5">
                      <Card className="flex flex-col bg-base-bg h-full items-center justify-center gap-5 py-5 w-full relative">
                        {/* <h3
                          className={`${
                            watchedBoots.name === boot.name
                              ? "underline underline-offset-4"
                              : ""
                          }`}
                        >
                          {boot.name}
                        </h3> */}
                        <h1>{boot.name}</h1>
                        <p>{`Move speed: ${boot.moveSpeed}`}</p>
                        <p>{`Description: ${boot.description}`}</p>
                        {/* <p className="w-2/3">{`Bonus: ${boot.bonus}`}</p> */}
                        <span className="flex gap-3">
                          <Coins className="text-yellow-500" />{" "}
                          <p>{boot.cost}</p>
                        </span>
                        {/* <p>{` ${boot.cost} `}</p> */}
                        {/* <Suspense fallback={<p>Loading...</p>}> */}
                        <img
                          src={boot.url}
                          alt=""
                          className="w-60 rounded-md  "
                        />
                        {/* </Suspense> */}
                        <FormControl key={boot.name}>
                          <FormItem>
                            <Button
                              // className="hover:text-base-bg  hover:bg-base-txtClr"
                              //   variant={
                              //     watchedBoots.name === boot.name
                              //       ? "disabled"
                              //       : "select"
                              //   }
                              onClick={() =>
                                setValue("boots.name", watchedBootsName)
                              }
                              {...field}
                              value={boot.name}
                              // onClick={() => {
                              //   field.onChange(boot);
                              //   setValue("details.totalMS", boot.moveSpeed);
                              // }}
                            >
                              Select
                            </Button>
                          </FormItem>
                        </FormControl>
                        <CarouselPrevious className="absolute left-[5.5rem] bottom-1.5 bg-transparent hover:text-white text-white  border-none hover:bg-transparent  " />
                        <CarouselNext className="absolute  right-[5.5rem] bottom-1.5 border-none hover:bg-transparent hover:text-white bg-transparent text-white  " />
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      )}
    />
  );
};

export default BootsForm;
