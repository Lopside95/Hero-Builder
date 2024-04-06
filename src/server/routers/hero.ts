import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";
import { userSchema } from "@/types/user";
import { prisma } from "@/pages/api/db";
import { exampleHeroSchema, finalHeroSchema, heroDetails } from "@/types/hero";
import { simpleHeroSchema } from "@/pages/hero";

// export const heroSchema = z.object({
//   name: z.string(),
//   damage: z.string(),
//   speed: z.string(),
//   img: z.string(),
//   bootsImg: z.string(),
//   weaponImg: z.string(),
// });

// model SimpleHero {
//   id     String @id @default(auto()) @map("_id") @db.ObjectId
//   name   String
//   boots  String
//   weapon String
// }

export const heroRouter = createTRPCRouter({
  getAllHeroes: publicProcedure.query(async () => {
    const allHeroes = await prisma.exampleHero.findMany();
    return allHeroes;
  }),

  createSimpleHero: publicProcedure
    .input(simpleHeroSchema)
    .mutation(async ({ input, ctx }) => {
      const userName = ctx.session?.user?.name;
      const newSimple = await prisma.simpleHero.create({
        data: {
          name: input.name,
          boots: input.boots,
          weapon: input.weapon,
          user: {
            connect: {
              name: input.user,
              id: input.user,
              // id: ctx.session?.user.
            },
          },
        },
      });
      return newSimple;
    }),

  // createNewHero: publicProcedure
  //   .input(exampleHeroSchema)
  //   .mutation(async ({ input }) => {
  //     const newExample = await prisma.exampleHero.create({
  //       data: {
  //         exampleHero : {
  //               create: {
  //                 name: input.name,
  //                 damage: input.damage,
  //                 speed: input.speed,
  //                 img: input.img,
  //                 bootsImg: input.bootsImg,
  //                 weaponImg: input.weaponImg,

  //               }
  //         }
  //       },
  //     });
  //     return newExample;
  //   }),

  // newHeroDetails: publicProcedure.input(heroDetails).mutation(async ({ input }) => {
  //   const newDetails = await prisma.heroDetails.create({
  //     data: {
  //       name: input.name,
  //       totalMS: input.totalMS,
  //       totalDmg: input.totalDmg,
  //       profilePic: input.profilePic,
  //     },
  //   });
  // }),
  getHeroDetails: publicProcedure.query(async () => {
    const firstDetails = await prisma.heroDetails.findFirst();
    return firstDetails;
  }),
  getAllBoots: publicProcedure.query(async () => {
    const allBoots = await prisma.boots.findMany();
    return allBoots;
  }),
  // createFinalHero: publicProcedure
  //   .input(finalHeroSchema)
  //   .mutation(async ({ input }) => {
  //     const bootsPayload = {
  //       name: input.boots.name,
  //       moveSpeed: input.boots.moveSpeed,
  //       bonus: input.boots.bonus,
  //       description: input.boots.description,
  //       cost: input.boots.cost,
  //       url: input.boots.url,
  //     };

  //     // const weaponPayload

  //     const newFinalHero = await prisma.finalHero.create({
  //       data: {
  //         boots: {
  //           create: bootsPayload,
  //         },
  //         weapon: {
  //           create: input.weapon,
  //         },
  //         details: {
  //           create: {
  //             ...input.details,
  //             totalDmg: input.details.totalDmg,
  //             totalMS: input.details.totalMS,
  //           },
  //         },
  //         email: {
  //           create: input.email,
  //         },
  //         // user: {
  //         //   connect: {
  //         //     email: input.email,
  //         //   },
  //         // },
  //         // user: {
  //         //   connect: {
  //         //     name: input.user.name,
  //         //     email: input.user.email,
  //         //     pic: input.user.pic,
  //         //   },
  //         // },
  //       },
  //     });
  //     return newFinalHero;
  //   }),
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