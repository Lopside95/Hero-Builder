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
import { ShopSkeleton } from "../shopSkeleton";
import { LoadingProps } from "@/pages/create";

const PicturesForm = ({ isFetched }: LoadingProps) => {
  const { data: heroImages } = trpc.shop.getAllHeroPics.useQuery();

  const [api, setApi] = useState<CarouselApi>();
  const { control, setValue, watch } = useFormContext<FinalHeroSchema>();

  const image = watch("details.img");

  return (
    <div>
      {!isFetched ? (
        <ShopSkeleton className="w-80 h-80 " />
      ) : (
        <FormField
          control={control}
          name="details.img"
          render={({ field }) => (
            <div className="flex flex-col w-[300px] items-center gap-10">
              <Carousel
                className=" w-96 flex flex-col justify-center"
                opts={{ loop: true }}
                setApi={setApi}
              >
                <CarouselContent className="">
                  {heroImages?.map((hero) => {
                    return (
                      <CarouselItem className="" key={hero.id}>
                        <Card className="flex flex-col text-xl items-center justify-center gap-5 py-5 w-full relative">
                          <h1>Hero avatar</h1>

                          <Image
                            alt=""
                            className="w-60 rounded-md  "
                            height={400}
                            priority
                            src={hero.url}
                            width={400}
                          />
                          <FormControl key={hero.id}>
                            <FormItem>
                              <Button
                                variant={
                                  image === hero.url ? "disabled" : "default"
                                }
                                {...field}
                                onClick={(event) => {
                                  event?.preventDefault();
                                  field.onChange();
                                  setValue("details.img", hero.url);
                                }}
                                value={hero.url}
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
      )}
    </div>
  );
};

export default PicturesForm;
