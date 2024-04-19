import { appRouter } from "@/server/root";
import { createTRPCContext } from "@/server/trpc";
import * as trpcNext from "@trpc/server/adapters/next";
import { env } from "process";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
});
