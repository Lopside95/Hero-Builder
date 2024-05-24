import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteUserSchema, deleteUserSchema, userSchema } from "@/types/user";
import TextField from "../textInput";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const DeleteUser = () => {
  const { control } = useFormContext();
  const { update } = useSession();

  const user = trpc.user.getUserById.useQuery();

  const utils = trpc.useUtils();

  const form = useForm<DeleteUserSchema>({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: {
      password: "",
    },
  });

  const router = useRouter();

  const deleteHeroes = trpc.user.deleteUserHeroes.useMutation({
    onSuccess: async () => {
      console.log("Deleted heroes");
      await utils.hero.invalidate();
    },
  });

  const deleteUser = trpc.user.deleteAccount.useMutation({
    onSuccess: async () => {
      alert("SUCCESS");
      await utils.user.getHeroesByUser.invalidate();
      await utils.user.invalidate();
      update();
    },
  });

  const onSubmit: SubmitHandler<DeleteUserSchema> = async (
    data: DeleteUserSchema
  ) => {
    try {
      await deleteUser.mutateAsync(data);
    } catch (error) {
      console.error(error);
    }

    // try {
    //   await deleteHeroes.mutateAsync(userId);
    // } catch (error) {
    //   console.error;
    // } finally {
    //   await deleteUser.mutateAsync(data);
    // }

    // if (!user) {
    //   console.log("not logged in");
    // }

    // try {
    //   await deleteUser.mutateAsync(data);
    //   router.push("/");
    //   //   window.location.assign("/");
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TextField
            fieldLabel="Password"
            fieldName="password"
            placeholder="Password"
          />
          <Button>Delete</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default DeleteUser;

// FormField
//       control={control}
//       name="password"
//       render={({ field }) => (
//         <>
//           <FormItem className="w-full">
//             <FormLabel className="pl-1.5 flex gap-4 text-base-txtClr">
//               Delete your account
//               <FormMessage className="text-md capitalize dark:text-red-400/55" />
//             </FormLabel>
//             <FormControl>
//               <Button {...field}>Delete</Button>
//             </FormControl>
//           </FormItem>
//         </>
//       )}
//     />
