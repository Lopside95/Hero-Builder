import { prisma } from "@/pages/api/db";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { deleteUserSchema, userSchema } from "@/types/user";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";

const salt = bcrypt.genSaltSync(10);

// }

export const getUser = async (userId: string, prisma: PrismaClient) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
};

export const getHeroesByUser = async (userId: string, prisma: PrismaClient) => {
  const heroes = await prisma.finalHero.findMany({
    where: {
      userId: userId,
    },
  });

  return heroes;
};

export const userRouter = createTRPCRouter({
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }),

  createUser: publicProcedure
    .input(userSchema)
    .mutation(async ({ input, ctx }) => {
      const hashedPass = bcrypt.hashSync(input.password, salt);

      // automatically assigns users a profile picture when they sign up
      // Potential for being able to upload/ choose a new profile pic after sign up if they want to
      const profilePic = async () => {
        const picsArr = await prisma.heroImages.findMany();
        const num = Math.floor(Math.random() * 10);
        return picsArr[num].url;
      };

      const newUserPayload = {
        userName: input.userName,
        email: input.email,
        password: hashedPass,
        pic: await profilePic(),
      };

      try {
        await ctx.prisma.user.create({
          data: newUserPayload,
        });
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",

            message: error.message,
          });
        }
      }
    }),

  updateUser: protectedProcedure
    .input(userSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session?.user.id,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "couldn't find user",
        });
      }

      const samePass = bcrypt.compareSync(input.password, user!?.password);

      const updatedUser = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          userName: input.userName,
          email: input.email,
          password: input.password,
          pic: input.pic,
        },
      });

      return updatedUser;
    }),
  getUserById: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session?.user.id,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "couldn't find user",
      });
    }

    return user;
  }),

  getHeroesByUser: protectedProcedure.query(async ({ ctx }) => {
    const finalHeroes = await ctx.prisma.finalHero.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return finalHeroes;
  }),
  deleteUserHeroes: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // const userHeroes = getHeroesByUser(ctx.session.user.id, prisma)

      const deletedHeroes = await prisma.finalHero.deleteMany({
        where: {
          userId: ctx.session.user.id,
        },
      });

      return deletedHeroes;
    }),
  deleteAccount: protectedProcedure
    .input(deleteUserSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You need to have an account to delete it",
        });
      }

      const validPass = bcrypt.compareSync(input.password, user.password);

      if (!validPass) {
        console.log("wrong pasword");
      }

      try {
        await prisma.finalHero.deleteMany({
          where: {
            userId: user.id,
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        await prisma.user.delete({
          where: { id: user.id },
        });
      }
    }),
  // updateUser: protectedProcedure.input(userSchema).mutation(async ({ctx, input}) => {
  //   const user = getUser(ctx.session.user.id, prisma)

  // })
});
