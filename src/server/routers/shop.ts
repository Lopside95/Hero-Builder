import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { userSchema } from "@/types/user";
import { prisma } from "@/pages/api/db";
import { finalHeroSchema, heroDetails } from "@/types/hero";

export const shopRouter = createTRPCRouter({
  getAllBoots: publicProcedure.query(async () => {
    const allBoots = await prisma.boots.findMany();
    return allBoots;
  }),
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
  getNewBoots: publicProcedure.query(async ({ ctx }) => {
    const newAll = await ctx.prisma.boots.findMany();
    return newAll;
  }),
  // getBootsById: publicProcedure.query(async ({input})=> {
  //   const theBoots = await prisma.boots.findUnique({
  //     where: {
  //       id: input.boots.id
  //     }
  //   })
  // })
});
// import { z } from "zod";
// import { publicProcedure, router } from "../trpc";
// import { userSchema } from "@/types/user";
// import { prisma } from "@/pages/api/db";
// // import { heroSchema } from "@/types/hero";

// export const heroSchema = z.object({
//   name: z.string(),
//   damage: z.string(),
//   speed: z.string(),
//   img: z.string(),
//   bootsImg: z.string(),
//   weaponImg: z.string(),
// });

// export const heroRouter = router({
//   createNewHero: publicProcedure.input(heroSchema).mutation(async ({ input }) => {
//     const newHero = await prisma.hero.create({
//       data: {
//         name: input.name,
//         damage: input.damage,
//         speed: input.speed,
//         img: input.img,
//         bootsImg: input.bootsImg,
//         weaponImg: input.weaponImg,
//       },
//     });
//     return newHero;
//   }),
// });
