import { prisma } from "@/pages/api/db";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { userSchema } from "@/types/user";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx }) => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }),

  createUser: publicProcedure
    .input(userSchema)
    .mutation(async ({ input, ctx }) => {
      const newUser = await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          pic: input.pic,
        },
      });
      return newUser;
    }),

  userByEmail: publicProcedure
    .input(userSchema)
    .query(async ({ input, ctx }) => {
      const currentUser = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session?.user.email,
        },
      });

      return currentUser;
      // const foundUser = await prisma.user.findUnique({
      //   where: {
      //     email: input.email,
      //   },
      // });
    }),

  updateUser: protectedProcedure
    .input(userSchema)
    .mutation(async ({ ctx, input }) => {
      // const user = await ctx.prisma.user.findUnique({
      //   where: {
      //     id: ctx.session.user.id,
      //   },
      // });

      const updatedUser = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          name: input.name,
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

    console.log("userInRouter", user);
    return user;
  }),

  // getUserByEmail: publicProcedure
  //   .input(z.object({ email: z.string().email() }))
  //   .mutation(async ({ ctx, input }) => {
  //     if (!input.email) {
  //       throw new TRPCError({
  //         code: "BAD_REQUEST",
  //         message: "Invalid email",
  //       });
  //     }

  //     const existingUser = await ctx.prisma.user.findUnique({
  //       where: {
  //         email: input.email,
  //       },
  //     });

  //     if (existingUser) {
  //       throw new TRPCError({
  //         code: "BAD_REQUEST",
  //         message: "User already exists",
  //       });
  //     }

  //     return true;
  //   }),
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
