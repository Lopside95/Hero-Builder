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
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { ShopSkeleton } from "../shopSkeleton";
import { LoadingProps } from "@/pages/create";

const DetailsForm = ({ isFetched }: LoadingProps) => {
  const { control } = useFormContext<FinalHeroSchema>();

  return (
    <div className="w-[388px] mr-14">
      {!isFetched ? (
        <ShopSkeleton />
      ) : (
        <Card>
          <CardContent>
            <FormField
              control={control}
              name="details.name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>
                    Hero name *
                    <FormMessage className="text-red-400" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-none"
                      {...field}
                      placeholder="Hero name"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="details.story"
              render={({ field, fieldState }) => (
                <FormItem className="">
                  <FormLabel>
                    Backstory
                    <FormMessage className="text-red-400" />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className={` h-32  text-${
                        fieldState.isTouched ? "base-bg" : "muted-foreground"
                      }`}
                      placeholder=""
                    />
                    {/* 
                    fieldState.isTouched keeps default text looking like placeholder but, if interacted with, it renders as normal text
                    showing that it doesn't actually need to be added to actually changed, unlike the 'name' which requires user input
                    */}
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DetailsForm;
