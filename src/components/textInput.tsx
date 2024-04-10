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
            <FormLabel className="pl-1.5 text-base-txtClr">
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
// <FormField

//   name="moveSpeed"
//   control={form.control}
//   render={({ field }) => (
//     <FormItem>
//       <FormLabel>
//         Speed
//         <FormMessage className="text-red-400" />
//       </FormLabel>
//       <FormControl>
//         <Input
//           className="text-black"
//           {...field}
//           placeholder="Hero name *"
//         />
//       </FormControl>
//     </FormItem>
//   )}
// />

// "use client";

// import { useFormContext } from "react-hook-form";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@regulars/ui";
// import { Input } from "@regulars/ui";
// import { UpdateProps } from "./userAccSettings";

// const TextField = ({ fieldName, fieldLabel }: UpdateProps) => {
//   const { control } = useFormContext();

//   return (
//     <div className="w-full">
// <FormField
//   name={fieldName}
//   control={control}
//   render={({ field }) => (
//     <>
//       <FormItem className="relative w-full flex-grow space-y-0 ">
//         <FormLabel className="pl-1.5">
//           {" "}
//           {fieldLabel}
//           <FormMessage className="absolute right-0 top-0 text-base capitalize dark:text-red-400" />
//         </FormLabel>
//         <FormControl>
//           <Input {...field} />
//         </FormControl>
//       </FormItem>
//     </>
//   )}
// />
//     </div>
//   );
// };

// export default TextField;
