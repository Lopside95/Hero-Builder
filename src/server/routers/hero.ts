import { z } from "zod";
import { procedure, router } from "../trpc";
import { userSchema } from "@/types/user";
import { prisma } from "@/pages/api/db";
import { finalHeroSchema, heroDetails } from "@/types/hero";

export const heroSchema = z.object({
  name: z.string(),
  damage: z.string(),
  speed: z.string(),
  img: z.string(),
  bootsImg: z.string(),
  weaponImg: z.string(),
});

export const heroRouter = router({
  getAllHeroes: procedure.query(async () => {
    const allHeroes = await prisma.hero.findMany();
    return allHeroes;
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

  // export const heroDetails = z.object({
  //   totalMS: z.number(),
  //   totalDmg: z.number(),
  //   profilePic: z.string(),
  //   name: z.string().min(2, "You need a name").max(25),

  // });

  newHeroDetails: procedure.input(heroDetails).mutation(async ({ input }) => {
    const newDetails = await prisma.heroDetails.create({
      data: {
        name: input.name,
        totalMS: input.totalMS,
        totalDmg: input.totalDmg,
        profilePic: input.profilePic,
      },
    });
  }),
  getHeroDetails: procedure.query(async () => {
    const firstDetails = await prisma.heroDetails.findFirst();
    return firstDetails;
  }),
});
// import { z } from "zod";
// import { procedure, router } from "../trpc";
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
//   createNewHero: procedure.input(heroSchema).mutation(async ({ input }) => {
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
