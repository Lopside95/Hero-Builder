import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const UserLogin = () => {
  const { control } = useFormContext();

  return (
    <div>
      <div className="w-full ">
        <FormField
          name="email"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email
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
          name="password"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password
                <FormMessage className="text-red-400" />
              </FormLabel>
              <FormControl>
                <Input className="bg-base-bg" {...field} placeholder="pword" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </div>
    </div>
  );
};

export default UserLogin;
