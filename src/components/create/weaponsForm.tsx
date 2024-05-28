import { useFormContext } from "react-hook-form";
import { FinalHeroSchema, Weapon } from "@/types/hero";
import { useState } from "react";
import { Coins } from "lucide-react";
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
import { Skeleton } from "../ui/skeleton";
import { ShopSkeleton } from "../shopSkeleton";
import { LoadingProps } from "@/pages/create";
export type WeaponProps = {
  name: string;
  damage: number;
  bonus: string;
  description: string;
  url: string;
};
const WeaponsForm = ({ isFetched }: LoadingProps) => {
  const { control, watch, getValues, setValue } =
    useFormContext<FinalHeroSchema>();

  const { data: weapons } = trpc.shop.getAllWeapons.useQuery();
  const [api, setApi] = useState<CarouselApi>();

  const watchedWeapon = watch("weapon");

  return (
    <div>
      {!isFetched ? (
        <div>
          <ShopSkeleton className="w-80 h-80 " />
        </div>
      ) : (
        <FormField
          control={control}
          name="weapon"
          render={({ field }) => (
            <div className=" w-[300px]  flex flex-col gap-10">
              <Carousel
                className="w-96 flex flex-col items-center justify-center"
                opts={{ loop: true }}
                setApi={setApi}
              >
                <CarouselContent className="">
                  {weapons?.map((weapon) => {
                    return (
                      <CarouselItem className="pl-5 " key={weapon.name}>
                        <Card className="flex flex-col text-xl  h-full items-center justify-center gap-5 py-5 w-full">
                          <h3>{weapon.name}</h3>
                          <p>{`Damage: ${weapon.damage}`}</p>
                          <p>{weapon.description}</p>
                          <span className="flex gap-3">
                            <Coins className="text-yellow-500" />{" "}
                            <p>{weapon.cost}</p>
                          </span>
                          <Image
                            alt=""
                            className="w-60 rounded-md  "
                            height={200}
                            priority
                            src={weapon.img}
                            width={200}
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
                                // button condition greys out the button of the currently selected item to make it clear
                                // to users which item they have selected as they click through the carousel
                                {...field}
                                onClick={(event) => {
                                  event?.preventDefault();
                                  field.onChange(weapon);
                                  setValue("weapon", weapon);
                                  setValue("details.damage", weapon.damage);
                                }}
                                value={weapon.id}
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
      )}
    </div>
  );
};

export default WeaponsForm;
