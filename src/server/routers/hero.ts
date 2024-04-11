import { z } from "zod";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { userSchema } from "@/types/user";
import { prisma } from "@/pages/api/db";
import {
  bootsSchema,
  exampleHeroSchema,
  finalHeroSchema,
  heroDetails,
} from "@/types/hero";
import { simpleHeroSchema } from "@/pages/updateUser";
import { connect } from "http2";
import { create } from "domain";

export const heroRouter = createTRPCRouter({
  getAllHeroes: publicProcedure.query(async () => {
    const allHeroes = await prisma.exampleHero.findMany();
    return allHeroes;
  }),

  getExample: protectedProcedure.query(async ({ ctx }) => {
    const example = await ctx.prisma.exampleHero.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return example;
  }),

  newExampleHero: protectedProcedure
    .input(exampleHeroSchema)
    .mutation(async ({ ctx, input }) => {
      const newHero = await ctx.prisma.exampleHero.create({
        data: {
          name: input.name,
          bootsImg: input.bootsImg,
          damage: input.damage,
          speed: input.speed,
          weaponImg: input.weaponImg,
          img: input.img,

          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return newHero;
    }),
});
