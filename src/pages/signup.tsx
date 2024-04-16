import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, userSchema } from "@/types/user";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@/components/textInput";
import PasswordField from "@/components/passwordInput";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SignupForm = () => {
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      pic: "",
    },
  });

  const createNewUser = trpc.user.createUser.useMutation({
    onSuccess: () => {
      alert("user created");
    },
  });

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    await createNewUser.mutateAsync(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-10 items-center justify-center w-full py-40"
      >
        <h1 className="text-2xl fixed top-20">Signup</h1>
        <Card className="text-xl">
          <CardContent>
            <ul className="flex flex-col gap-3 list-disc">
              <li>Email doesn&apos;t need to be an existing email</li>
              <li>Passwords are encrypted but require no particular format</li>
              <li>You&apos;ll use your email and password to log in</li>
              <li>You will be randomly assigned a profile picture</li>
            </ul>
          </CardContent>
        </Card>
        <div className="w-80 self-center flex flex-col gap-5 ">
          <TextField
            fieldLabel="Email *"
            fieldName="email"
            placeholder="optional@email.com"
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
          <Button className="w-full my-5" variant="select">
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SignupForm;
