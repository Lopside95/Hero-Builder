import { AppType } from "next/app";
import "../styles/globals.css";
import { trpc } from "@/utils/trpc";
import { FormProvider, useForm } from "react-hook-form";
import { SessionProvider, getSession, useSession } from "next-auth/react";
import { authOptions, getServerAuthSession } from "@/server/auth";
import { NextPage } from "next";
import { Session } from "next-auth";
import Navbar from "@/components/Navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  const form = useForm();

  return (
    <SessionProvider>
      <FormProvider {...form}>
        <Navbar />
        <Component {...pageProps} />
      </FormProvider>
    </SessionProvider>
  );
};
export default trpc.withTRPC(MyApp);

export function mySession() {}
