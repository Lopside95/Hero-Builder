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
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const DeleteUser = () => {
  const { update } = useSession();

  const utils = trpc.useUtils();

  const form = useForm<DeleteUserSchema>({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: {
      password: "",
    },
  });

  const deleteUser = trpc.user.deleteAccount.useMutation({
    onSuccess: async () => {
      alert("SUCCESS");
      await utils.user.invalidate();
      await update();
      window.location.reload();
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
