import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import { Login, loginSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@/components/textInput";
import PasswordField from "@/components/passwordInput";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

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

  const [error, setError] = useState<string>("");

  const onSubmit: SubmitHandler<Login> = async (data: Login) => {
    try {
      setError("");
      const res = await signIn("credentials", {
        ...data,
        callbackUrl: "/",
        redirect: false,
      });

      if (!res?.error) {
        window.location.reload();
      } else {
        setError("Invalid email or password");
        console.log(error);
      }
    } catch (error: unknown) {
      setError("Something went wrong. Please, try again");
    }
  };

  const LoginAlert = () => {
    return (
      <Alert>
        <AlertTitle>Oops</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="bg-base-bg flex flex-col text-base-txtClr w-80 gap-3 justify-center items-center">
          {error !== "" && <LoginAlert />}
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
