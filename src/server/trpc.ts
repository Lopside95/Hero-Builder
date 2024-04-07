import { prisma } from "@/pages/api/db";
import { TRPCError, initTRPC } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { DefaultSession, ISODateString } from "next-auth";
// import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { type Session } from "next-auth";

// export interface DefaultSession {
//   user?: {
//     name?: string | null
//     email?: string | null
//     image?: string | null
//   }
//   expires: ISODateString
// }

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

  const session = await getSession({ req: opts.req });

  return createTRPCInnerContext({
    session,
  });
};

export type CreateContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<CreateContext>().create();

// const t = initTRPC.create();

// Base router and procedure helpers
export const createTRPCRouter = t.router;
// export const procedure = t.procedure;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in" });
  }

  const user = await ctx.prisma.user.findUnique({
    where: { id: ctx.session.user.id || undefined },
  });

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

// import { prisma } from "@/pages/api/db";
// import { initTRPC } from "@trpc/server";
// import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
// import { Session } from "next-auth";
// import { getSession } from "next-auth/react";

// interface CreateContextOptions {
//   session: Session | null;
// }

// const createTRPCInnerContext = (opts: CreateContextOptions) => {
//   return {
//     session: opts.session,
//     prisma,
//   };
// };

// export const createTRPCContext = async (opts: CreateNextContextOptions) => {
//   const { req, res } = opts;

//   const session = await getSession({ req: opts.req });

//   return createTRPCInnerContext({
//     session,
//   });
// };

// export type Context = Awaited<ReturnType<typeof createTRPCContext>>

// const t = initTRPC.create();

// // Base router and procedure helpers
// export const createTRPCRouter = t.router;
// // export const procedure = t.procedure;
// export const publicProcedure = t.procedure;

// BREAK

// import { initTRPC } from "@trpc/server";

// // Avoid exporting the entire t-object
// // since it's not very descriptive.
// // For instance, the use of a t variable
// // is common in i18n libraries.
// const t = initTRPC.create();

// // Base router and procedure helpers
// export const createTRPCRouter = t.router;
// // export const procedure = t.procedure;
// export const publicProcedure = t.procedure;
