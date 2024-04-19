import { prisma } from "@/pages/api/db";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { userSchema } from "@/types/user";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);

export const userRouter = createTRPCRouter({
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }),

  createUser: publicProcedure
    .input(userSchema)
    .mutation(async ({ input, ctx }) => {
      const hashedPass = bcrypt.hashSync(input.password, salt);
      const profilePic = async () => {
        const picsArr = await prisma.heroImages.findMany();
        const num = Math.floor(Math.random() * 10);
        return picsArr[num].url;
      };

      const newUserPayload = {
        userName: input.userName,
        email: input.email,
        password: hashedPass,
        // pic: "https://storage.googleapis.com/hero-items/heroImgs/death.jpg",
        pic: await profilePic(),
      };

      // const newUser = await ctx.prisma.user.create({
      //   data: {
      //     userName: input.userName,
      //     email: input.email,
      //     password: hashedPass,
      //     pic: await profilePic(),
      //   },
      // });

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
        message: "couldn't find",
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
});
