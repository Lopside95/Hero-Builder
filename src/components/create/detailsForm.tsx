import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FinalHeroSchema } from "@/types/hero";
import { trpc } from "@/utils/trpc";
import { Textarea } from "../ui/textarea";

const DetailsForm = () => {
  const { watch, control, getValues, setValue } =
    useFormContext<FinalHeroSchema>();

  const { data: heroPics } = trpc.shop.getAllHeroPics.useQuery();

  return (
    <div className="w-[22%] mr-20">
      <FormField
        name="details.name"
        control={control}
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>
              Hero name
              <FormMessage className="text-red-400" />
            </FormLabel>
            <FormControl>
              <Input
                className="border-none"
                {...field}
                placeholder="Hero name *"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="details.story"
        control={control}
        render={({ field, fieldState }) => (
          <FormItem className="">
            <FormLabel>
              Backstory
              <FormMessage className="text-red-400" />
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                // className="bg-base-txtClr  text-base-bg"
                className={` h-32  text-${
                  fieldState.isTouched ? "base-bg" : "muted-foreground"
                }`}
                placeholder=""
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default DetailsForm;
