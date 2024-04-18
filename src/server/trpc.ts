import { prisma } from "@/pages/api/db";
import { TRPCError, initTRPC } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session } from "next-auth";
import { getServerAuthSession } from "./auth";

interface CreateContextOptions {
  session: Session | null;
}

const createTRPCInnerContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  const session = await getServerAuthSession({ req, res });

  return createTRPCInnerContext({
    session,
  });
};

export type CreateContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<CreateContext>().create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in" });
  }

  const user = await ctx.prisma.user.findUnique({
    where: { id: ctx.session.user.id || undefined },
  });

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "user not found" });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
