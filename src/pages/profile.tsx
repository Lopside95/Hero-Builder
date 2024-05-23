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
import Gallery from "@/components/user/gallery";
import NoSession from "@/components/user/noSession";
import { User } from "@/types/user";
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

  const { control } = useFormContext<User>();

  const deleteUser = trpc.user.deleteAccount.useMutation({
    onSuccess: async () => {
      alert("SUCCESS");
      await utils.user.invalidate();
      update();
    },
  });

  const handleDelete = async (data: User) => {
    try {
      await deleteUser.mutateAsync(data);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-base-bg text-base-txtClr pt-20 flex flex-col items-center">
      {isLoading ? (
        <div>
          <Loader2 className="animate-spin" />
        </div>
      ) : !isLoading && !session ? (
        <Card className="text-3xl pt-32">
          <CardTitle className="text-3xl">
            You need an account to view this content.
          </CardTitle>
          <CardContent className=" text-center">
            <br />
            <Link className="text-blue-400" href="/">
              Log in
            </Link>{" "}
            or{" "}
            <Link className="text-blue-400" href="/signup">
              sign up
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div>
          <FormField
            control={control}
            render={({ field }) => (
              <>
                <FormItem className="w-full">
                  <FormLabel className="pl-1.5 flex gap-4 text-base-txtClr">
                    Delete your account
                    <FormMessage className="text-md capitalize dark:text-red-400/55" />
                  </FormLabel>
                  <FormControl>
                    <Button {...field}>Delete</Button>
                  </FormControl>
                </FormItem>
              </>
            )}
          />

          {/* <Button onClick={() => handleDelete}>Delete</Button> */}
          <Gallery />
        </div>
      )}

      {/* {!session ? <NoSession /> : <Gallery />} */}
    </div>
  );
};

export default Profile;
