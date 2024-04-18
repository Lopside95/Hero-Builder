import { useFormContext } from "react-hook-form";
import { FinalHeroSchema } from "@/types/hero";
import { useState } from "react";
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
  const { data: heroImages } = trpc.shop.getAllHeroPics.useQuery();

  const [api, setApi] = useState<CarouselApi>();
  const { control, setValue, watch } = useFormContext<FinalHeroSchema>();

  const image = watch("details.img");

  return (
    <FormField
      name="details.img"
      control={control}
      render={({ field }) => (
        <div className="flex flex-col w-[300px] items-center gap-10">
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            className=" w-96 flex flex-col justify-center"
          >
            <CarouselContent className="">
              {heroImages?.map((hero) => {
                return (
                  <CarouselItem key={hero.id} className="">
                    <Card className="flex flex-col text-xl items-center justify-center gap-5 py-5 w-full relative">
                      <h1>Hero avatar</h1>

                      <Image
                        src={hero.url}
                        alt=""
                        height={400}
                        width={400}
                        className="w-60 rounded-md  "
                      />
                      <FormControl key={hero.id}>
                        <FormItem>
                          <Button
                            variant={image === hero.url ? "disabled" : "select"}
                            {...field}
                            value={hero.url}
                            onClick={(event) => {
                              event?.preventDefault();
                              field.onChange();
                              setValue("details.img", hero.url);
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
            <CarouselNext className=" z-30 self-end mr-32 bottom-1.5 border-none hover:bg-transparent hover:text-white bg-transparent text-white  " />
          </Carousel>
        </div>
      )}
    />
  );
};

export default PicturesForm;
