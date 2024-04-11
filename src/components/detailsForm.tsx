import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { FinalHeroSchema } from "@/types/hero";
import { trpc } from "@/utils/trpc";

const DetailsForm = () => {
  const { watch, control, getValues, setValue } =
    useFormContext<FinalHeroSchema>();

  const { data: heroPics } = trpc.shop.getAllHeroPics.useQuery();

  return (
    <div>
      {/* <h1 className="text-base-txtClr">{gold}</h1> */}
      <FormField
        name="name"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Hero name
              <FormMessage className="text-red-400" />
            </FormLabel>
            <FormControl>
              <Input
                className="bg-base-bg"
                {...field}
                placeholder="Hero name *"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="backstory"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Hero name
              <FormMessage className="text-red-400" />
            </FormLabel>
            <FormControl>
              <Input
                className="bg-base-bg"
                {...field}
                placeholder="Backstory"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <div>
        <img src={heroPics && heroPics[0].url} className="w-32" alt="" />
      </div>
      <FormField
        name="profilePic"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Profile Pic
              <FormMessage className="text-red-400" />
            </FormLabel>
            <FormControl>
              <Input className="bg-base-bg" {...field} placeholder="Pic" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default DetailsForm;
