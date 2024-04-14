// import {
//   FormProvider,
//   SubmitHandler,
//   useForm,
//   useFormContext,
// } from "react-hook-form";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { Login, loginSchema } from "@/types/user";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signIn } from "next-auth/react";
// import PasswordInput from "../passwordInput";
// import { TextFieldInterface } from "@/pages/createBoots";

// const LoginForm = () => {
//   const { control } = useFormContext();

//   return (
//     <div className="w-80 ">
//       <FormField
//         name="email"
//         control={control}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>
//               Email
//               <FormMessage className="text-red-400" />
//             </FormLabel>
//             <FormControl>
//               <Input className="" {...field} placeholder="Hero name *" />
//             </FormControl>
//           </FormItem>
//         )}
//       />
//       <PasswordInput fieldLabel="Password" fieldName="password" />
//     </div>
//   );
// };

// export default LoginForm;
