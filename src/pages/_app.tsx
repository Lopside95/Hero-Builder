import { AppType } from "next/app";
import "../styles/globals.css";
import { trpc } from "@/utils/trpc";
import { FormProvider, useForm } from "react-hook-form";
import { SessionProvider, getSession, useSession } from "next-auth/react";
import { authOptions, getServerAuthSession } from "@/server/auth";
import { NextPage } from "next";
import { Session } from "next-auth";

const MyApp: AppType = ({ Component, pageProps }) => {
  const form = useForm();

  // const session = getServerAuthSession()

  // const { data: session, status } = useSession();

  return (
    <SessionProvider>
      <FormProvider {...form}>
        <Component {...pageProps} />
      </FormProvider>
    </SessionProvider>
  );
};
export default trpc.withTRPC(MyApp);

export function mySession() {}
// interface AppWithSession {
//   Component: AppType;
//   session: Session | null;
// }

// type AppWithSession = AppType & {
//   Component: AppType;
//   session: Session | null;
// }

// import "@/styles/globals.css";
// import type { AppProps } from "next/app";

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }
