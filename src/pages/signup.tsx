// import Navbar from "@/components/Navbar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { User, userSchema } from "@/types/user";
// import { trpc } from "@/utils/trpc";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

// const Signup = () => {
//   const form = useForm<User>({
//     resolver: zodResolver(userSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       pic: "",
//     },
//   });

//   const createNewUser = trpc.user.createUser.useMutation({
//     onSuccess: () => {
//       alert("user created");
//     },
//   });

//   const onSubmit: SubmitHandler<User> = async (data: User) => {
//     await createNewUser.mutateAsync(data);

//     console.log("data", data);
//   };

//   return (
//     <FormProvider {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)}>
//         <Navbar />
//         {/* {isLoading ? (
//           <div>Loading...</div>
//         ) : ( */}
//         <div className="bg-base-bg flex flex-col items-center py-20 w-full min-h-screen">
//           <div className="w-1/3 ">
//             <Input {...form.register("name")} placeholder="name" />
//             <Input {...form.register("email")} placeholder="email" />
//             <Input {...form.register("password")} placeholder="pass" />
//             <Input {...form.register("pic")} placeholder="pic" />

//             <Button>Submit</Button>
//           </div>
//         </div>
//         {/* )} */}
//       </form>
//     </FormProvider>
//   );
// };

// export default Signup;
