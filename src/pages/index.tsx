import { trpc } from "@/utils/trpc";
import { prisma } from "./api/db";
import { useQuery } from "@tanstack/react-query";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { User, userSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";

const HomePage = () => {
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      pic: "",
    },
  });

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
        <div style={{ background: "black", width: "100%", height: "screen" }}>
          <input {...form.register("name")} />
          <input {...form.register("email")} />
          <input {...form.register("pic")} />
        </div>
        <button>Submit</button>
      </form>
    </FormProvider>
  );
};

export default HomePage;
