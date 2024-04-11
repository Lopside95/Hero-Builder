import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { userSchema } from "@/types/user";
import { prisma } from "@/pages/api/db";
import { bootsSchema, finalHeroSchema, heroDetails } from "@/types/hero";

export const shopRouter = createTRPCRouter({
  getAllWeapons: publicProcedure.query(async () => {
    const allWeapons = await prisma.weapon.findMany();
    return allWeapons;
  }),
  getAllItems: publicProcedure.query(async () => {
    const allBoots = await prisma.boots.findMany();
    const allWeapons = await prisma.weapon.findMany();
    return {
      boots: allBoots,
      weapons: allWeapons,
    };
  }),
  getAllBoots: publicProcedure.query(async ({ ctx }) => {
    const allBoots = await ctx.prisma.boots.findMany();
    return allBoots;
  }),
  createNewBoots: publicProcedure
    .input(bootsSchema)
    .mutation(async ({ input, ctx }) => {
      const newBoots = await prisma.boots.create({
        data: {
          name: input.name,
          moveSpeed: input.moveSpeed as number,
          bonus: input.bonus,
          description: input.description,
          cost: input.cost,
          url: input.url,
        },
      });
      return newBoots;
    }),
});
