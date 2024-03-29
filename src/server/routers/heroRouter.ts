import { z } from "zod";
import { procedure, router } from "../trpc";
import { userSchema } from "@/types/user";
import { prisma } from "@/pages/api/db";
import { heroSchema } from "@/types/hero";

// export const heroSchema = z.object({
//     name: z.string(),
//     damage: z.number(),
//     speed: z.number(),
//     img: z.string(),
//     bootsImg: z.string(),
//     weaponImg: z.string(),
//   });

export const heroRouter = router({
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
});
