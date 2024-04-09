/* eslint-disable @next/next/no-img-element */

import { FinalHeroSchema } from "@/types/hero";
import { Coins } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CarouselApi } from "./ui/carousel";
import { useRouter } from "next/router";
// { bootsData, weaponData, gold }: FinalItemsData

const PreviewForm = () => {
  const {
    control,
    getValues,
    setValue,
    watch,
    handleSubmit,
    getFieldState,
    formState,
    trigger,
  } = useFormContext<FinalHeroSchema>();

  const [api, setApi] = useState<CarouselApi>();

  const router = useRouter();

  const watched = watch();
  const watchedBoots = watch("boots");
  const watchedWeapon = watch("weapon");
  const watchedDetails = watch("details");
  const watchedUrl = watch("details.url");
  const watchedName = watch("details.name");

  const watchedGold = watch("gold");
  const watchedTotalMS = watch("details.totalMS");
  const watchedTotalDmg = watch("details.totalDmg");

  const currentDmg = getValues("details.totalDmg");
  const currentMS = getValues("details.totalMS");
  const currentGold = getValues("gold");
  // const watchedItems = [watchedBoots, watchedWeapon, watchedPic, watchedName]
  const handleDamageDown = (stat: string) => {
    if (watchedTotalDmg > 0) {
      setValue("details.totalDmg", currentDmg - 1);
      setValue("gold", currentGold + 1);
    }
  };
  const handleSpeedDown = (stat: string) => {
    if (watchedTotalMS > 0) {
      setValue("details.totalMS", currentMS - 1);
      setValue("gold", currentGold + 1);
    }
  };

  const handleUp = (stat: string) => {
    if (watchedGold >= 1) {
      if (stat === "damage") {
        setValue("details.totalDmg", currentDmg + 1);
      } else {
        setValue("details.totalMS", currentMS + 1);
      }
      setValue("gold", currentGold - 1);
    }
  };

  useEffect(() => {
    setValue("gold", 90 - (watch("boots.cost") + watch("weapon.cost")));
    //eslint-disable-next-line
  }, [watchedBoots, watchedWeapon]);

  const formIsValid = () => {
    if (
      watchedBoots.name.length >= 1 &&
      watchedDetails.name.length >= 1 &&
      watchedDetails.name.length >= 1 &&
      watchedDetails.url.url.length >= 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit: SubmitHandler<FinalHeroSchema> = (data: FinalHeroSchema) => {
    const heroId = nanoid();

    const heroWithId = {
      ...data,
      details: {
        ...data.details,
        id: heroId,
      },
    };

    setFinalHero(heroWithId);

    setSavedHeroes((currentHeroes) => [...currentHeroes, heroWithId]);

    router.push("/gallery");
  };

  return (
    <div className="w-1/2 bg-base-bg text-base-txtClr flex flex-col  gap-4">
      <Card className="flex flex-col items-center justify-center gap-5">
        <CardHeader>
          <CardTitle className="self-center flex gap-1 pb-5">
            {watched.gold} <Coins className="text-yellow-500" />{" "}
          </CardTitle>
          <CardContent className="flex flex-col items-center gap-3">
            <p className="text-xl">Movement speed</p>
            <div className="flex gap-4 items-center">
              <Button
                onClick={() => handleSpeedDown("moveSpeed")}
                className="bg-transparent text-xl"
              >
                -
              </Button>
              {watchedTotalMS}
              <Button
                onClick={() => handleUp("moveSpeed")}
                className="bg-transparent text-xl"
              >
                +
              </Button>
            </div>
          </CardContent>

          <CardContent className="flex items-center flex-col gap-3">
            <p className="text-xl">Damage</p>
            <div className="flex gap-4 items-center">
              {/* <Button onClick={() => handleFiveDown("damage")}>5</Button> */}
              <Button
                onClick={() => handleDamageDown("damage")}
                className="bg-transparent text-xl"
              >
                -
              </Button>
              {watchedTotalDmg}
              <Button
                onClick={() => handleUp("damage")}
                className="bg-transparent text-xl"
              >
                +
              </Button>
              {/* <Button onClick={() => handleFiveUp("damage")}>5</Button> */}
            </div>
          </CardContent>
        </CardHeader>
      </Card>

      <div className="flex flex-col gap-5">
        <NameForm />

        <Dialog>
          <DialogTrigger className="rounded-sm border p-2">
            Submit
          </DialogTrigger>
          <DialogContent className="bg-base-bg">
            <DialogHeader>
              <FormField
                name="details.url"
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
                        {heroPics?.map((pic) => {
                          return (
                            <CarouselItem key={pic.name} className="">
                              <Card className="flex flex-col items-center justify-center gap-5 bg-transparent w-full relative">
                                <img
                                  src={pic.url}
                                  alt=""
                                  className="w-60 rounded-full"
                                />
                                <FormControl key={pic.name}>
                                  <FormItem>
                                    {/* <DialogClose asChild> */}
                                    <Button
                                      variant={
                                        watchedUrl.name === pic.name
                                          ? "disabled"
                                          : "select"
                                      }
                                      {...field}
                                      value={pic.name}
                                      onClick={() => {
                                        field.onChange(heroPics);
                                        setValue("details.url", pic);
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
            </DialogHeader>

            {formIsValid() ? (
              <Button onClick={handleSubmit(onSubmit)}>Save hero</Button>
            ) : (
              <DialogClose asChild>
                <Button>You&apos;re missing some info</Button>
              </DialogClose>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PreviewForm;
