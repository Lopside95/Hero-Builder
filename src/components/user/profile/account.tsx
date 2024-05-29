import Loading from "@/components/loading";
import PasswordField from "@/components/passwordInput";
import TextField from "@/components/textInput";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HeroTable from "@/components/user/profile/heroTable";
import { UpdateUser, User, updateUserSchema, userSchema } from "@/types/user";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const Account = () => {
  const { data: user } = trpc.user.getUserById.useQuery();

  const utils = trpc.useUtils();
  const { update: updateSession } = useSession();

  const form = useForm<UpdateUser>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      userName: user?.userName,
      email: user?.email,
      password: undefined,
    },
  });

  const [isUpdating, setIsUpdating] = useState<boolean>();

  const updateAccount = trpc.user.updateUser.useMutation({
    onSuccess: async () => {
      utils.user.invalidate();
      updateSession();
    },
  });

  const onSubmit: SubmitHandler<UpdateUser> = async (data: UpdateUser) => {
    setIsUpdating(true);
    await updateAccount.mutateAsync(data);
    setIsUpdating(false);
  };

  return (
    <FormProvider {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <section className="flex items-center w-full justify-evenly py-10">
          <article className="flex gap-5 w-72 flex-col">
            {/* <h1 className="text-6xl pl-10">Account</h1> */}

            <TextField
              // className="w-80"
              fieldLabel="Username"
              fieldName="userName"
              placeholder=""
            />
            <TextField fieldLabel="Email" fieldName="email" placeholder="" />
            <PasswordField
              fieldLabel="Password"
              fieldName="password"
              placeholder="Password"
            />
            <Button type="submit">
              {Boolean(isUpdating) && (
                <Loader2 className="mr-2 h-5 w-5 animate-spin sm:h-4 sm:w-4  " />
              )}
              {Boolean(isUpdating) ? "Saving changes" : "Update"}
            </Button>
          </article>
        </section>
      </form>
    </FormProvider>
  );
};

export default Account;
