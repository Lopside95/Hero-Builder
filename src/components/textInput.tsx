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
import { FieldProps } from "@/pages/login";

const TextField = ({ fieldName, fieldLabel, placeholder }: FieldProps) => {
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
              <Input {...field} className="" placeholder={placeholder} />
            </FormControl>
          </FormItem>
        </>
      )}
    />
  );
};
export default TextField;
