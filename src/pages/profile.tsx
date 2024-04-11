/* eslint-disable @next/next/no-img-element */

import Navbar from "@/components/Navbar";
import Gallery from "@/components/user/gallery";
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
