import { trpc } from "@/utils/trpc";
import { prisma } from "./api/db";
import { useQuery } from "@tanstack/react-query";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { User, userSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  const { data: user } = trpc.findAll.useQuery();

  const makeNew = trpc.createUser.useMutation({
    onSuccess: async () => {
      alert("wogoohohoho");
    },
  });

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    await makeNew.mutateAsync(data);
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
          <Input
            {...form.register("name")}
            className="bg-black"
            placeholder="name"
          />
          <input {...form.register("email")} placeholder="email" />
          <input {...form.register("pic")} placeholder="pic" />
        </div>
        <Button variant="destructive">HEllo</Button>
      </form>
    </FormProvider>
  );
};

export default HomePage;
