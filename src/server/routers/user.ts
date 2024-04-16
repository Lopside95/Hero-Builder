import { prisma } from "@/pages/api/db";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { userSchema } from "@/types/user";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);

export const userRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx }) => {
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

      const newUser = await ctx.prisma.user.create({
        data: {
          userName: input.userName,
          email: input.email,
          password: hashedPass,
          pic: await profilePic(),
        },
      });
      return newUser;
    }),

  updateUser: protectedProcedure
    .input(userSchema)
    .mutation(async ({ ctx, input }) => {
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

  getUserByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.email) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid email",
        });
      }

      const existingUser = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exists",
        });
      }

      return true;
    }),
});
