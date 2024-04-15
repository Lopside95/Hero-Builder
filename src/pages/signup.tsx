import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, userSchema } from "@/types/user";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@/components/textInput";
import PasswordField from "@/components/passwordInput";

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
        className="
      bg-base-bg flex flex-col gap-4 text-base-txtClr justify-center w-full py-32
      "
      >
        {/* <Navbar /> */}
        <div className="w-80 self-center">
          <TextField
            fieldLabel="Email"
            fieldName="email"
            placeholder="example@email.com"
          />
          <TextField
            fieldLabel="Username"
            fieldName="userName"
            placeholder="Username"
          />
          <PasswordField
            fieldLabel="Password"
            fieldName="password"
            placeholder="Password"
          />
          <TextField
            fieldLabel="Profile Pic"
            fieldName="pic"
            placeholder="profpic"
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
