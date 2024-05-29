import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@/components/textInput";
import PasswordField from "@/components/passwordInput";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { TRPCError } from "@trpc/server";
import { User, userSchema } from "@/types/user";

const SignupForm = () => {
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      repeatPassword: "",
      pic: "",
    },
  });

  const router = useRouter();

  const { update: updateSession } = useSession();

  const createNewUser = trpc.user.createUser.useMutation({
    onSuccess: async () => {
      updateSession();
    },
  });

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    try {
      await createNewUser.mutateAsync(data);

      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error: unknown) {
      console.error(error);
    }
  };
  return (
    <FormProvider {...form}>
      <form
        className="flex gap-10 items-center justify-center w-full py-40"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl fixed top-20">Sign Up</h1>
        <Card className="text-xl">
          <CardContent>
            <ul className="flex flex-col gap-3 list-disc w-[30rem]">
              <li>You&apos;ll use your email and password to log in</li>
              <li>Email doesn&apos;t need to be an existing email</li>
              <li>
                Passwords must include an uppercase letter, a number, a special
                character and must be at least 5 characters long. Passwords are
                encrypted.
              </li>
            </ul>
          </CardContent>
        </Card>
        <div className="w-80 self-center flex flex-col gap-5 ">
          <TextField
            fieldLabel="Email *"
            fieldName="email"
            placeholder="example@email.com"
          />
          <TextField
            fieldLabel="Username *"
            fieldName="userName"
            placeholder="Username"
          />
          <PasswordField
            fieldLabel="Password *"
            fieldName="password"
            placeholder="Password "
          />
          <PasswordField
            fieldLabel="Repeat password *"
            fieldName="repeatPassword"
            placeholder="Repeat password "
          />
          <Button className="w-full my-5">Submit</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SignupForm;
