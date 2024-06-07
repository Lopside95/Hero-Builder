import DeleteUser from "@/components/user/profile/deleteUser";
import Gallery from "@/components/user/profile/gallery";
import { trpc } from "@/utils/trpc";
import Account from "@/components/user/profile/account";
import HeroTable from "@/components/user/profile/heroTable";
import Image from "next/image";
import { ShopSkeleton } from "@/components/shopSkeleton";

const Profile = () => {
  const { data: user } = trpc.user.getUserById.useQuery();
  const { data: heroes } = trpc.user.getHeroesByUser.useQuery();

  const heroArr = heroes ? heroes : [];

  return (
    <div className="w-full min-h-screen pt-20 flex flex-col items-center">
      <h1 className="text-6xl pb-10 ">Your account</h1>
      <section className="flex gap-10 place-items-end  ">
        <article className="flex flex-col ">
          <Account />
          <DeleteUser />
        </article>
        <article className="flex flex-col gap-10">
          <article className="flex items-center justify-center gap-10">
            <div className="flex flex-col">
              <h2 className="text-4xl pb-4">{user?.userName}</h2>
              <h1 className="text-2xl">
                {heroArr.length > 1
                  ? heroArr.length + " heroes"
                  : heroArr.length === 1
                  ? "1 hero"
                  : "No heroes"}
              </h1>
            </div>
            {user?.pic ? (
              <Image
                alt="Your pic"
                className="rounded-sm"
                height={150}
                src={user ? user.pic : ""}
                width={150}
              />
            ) : (
              <ShopSkeleton className="w-20 h-20" />
            )}
          </article>
          <HeroTable />
        </article>
      </section>
      <Gallery />
    </div>
  );
};

export default Profile;
