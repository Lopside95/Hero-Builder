import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import TextField from "@/components/textInput";
import PasswordField from "@/components/passwordInput";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { User, userSchema } from "@/types/user";
import { useEffect, useState } from "react";
import { Check, TicketIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export type PasswordConditions = {
  uppercase: boolean;
  hasNumber: boolean;
  special: boolean;
  longEnough: boolean;
};
// Placed check in custom component to avoid explicitly checking the condition for each of the password conditions in the tsx
const GreenCheck = () => {
  return <Check className="text-green-500 w-4 h-4" />;
};

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

  const watchedPassword = form.watch("password");

  const [satisfied, setSatisfied] = useState<PasswordConditions>({
    uppercase: false,
    hasNumber: false,
    special: false,
    longEnough: false,
  });

  // This checks the watchedPassword and returns true if the condition has been satisfied. Used to change the colors of the
  // text, letting users know when their password is acceptable.
  useEffect(() => {
    const checkUppercase =
      watchedPassword !== undefined && /[A-Z]/.test(watchedPassword);
    const checkHasNumber =
      watchedPassword !== undefined && /\d/.test(watchedPassword);
    const checkSpecial =
      watchedPassword !== undefined &&
      /[!@#$%^&*(),.?":{}|<>]/.test(watchedPassword);
    const checkLongEnough =
      watchedPassword !== undefined && watchedPassword.length >= 5;

    setSatisfied({
      uppercase: checkUppercase,
      hasNumber: checkHasNumber,
      special: checkSpecial,
      longEnough: checkLongEnough,
    });
  }, [watchedPassword]);

  const decideColor = (condition: boolean) => {
    return condition ? `text-green-500` : "text-orange-300";
  };

  const createNewUser = trpc.user.createUser.useMutation({
    onSuccess: async () => {
      alert("user created");
      updateSession();
    },
    onError: () => {
      console.log("WTF");
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
              <li>Passwords must include:</li>
              <ul className="list-disc pl-10">
                {" "}
                <li className="flex gap-1 items-center">
                  an{" "}
                  <span className={`${decideColor(satisfied.uppercase)} `}>
                    uppercase letter
                  </span>
                  {Boolean(satisfied.uppercase) && <GreenCheck />}
                </li>
                <li className="flex gap-1 items-center">
                  a{" "}
                  <span className={`${decideColor(satisfied.hasNumber)}`}>
                    {" "}
                    number
                  </span>
                  {Boolean(satisfied.hasNumber) && <GreenCheck />}
                </li>
                <li className="flex gap-1 items-center">
                  a{" "}
                  <span className={`${decideColor(satisfied.special)}`}>
                    {" "}
                    special character
                  </span>{" "}
                  {Boolean(satisfied.special) && <GreenCheck />}
                </li>
                <li className="flex gap-1 items-center">
                  and be at least{" "}
                  <span className={`${decideColor(satisfied.longEnough)}`}>
                    5 characters long
                  </span>
                  {Boolean(satisfied.longEnough) && <GreenCheck />}
                </li>
              </ul>
            </ul>
          </CardContent>
        </Card>
        <div className="w-80 self-center flex flex-col gap-5 ">
          <TextField
            autoComplete="off"
            fieldLabel="Email *"
            fieldName="email"
            placeholder="example@email.com"
          />
          <TextField
            autoComplete="off"
            fieldLabel="Username *"
            fieldName="userName"
            placeholder="Username"
          />
          <Input autoComplete="o" />
          <PasswordField
            autoComplete="off"
            fieldLabel="Password *"
            fieldName="password"
            placeholder="Password "
          />
          <PasswordField
            autoComplete="off"
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
