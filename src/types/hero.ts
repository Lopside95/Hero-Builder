import z from "zod";

// zod schemas for heroes

export const detailsSchema = z.object({
  name: z.string().min(2, "You need a name").max(25),
  speed: z.number(),
  damage: z.number(),
  story: z.string(),
  img: z.string(),
});
export const bootsSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "You need to select boots"),
  speed: z.number(),
  bonus: z.string(),
  description: z.string(),
  cost: z.number(),
  img: z.string(),
});

export const weaponSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "You need to select a weapon"),
  damage: z.number(),
  bonus: z.string(),
  description: z.string(),
  cost: z.number(),
  img: z.string(),
});

export const finalHeroSchema = z.object({
  details: detailsSchema,
  boots: bootsSchema,
  weapon: weaponSchema,
  gold: z.number(),
});

export type FinalHeroSchema = z.infer<typeof finalHeroSchema>;
export type Boots = z.infer<typeof bootsSchema>;
export type Weapon = z.infer<typeof weaponSchema>;
export type Details = z.infer<typeof detailsSchema>;
