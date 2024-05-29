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
import DeleteUser from "@/components/user/profile/deleteUser";
import Gallery from "@/components/user/profile/gallery";
import NoProfile from "@/components/user/noProfile";
import NoSession from "@/components/user/noSession";
import { trpc } from "@/utils/trpc";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import Account from "@/components/user/profile/account";
import Stats from "@/components/user/profile/stats";
import HeroTable from "@/components/user/profile/heroTable";
import Image from "next/image";
import { ShopSkeleton } from "@/components/shopSkeleton";

const Profile = () => {
  const { data: session, update: updateSession } = useSession();

  const { data: user, isLoading } = trpc.user.getUserById.useQuery();
  const { data: heroes } = trpc.user.getHeroesByUser.useQuery();

  const heroArr = heroes ? heroes : [];
  const router = useRouter();
  const utils = trpc.useUtils();

  return (
    <div className="w-full min-h-screen pt-20 flex flex-col items-center">
      <h1 className="text-6xl pb-10 ">Account</h1>
      <section className="flex gap-10 place-items-end  ">
        <article className="flex flex-col ">
          <Account />
          <DeleteUser />
        </article>
        <article className="flex flex-col gap-10">
          <article className="flex items-center justify-center gap-10">
            <div className="flex flex-col">
              <h2 className="text-4xl">{user?.userName}</h2>
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
                // loading="lazy"
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
