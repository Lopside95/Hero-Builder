import { router } from "./trpc";
import { heroRouter } from "./routers/hero";
import { userRouter } from "./routers/user";

export const appRouter = router({
  user: userRouter,
  hero: heroRouter,
});
export type AppRouter = typeof appRouter;
