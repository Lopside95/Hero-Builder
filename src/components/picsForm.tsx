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

const PicturesForm = () => {
  const { data: images } = trpc.shop.getAllHeroPics.useQuery();

  const [api, setApi] = useState<CarouselApi>();
  const { control, setValue, watch } = useFormContext<FinalHeroSchema>();

  const watchedUrl = watch("profilePic");

  // const picsDictionary = images
  //   ? images.reduce((acc, img) => {
  //       acc[img.id] = {
  //         url: img.url,
  //       };
  //       return acc;
  //     }, {} as Record<string>)
  //   : {};

  // const picsDictionary = heroPics ? heroPics.reduce((acc, pic) => {

  //     acc[pic.id] = {
  //         id: pic.id,
  //         name: pic.name,
  //         url: pic.url,
  //     }

  //     return acc

  // }, {})

  //   const picOne: HeroPictures = picsDictionary ? picsDictionary["Archer"] : {};

  return (
    <FormField
      name="profilePic"
      control={control}
      render={({ field }) => (
        // <div className=" ">
        <div className="flex flex-col items-center gap-10">
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            className=" w-72 flex flex-col justify-center"
          >
            <CarouselContent className="">
              {images?.map((img) => {
                return (
                  <CarouselItem key={img.id} className="">
                    <Card className="flex flex-col items-center justify-center gap-5 bg-transparent w-full relative">
                      <img src={img.url} alt="" className="w-60 rounded-full" />
                      <FormControl key={img.id}>
                        <FormItem>
                          {/* <DialogClose asChild> */}
                          <Button
                            variant={
                              watchedUrl === img.url ? "disabled" : "select"
                            }
                            {...field}
                            value={img.url}
                            onClick={() => {
                              field.onChange();
                              setValue("profilePic", img.url);
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
            <CarouselPrevious className="absolute left-14 -bottom-3 bg-transparent hover:text-base-txtClr text-base-txtClr  border-none hover:bg-transparent  " />
            <CarouselNext className="absolute right-14 -bottom-3 border-none hover:bg-transparent hover:text-base-txtClr text-base-txtClr bg-transparent   " />
          </Carousel>
        </div>
      )}
    />
  );
};

export default PicturesForm;
