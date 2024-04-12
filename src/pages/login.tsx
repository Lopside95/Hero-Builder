/* eslint-disable @next/next/no-img-element */

import Navbar from "@/components/Navbar";
import UserLogin from "@/components/user/login";
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
import LoginForm from "@/components/user/login";

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
        console.log("sign in worked");

        //eslint-disable-next-line
      } else {
        setError("Invalid email or password");
      }
    } catch (error: unknown) {
      setError("Something went wrong. Please, try again");
    }

    console.log("data", data);
  };

  const { data: user } = trpc.user.getUserById.useQuery();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Navbar />
        <div className="bg-base-bg flex flex-col text-base-txtClr py-20  justify-center items-center min-h-screen">
          <LoginForm />
          <Button>Login</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  } else if (!session) {
  }

  return {
    props: {},
  };
};
