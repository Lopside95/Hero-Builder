import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { FieldProps } from "./user/loginForm";

const TextField = ({
  fieldName,
  fieldLabel,
  placeholder,
  autoComplete,
}: FieldProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={fieldName}
      control={control}
      render={({ field }) => (
        <>
          <FormItem className="w-full">
            <FormLabel className="pl-1.5 flex gap-4 text-base-txtClr">
              {" "}
              {fieldLabel}
              <FormMessage className="text-md capitalize dark:text-red-400/55" />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className=""
                placeholder={placeholder}
                autoComplete={autoComplete}
              />
            </FormControl>
          </FormItem>
        </>
      )}
    />
  );
};
export default TextField;
