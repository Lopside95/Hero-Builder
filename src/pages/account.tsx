/* eslint-disable @next/next/no-img-element */

import Navbar from "@/components/Navbar";
import BootsForm from "@/components/create/bootsForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, userSchema } from "@/types/user";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";

const UserAccount = () => {
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      pic: "",
    },
  });

  const trpcUtils = trpc.useUtils();
  const setUpdates = trpc.user.updateUser.useMutation({
    onSuccess: async () => {
      alert("updated");
      await trpcUtils.user.findAll.invalidate();
    },
  });

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    await setUpdates.mutateAsync(data);

    console.log("data", data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Navbar />

        <div className="bg-base-bg flex flex-col items-center py-20 w-full min-h-screen">
          <div className="w-1/3 ">
            <Input {...form.register("userName")} placeholder="name" />
            <Input {...form.register("email")} placeholder="email" />
            <Input {...form.register("password")} placeholder="pass" />
            <Input {...form.register("pic")} placeholder="pic" />

            <Button>Submit</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserAccount;
