import { z } from "zod";
import { procedure, router } from "../trpc";
import { userSchema } from "@/types/user";
import { prisma } from "@/pages/api/db";

export const appRouter = router({
  // user: procedure.input(userSchema).query((opts) => {
  //   return {
  //     firstUser: {
  //       name: "Leroy",
  //       email: "Jenkins",
  //       pic: "sdfjsndf",
  //     },
  //   };
  // }),
  findAll: procedure.query(async (opts) => {
    const allUsers = await prisma.user.findMany();
  }),

  createUser: procedure.input(userSchema).mutation(async ({ input }) => {
    const newUser = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        pic: input.pic,
      },
    });
    return newUser;
  }),
});

export type AppRouter = typeof appRouter;

// import { z } from "zod";
// import { procedure, router } from "../trpc";
// import { userSchema } from "@/types/user";
// import { PrismaClient } from "@prisma/client";

// // Initialize Prisma Client
// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
// export const prisma = globalForPrisma.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export const appRouter = router({
//   // Fetch a user example
//   user: procedure.input(userSchema).query(async ({ input }) => {
//     // Use Prisma to fetch the first user
//     return await prisma.user.findFirst();
//   }),

//   // Create a user example
//   createUser: procedure.input(userSchema).mutation(async ({ input }) => {
//     // Use Prisma to create a new user
//     const newUser = await prisma.user.create({
//       data: {
//         name: input.name,
//         email: input.email,
//         pic: input.pic,
//       },
//     });
//     return newUser;
//   }),

//   // Additional procedures can be added here
// });

// export type AppRouter = typeof appRouter;
