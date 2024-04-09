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

const DetailsForm = () => {
  const { watch, control, getValues, setValue } =
    useFormContext<FinalHeroSchema>();

  return (
    <div>
      {/* <h1 className="text-base-txtClr">{gold}</h1> */}
      <FormField
        name="details.name"
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
        name="details.backstory"
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
      <FormField
        name="details.profilePic"
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
