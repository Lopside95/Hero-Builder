/* eslint-disable @next/next/no-img-element */

import Navbar from "@/components/Navbar";
import Gallery from "@/components/user/gallery";
import { FinalHeroSchema } from "@/types/hero";
import { trpc } from "@/utils/trpc";
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
  return (
    <div className="w-full min-h-screen bg-base-bg text-base-txtClr pt-20 flex flex-col items-center">
      <Navbar />
      <div>
        <Gallery />
      </div>
    </div>
  );
};

export default Profile;
