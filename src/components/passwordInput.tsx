import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { TextFieldInterface } from "@/pages/createBoots";
import { Input, InputProps } from "./ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FieldProps } from "@/pages/login";

const PasswordField = ({ fieldName, fieldLabel, placeholder }: FieldProps) => {
  const { control } = useFormContext();

  const [showPassword, setShowPassword] = useState<boolean>(false);

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
              <div className="relative">
                <Input
                  {...field}
                  type={showPassword ? "" : "password"}
                  className=""
                  placeholder={placeholder}
                />

                {showPassword ? (
                  <EyeOff
                    className="absolute right-4 top-1/2 w-5 -translate-y-1/2 cursor-pointer text-base-bg opacity-70"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <Eye
                    className="absolute right-4 top-1/2 w-5 -translate-y-1/2 cursor-pointer text-base-bg opacity-70"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </FormControl>
          </FormItem>
        </>
      )}
    />
  );
};
export default PasswordField;
