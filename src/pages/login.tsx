import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getServerAuthSession } from "@/server/auth";
import { Login, User, loginSchema, userSchema } from "@/types/user";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";

const LoginPage = () => {
  // const form = useForm<HeroDetails>({
  //   resolver: zodResolver(heroDetails),
  //   defaultValues: {
  //     name: "",
  //     totalDmg: "",
  //     totalMS: "",
  //     profilePic: "",
  //   },
  // });
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  // const { data: firstHero, isLoading } = trpc.hero.getHeroDetails.useQuery();

  // const createNewDetails = trpc.hero.createNewHero.useMutation;

  // const createNewDetails = trpc.hero.newHeroDetails.useMutation({
  //   onSuccess: async () => {
  //     alert("done");
  //     await trpcUtils.hero.invalidate();
  //   },
  // });
  const [error, setError] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User>();

  const { control } = useFormContext();
  // const { data: heroes, isLoading, isError } = trpc.getAllHeroes.useQuery();

  //all the routers go through 'api'

  // const { data: user } = trpc.user.getUserById.useQuery();

  // console.log("user", user);
  // const handleGet = async () => {
  //   await trpc.user.getUserById.useQuery()

  // };

  const allUsers = trpc.user.findAll.useQuery();

  const onSubmit: SubmitHandler<Login> = async (data: Login) => {
    try {
      setError("");
      const res = await signIn("credentials", {
        ...data,
        callbackUrl: "/login",
        redirect: false,
      });

      if (!res?.error) {
        console.log("sing in worked");

        //eslint-disable-next-line
        // router.push("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error: unknown) {
      setError("Something went wrong. Please, try again");
    }

    console.log("data", data);
  };

  const { data: user } = trpc.user.getUserById.useQuery();
  const handleGet = async () => {
    setCurrentUser(user);

    console.log("user", user);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Navbar />
        {/* {isLoading ? (
          <div>Loading...</div>
        ) : ( */}
        <div className="bg-base-bg flex flex-col items-center text-base-txtClr py-20 w-full min-h-screen">
          <div className="w-1/3 ">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                    <FormMessage className="text-red-400" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-base-bg"
                      {...field}
                      placeholder="Hero name *"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password
                    <FormMessage className="text-red-400" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-base-bg"
                      {...field}
                      placeholder="pword"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
      <div>
        <Button onClick={handleGet}>Get</Button>
      </div>
    </FormProvider>
  );
};

{
  /* <Input {...form.register("email")} placeholder="email" />
<Input {...form.register("password")} placeholder="pass" /> */
}
{
  /* <Input {...form.register("pic")} placeholder="pic" /> */
}
{
  /* <Input {...form.register("profilePic")} /> */
}
{
  /* <Input {...form.register("bootsImg")} placeholder="bootsIMg" />
<Input {...form.register("weaponImg")} placeholder="wpnImg" /> */
}
export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (session) {
    console.log("Session is active");
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else if (!session) {
    console.log("session not active");
  }

  return {
    props: {},
  };
};
