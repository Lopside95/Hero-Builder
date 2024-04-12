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

const BootsForm = () => {
  const [api, setApi] = useState<CarouselApi>();

  const { watch, control, getValues, setValue } =
    useFormContext<FinalHeroSchema>();

  const { data: boots, isLoading } = trpc.shop.getAllBoots.useQuery();

  const bootsDictionary = boots
    ? boots.reduce((acc, boot) => {
        acc[boot.name] = {
          id: boot.id,
          name: boot.name,
          speed: boot.speed,
          bonus: boot.bonus,
          description: boot.description || "",
          cost: boot.cost,
          img: boot.img,
        };

        return acc;
      }, {} as Record<string | number, Boots>)
    : {};

  const watchedBoots = watch("boots");

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
                    <CarouselItem key={boot.id} className="pl-5">
                      <Card className="flex flex-col bg-base-bg h-full text-base-txtClr items-center justify-center gap-5 py-5 w-full">
                        <h1>{boot.name}</h1>
                        <p>{`Move speed: ${boot.speed}`}</p>
                        <p>{`Description: ${boot.description}`}</p>
                        <span className="flex gap-3">
                          <Coins className="text-yellow-500" />{" "}
                          <p>{boot.cost}</p>
                        </span>

                        <Image
                          src={boot.img}
                          alt=""
                          height={400}
                          width={400}
                          className="w-60 rounded-md  "
                        />
                        {/* </Suspense> */}
                        <FormControl key={boot.name}>
                          <FormItem>
                            <Button
                              // variant="select"
                              variant={
                                watchedBoots.name === boot.name
                                  ? "disabled"
                                  : "select"
                              }
                              className=""
                              {...field}
                              value={boot.id}
                              onClick={(e) => {
                                // e.preventDefault();
                                field.onChange(boot);
                                setValue("boots", boot);
                                setValue("details.speed", boot.speed);
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
              <CarouselPrevious className="z-30 self-end ml-32 bottom-1.5 bg-transparent hover:text-white text-white  border-none hover:bg-transparent  " />
              <CarouselNext className=" z-30 self-end mr-32  bottom-1.5 border-none hover:bg-transparent hover:text-white bg-transparent text-white  " />
            </Carousel>
          </div>
        </div>
      )}
    />
  );
};

export default BootsForm;
