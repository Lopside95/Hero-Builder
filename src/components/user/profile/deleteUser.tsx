import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Button, buttonVariants } from "../../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteUserSchema, deleteUserSchema, userSchema } from "@/types/user";
import TextField from "../../textInput";
import { trpc } from "@/utils/trpc";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DeleteUser = () => {
  const { update: updateSession } = useSession();

  const utils = trpc.useUtils();

  const form = useForm<DeleteUserSchema>({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: {
      password: "",
    },
  });

  const [isDeleting, setIsDeleting] = useState<boolean>();

  const deleteUser = trpc.user.deleteAccount.useMutation({
    onSuccess: async () => {
      alert("SUCCESS");
      await utils.user.invalidate();
      await updateSession();
      window.location.reload();
    },
  });

  const onSubmit: SubmitHandler<DeleteUserSchema> = async (
    data: DeleteUserSchema
  ) => {
    setIsDeleting(true);
    try {
      await deleteUser.mutateAsync(data);
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <Dialog>
          <DialogTrigger
            className={`${cn(buttonVariants({ variant: "select" }))} w-full `}
          >
            Delete account
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete your account?
              </DialogTitle>
            </DialogHeader>
            <DialogClose asChild>
              <Button onClick={form.handleSubmit(onSubmit)} type="submit">
                Delete account{Boolean(isDeleting) && "Deleting account"}
                {Boolean(isDeleting) && (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin sm:h-4 sm:w-4 " />
                )}
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>

        {/* <TextField
          fieldLabel="Password"
          fieldName="password"
          placeholder="Password"
        />
        <Button variant="select">Delete</Button> */}
      </form>
    </FormProvider>
  );
};

export default DeleteUser;
