import Loading from "@/components/loading";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HeroTable from "@/components/user/heroTable";
import { trpc } from "@/utils/trpc";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const Overview = () => {
  //   const [currentUser, userHeroes] = trpc.useQueries((t) => [
  //     t.user.getUserById(),
  //     t.user.getHeroesByUser(),
  //   ]);

  const { data: user } = trpc.user.getUserById.useQuery();

  //   const user = currentUser.data;

  //   const heroes = userHeroes.data ? userHeroes.data : [];

  // const heroes = user.

  return (
    <div className="pt-20">
      {user ? (
        <>
          <h1 className="text-6xl pl-10">Welcome {user?.userName}</h1>
          <div className="flex items-center justify-evenly py-10">
            <Image
              alt="Your pic"
              height={200}
              loading="lazy"
              src={user!.pic}
              width={200}
            />
          </div>
          <HeroTable />
        </>
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </div>
  );
};

export default Overview;
