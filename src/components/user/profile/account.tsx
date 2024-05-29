import Loading from "@/components/loading";
import PasswordField from "@/components/passwordInput";
import TextField from "@/components/textInput";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HeroTable from "@/components/user/profile/heroTable";
import { User, userSchema } from "@/types/user";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";

const Account = () => {
  const { data: user } = trpc.user.getUserById.useQuery();

  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userName: user?.userName,
      email: user?.email,
      password: undefined,
    },
  });

  return (
    <FormProvider {...form}>
      <form className="pt-20 bg-slate-600 w-full">
        <section className="flex items-center justify-evenly py-10">
          <article className="flex gap-5 flex-col">
            <h1 className="text-6xl pl-10">Account</h1>

            <TextField
              fieldLabel="Username"
              fieldName="userName"
              placeholder=""
            />
            <TextField fieldLabel="Email" fieldName="email" placeholder="" />
            <PasswordField
              fieldLabel="Password"
              fieldName="password"
              placeholder=""
            />
            <Button>Update</Button>
          </article>
          {/* <h1 className="text-6xl pl-10"> {user?.userName}</h1> */}
          {/* <Image
            alt="Your pic"
            height={150}
            loading="lazy"
            src={user!.pic}
            width={150}
          /> */}
        </section>
        {/* <HeroTable /> */}
      </form>
    </FormProvider>
  );
};

export default Account;
