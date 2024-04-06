import { createTRPCRouter } from "./trpc";
import { heroRouter } from "./routers/hero";
import { userRouter } from "./routers/user";
import { shopRouter } from "./routers/shop";

export const appRouter = createTRPCRouter({
  user: userRouter,
  hero: heroRouter,
  shop: shopRouter,
});
export type AppRouter = typeof appRouter;
