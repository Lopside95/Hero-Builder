import { prisma } from "@/pages/api/db";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { userSchema } from "@/types/user";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  findAll: publicProcedure.query(async () => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }),

  createUser: publicProcedure.input(userSchema).mutation(async ({ input }) => {
    const newUser = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        pic: input.pic,
      },
    });

    return newUser;
  }),
  findUserByEmail: publicProcedure
    .input(userSchema)
    .query(async ({ input }) => {
      const foundUser = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
    }),
  findHeroesByUser: publicProcedure
    .input(userSchema)
    .query(async ({ input }) => {
      // const userEmail = await prisma.user.findUnique({
      //   where: {
      //     email: input.email
      //   }

      // })
      const userHeroes = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
        include: {
          FinalHero: true,
        },
      });
      return userHeroes;
    }),
  // findUserHeroes: publicProcedure.input(userSchema).query(async () => {
  //   const userEmail = await prisma.user.findUnique({
  //     where: {
  //       email: input.email,
  //     }
  //   })

  // })
});
