import Navbar from "@/components/Navbar";
import Gallery from "@/components/user/gallery";
import NoSession from "@/components/user/noSession";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";

const Profile = () => {
  const [user, userHeroes] = trpc.useQueries((t) => [
    t.user.getUserById(),
    t.user.getHeroesByUser(),
  ]);
  const { data: session } = useSession();

  return (
    <div className="w-full min-h-screen bg-base-bg text-base-txtClr pt-20 flex flex-col items-center">
      {!session ? <NoSession /> : <Gallery />}
    </div>
  );
};

export default Profile;
