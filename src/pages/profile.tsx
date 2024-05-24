import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DeleteUser from "@/components/user/deleteUser";
import Gallery from "@/components/user/gallery";
import NoProfile from "@/components/user/noProfile";
import NoSession from "@/components/user/noSession";
import { trpc } from "@/utils/trpc";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";

const Profile = () => {
  const { data: session, update } = useSession();

  const { data: user, isLoading } = trpc.user.getUserById.useQuery();
  const router = useRouter();
  const utils = trpc.useUtils();

  // const { control } = useFormContext<DeleteUser>();

  // const deleteUser = trpc.user.deleteAccount.useMutation({
  //   onSuccess: async () => {
  //     alert("SUCCESS");
  //     await utils.user.invalidate();
  //     update();
  //   },
  // });

  // const handleDelete = async (data: UserSchema) => {
  //   if (!user) {
  //     console.log("not logged in");
  //   }

  //   try {
  //     await deleteUser.mutateAsync(data);
  //     router.push("/");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // console.log("user", user);

  return (
    <div className="w-full min-h-screen bg-base-bg text-base-txtClr pt-20 flex flex-col items-center">
      {/* <Button onClick={() => handleDelete(user)}>Delete</Button> */}
      <DeleteUser />
      <Gallery />
    </div>
  );
};

export default Profile;
