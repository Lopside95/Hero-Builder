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

const PicturesForm = () => {
  // const { data: images } = trpc.shop.getAllHeroPics.useQuery();
  const { data: boots, isLoading } = trpc.shop.getAllBoots.useQuery();

  const [api, setApi] = useState<CarouselApi>();
  const { control, setValue, watch } = useFormContext<FinalHeroSchema>();

  const image = watch("details.img");

  return (
    <FormField
      name="details.img"
      control={control}
      render={({ field }) => (
        // <div className=" ">
        <div className="flex flex-col w-full items-center gap-10">
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            className=" w-72 flex flex-col justify-center"
          >
            <CarouselContent className="">
              {boots?.map((img) => {
                return (
                  <CarouselItem key={img.id} className="">
                    <Card className="flex flex-col items-center justify-center gap-5 py-5 w-full relative">
                      {/* <img src={img.url} alt="" className="w-60 rounded-md" /> */}
                      <img src={img.img} alt="" className="w-60 rounded-md  " />
                      {/* <Image
                        src={img.url}
                        alt=""
                        height={400}
                        width={400}
                        className="w-60 rounded-md  "
                      /> */}
                      <FormControl key={img.id}>
                        <FormItem>
                          {/* <DialogClose asChild> */}
                          <Button
                            variant={image === img.img ? "disabled" : "select"}
                            {...field}
                            value={img.img}
                            onClick={(event) => {
                              event?.preventDefault();
                              field.onChange();
                              setValue("details.img", img.img);
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
            <CarouselPrevious className="z-30 self-end ml-20 bottom-1.5 bg-transparent hover:text-white text-white  border-none hover:bg-transparent  " />
            <CarouselNext className=" z-30 self-end mr-20 bottom-1.5 border-none hover:bg-transparent hover:text-white bg-transparent text-white  " />

            {/* <CarouselPrevious className="absolute left-14 -bottom-3 bg-transparent hover:text-base-txtClr text-base-txtClr  border-none hover:bg-transparent  " />
            <CarouselNext className="absolute right-14 -bottom-3 border-none hover:bg-transparent hover:text-base-txtClr text-base-txtClr bg-transparent   " /> */}
          </Carousel>
        </div>
      )}
    />
  );
};

export default PicturesForm;
