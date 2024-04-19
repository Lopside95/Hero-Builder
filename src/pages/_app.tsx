import { AppType } from "next/app";
import "../styles/globals.css";
import { trpc } from "@/utils/trpc";
import { FormProvider, useForm } from "react-hook-form";
import { SessionProvider, getSession, useSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import Loading from "@/components/loading";

const MyApp: AppType = ({ Component, pageProps }) => {
  const form = useForm();

  return (
    <SessionProvider>
      <FormProvider {...form}>
        {/* <Suspense fallback={<Loading />}> */}
        <Navbar />
        <Component {...pageProps} />
        {/* </Suspense> */}
      </FormProvider>
    </SessionProvider>
  );
};
export default trpc.withTRPC(MyApp);

export function mySession() {}
