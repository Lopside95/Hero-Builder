import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { getServerSession } from "next-auth";
import SessionProvider from "../src/components/SessionProvider";

interface Props {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (session) {
    console.log("Hmm");
  }

  return (
    <html lang="en">
      <body
        className={`flex h-full min-h-screen w-full flex-col  bg-gradient-to-tr from-gray-200 via-slate-200
      to-white
     dark:bg-gradient-radial
     dark:from-zinc-900
     dark:via-gray-950 dark:to-neutral-950
     `}
      >
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
