import { AppType } from "next/app";
import "../styles/globals.css";
import { trpc } from "@/utils/trpc";
import { FormProvider, useForm } from "react-hook-form";

const MyApp: AppType = ({ Component, pageProps }) => {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <Component {...pageProps} />
    </FormProvider>
  );
};
export default trpc.withTRPC(MyApp);

// import "@/styles/globals.css";
// import type { AppProps } from "next/app";

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }
