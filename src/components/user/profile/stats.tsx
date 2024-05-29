import { trpc } from "@/utils/trpc";
import HeroTable from "./heroTable";
import Image from "next/image";

const Stats = () => {
  const { data: user } = trpc.user.getUserById.useQuery();

  return (
    <div className="">
      <Image
        alt="Your pic"
        height={150}
        loading="lazy"
        src={user ? user!.pic : ""}
        width={150}
      />
      <HeroTable />
    </div>
  );
};

export default Stats;
