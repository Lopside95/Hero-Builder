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

  const watchedBoots = watch("boots");

  return (
    <FormField
      name="boots"
      control={control}
      render={({ field }) => (
        <div className="w-1/3 flex flex-col pl-10 gap-10">
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            className=" w-96 flex flex-col items-center justify-center"
          >
            <CarouselContent className="">
              {boots?.map((boot) => {
                return (
                  <CarouselItem key={boot.id} className="pl-5 ">
                    <Card className="flex flex-col text-xl items-center justify-center gap-5 py-5 w-full">
                      <h1>{boot.name}</h1>
                      <p>{`Move speed: ${boot.speed}`}</p>
                      {/* <p>{`Description: ${boot.description}`}</p> */}
                      <p>{boot.description}</p>
                      <span className="flex gap-3">
                        <Coins className="text-yellow-500" /> <p>{boot.cost}</p>
                      </span>

                      {/* <img
                        src={boot.img}
                        alt=""
                        className="w-60 rounded-md  "
                      /> */}
                      <Image
                        src={boot.img}
                        alt=""
                        height={200}
                        width={200}
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
                            onClick={(event) => {
                              event?.preventDefault();
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
      )}
    />
  );
};

export default BootsForm;
