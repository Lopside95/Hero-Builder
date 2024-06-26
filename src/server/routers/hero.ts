import { createTRPCRouter, protectedProcedure } from "../trpc";
import { prisma } from "@/pages/api/db";
import { finalHeroSchema } from "@/types/hero";

export const heroRouter = createTRPCRouter({
  createFinalHero: protectedProcedure
    .input(finalHeroSchema)
    .mutation(async ({ ctx, input }) => {
      const finalHero = await prisma.finalHero.create({
        data: {
          details: {
            name: input.details.name,
            speed: input.details.speed,
            damage: input.details.damage,
            story: input.details.story,
            img: input.details.img,
          },
          boots: {
            name: input.boots.name,
            img: input.boots.img,
            speed: input.boots.speed,
            bonus: input.boots.bonus,
            description: input.boots.description,
            cost: input.boots.cost,
          },
          weapon: {
            name: input.weapon.name,
            img: input.weapon.img,
            damage: input.weapon.damage,
            bonus: input.weapon.bonus,
            description: input.weapon.description,
            cost: input.weapon.cost,
          },
          gold: input.gold,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return finalHero;
    }),
});
