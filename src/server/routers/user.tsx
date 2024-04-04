import { z } from "zod";
import { procedure, router } from "../trpc";
import { userSchema } from "@/types/user";
import { prisma } from "@/pages/api/db";
import { heroSchema } from "@/types/hero";

export const appRouter = router({
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

  createNewHero: procedure.input(heroSchema).mutation(async ({ input }) => {
    const newHero = await prisma.hero.create({
      data: {
        name: input.name,
        damage: input.damage,
        speed: input.speed,
        img: input.img,
        bootsImg: input.bootsImg,
        weaponImg: input.weaponImg,
      },
    });
    return newHero;
  }),

  getAllHeroes: procedure.query(async () => {
    const allHeroes = await prisma.hero.findMany();
    return allHeroes;
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
