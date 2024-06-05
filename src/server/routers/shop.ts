import { publicProcedure, createTRPCRouter } from "../trpc";
import { prisma } from "@/pages/api/db";
import { bootsSchema } from "@/types/hero";

export const shopRouter = createTRPCRouter({
  getAllWeapons: publicProcedure.query(async () => {
    const allWeapons = await prisma.weapon.findMany();
    return allWeapons;
  }),
  getAllBoots: publicProcedure.query(async () => {
    const allBoots = await prisma.boots.findMany();
    return allBoots;
  }),
  getAllHeroPics: publicProcedure.query(async () => {
    return await prisma.heroImages.findMany();
  }),
  getAllItems: publicProcedure.query(async () => {
    const allBoots = await prisma.boots.findMany();
    const allWeapons = await prisma.weapon.findMany();
    return {
      boots: allBoots,
      weapons: allWeapons,
    };
  }),
  // getFirstItems not currenlty in use
  getFirstItems: publicProcedure.query(async () => {
    const firstBoots = await prisma.boots.findFirst();
    const firstWeapons = await prisma.weapon.findFirst();
    const firstImages = await prisma.heroImages.findFirst();
    return {
      boots: firstBoots,
      weapons: firstWeapons,
      images: firstImages,
    };
  }),
  createNewBoots: publicProcedure // For possible future use, where users can create their own boots/weapons etc.
    // This would also help to make the gold relevant / have it make sense
    .input(bootsSchema)
    .mutation(async ({ input }) => {
      const newBoots = await prisma.boots.create({
        data: {
          name: input.name,
          speed: input.speed,
          bonus: input.bonus,
          description: input.description,
          cost: input.cost,
          img: input.img,
        },
      });
      return newBoots;
    }),
});
