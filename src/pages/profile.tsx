import Navbar from "@/components/Navbar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Gallery from "@/components/user/gallery";
import NoSession from "@/components/user/noSession";
import { trpc } from "@/utils/trpc";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Profile = () => {
  const { data: session } = useSession();

  const { isLoading } = trpc.user.getUserById.useQuery();

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
        <Gallery />
      )}

      {/* {!session ? <NoSession /> : <Gallery />} */}
    </div>
  );
};

export default Profile;
