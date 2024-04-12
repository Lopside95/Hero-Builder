import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { TextFieldInterface } from "@/pages/createBoots";
import { Input } from "./ui/input";

const TextField = ({ fieldName, fieldLabel }: TextFieldInterface) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={fieldName}
      control={control}
      render={({ field }) => (
        <>
          <FormItem className="w-full">
            <FormLabel className="pl-1.5 ">
              {" "}
              {fieldLabel}
              <FormMessage className="text-base capitalize dark:text-red-400" />
            </FormLabel>
            <FormControl>
              <Input {...field} className="w-1/4" />
            </FormControl>
          </FormItem>
        </>
      )}
    />
  );
};
export default TextField;
