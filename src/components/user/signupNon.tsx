import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, userSchema } from "@/types/user";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TextField from "../textInput";
import PasswordField from "../passwordInput";

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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="bg-base-bg flex flex-col gap-4 text-base-txtClr  w-80 py-20 justify-center items-center">
          <h1>Sign up</h1>
          {/* <div className="w-80"> */}
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
          <TextField
            fieldLabel="Username"
            fieldName="userName"
            placeholder="Username"
          />
          <Button className="w-full my-5" variant="select">
            Submit
          </Button>
          {/* </div> */}
        </div>
      </form>
    </FormProvider>
  );
};

export default SignupForm;
