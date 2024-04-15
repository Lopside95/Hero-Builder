/* eslint-disable @next/next/no-img-element */

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
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
import TextField from "@/components/textInput";
import PasswordField from "@/components/passwordInput";

export interface FieldProps {
  fieldName: string;
  fieldLabel: string;
  placeholder: string;
}

const LoginForm = () => {
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const [error, setError] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User>();

  const { control } = useFormContext();

  const allUsers = trpc.user.findAll.useQuery();

  const onSubmit: SubmitHandler<Login> = async (data: Login) => {
    try {
      setError("");
      const res = await signIn("credentials", {
        ...data,
        callbackUrl: "/",
        redirect: true,
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
        <div className="bg-base-bg flex flex-col text-base-txtClr w-80 gap-3 justify-center items-center">
          <TextField
            fieldLabel="Email"
            fieldName="email"
            placeholder="example@email.com"
          />
          <PasswordField
            fieldLabel="Password"
            fieldName="password"
            placeholder="Password"
          />
          <Button variant="select" className="w-full my-4">
            Login
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else if (!session) {
  }

  return {
    props: {},
  };
};
