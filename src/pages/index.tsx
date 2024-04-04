import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { User, userSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";
import { prisma } from "./api/db";

type Dog = {
  name: string;
  age: number;
};

const HomePage = () => {
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      pic: "",
    },
  });

  const athena: Dog = {
    name: "sdf",
    age: 0,
  };

  const [allUsers, setAllUsers] = useState<User[]>();

  // const { data: user } = trpc.findAll.useQuery();

  // const { data: user, isLoading } = trpc.user.findAll.useQuery();

  // const { data: user } = trpc.user.findEvery.useQuery();

  const { data: user } = trpc.user.findAll.useQuery();

  // const users = user;

  const createAUser = trpc.user.createUser.useMutation({
    onSuccess: async () => {
      alert("made");
    },
  });

  console.log("user", user);
  // const makeNew = trpc.createUser.useMutation({
  //   onSuccess: async () => {
  //     alert("wogoohohoho");
  //   },
  // });

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    // await makeNew.mutateAsync(data);

    await createAUser.mutateAsync(data);
  };

  // const {data: user} = trpc.createUser.useMutation({
  //   onSuccess: async () => {
  //     await trpc.user.
  //   }
  // })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="bg-gray-500 min-h-screen">
          {/* <div style={{ background: "black", width: "100%", height: "screen" }}> */}
          <Input {...form.register("name")} placeholder="name" />
          <Input {...form.register("email")} placeholder="email" />
          <Input {...form.register("pic")} placeholder="pic" />
          <Button variant="default">HEllo</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default HomePage;
