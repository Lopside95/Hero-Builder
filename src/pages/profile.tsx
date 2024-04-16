/* eslint-disable @next/next/no-img-element */

import Navbar from "@/components/Navbar";
import Gallery from "@/components/user/gallery";
import NoSession from "@/components/user/noSession";
import { FinalHeroSchema } from "@/types/hero";
import { trpc } from "@/utils/trpc";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";

const Profile = () => {
  const { data: user, isPending } = trpc.user.getUserById.useQuery();
  const { data: userHeroes } = trpc.user.getHeroesByUser.useQuery();
  const { data: session } = useSession();
  console.log("userHeroes", userHeroes);

  return (
    <div className="w-full min-h-screen bg-base-bg text-base-txtClr pt-20 flex flex-col items-center">
      {!session ? <NoSession /> : <Gallery />}
    </div>
  );
};

export default Profile;
