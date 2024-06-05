import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button, buttonVariants } from "../../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteUserSchema, deleteUserSchema } from "@/types/user";
import { trpc } from "@/utils/trpc";
import { signOut } from "next-auth/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DeleteUser = () => {
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
      await utils.user.invalidate();
      await signOut({ callbackUrl: "/" }); // forces site to reload, logging the users out (sometimes users stayed logged in even though the account had been deleted)
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
            className={`${cn(buttonVariants({ variant: "default" }))} w-full `}
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
                {Boolean(isDeleting) && (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin sm:h-4 sm:w-4 " />
                )}
                {Boolean(isDeleting) ? "Deleting account" : "Delete account"}
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </form>
    </FormProvider>
  );
};

export default DeleteUser;
