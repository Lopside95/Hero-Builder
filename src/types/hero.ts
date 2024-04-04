import z from "zod";

export const heroSchema = z.object({
  name: z.string(),
  damage: z.string(),
  speed: z.string(),
  img: z.string(),
  bootsImg: z.string(),
  weaponImg: z.string(),
});

export type Hero = z.infer<typeof heroSchema>;

// export const boots = z.object({
//   id: z.string(),
//   // name: z.string().min(1, "You need boots"),
//   name: z.string().min(1, "You need to select boots"),
//   moveSpeed: z.number(),
//   // bonus: z.string(),
//   description: z.string(),
//   cost: z.number(),
//   url: z.string(),
// });

// export const weapon = z.object({
//   id: z.string(),
//   // name: z.string().min(1, "You need a weapon"),
//   name: z.string().min(1, "You need to select a weapon"),
//   damage: z.number(),
//   // bonus: z.string(),
//   description: z.string(),
//   cost: z.number(),
//   url: z.string(),
// });

// export const picsSchema = z.object({
//   name: z.string().min(1, "You need a profile pic"),
//   url: z.string(),
// });

// const heroDetails = z.object({
//   totalMS: z.number(),
//   totalDmg: z.number(),
//   backstory: z.string(),
//   // name: z.string(),
//   name: z.string().min(2, "You need a name").max(25),
//   url: picsSchema,
//   id: z.string(),
// });

// export const finalHeroSchema = z.object({
//   weapon: weapon,
//   boots: boots,

//   details: heroDetails,
//   gold: z.number(),
//   // gold: z.number().refine((val) => val === 0, {
//   //   message: "You still have gold",
//   // }),
// });

// export const testHero = z.object({
//   name: z.string(),
//   boots: z.string(),
//   weapon: z.string(),
// });

// export type HeroPics = z.infer<typeof picsSchema>;
// export type HeroDetails = z.infer<typeof heroDetails>;
// export type Boots = z.infer<typeof boots>;
// export type Weapon = z.infer<typeof weapon>;

// export type TestHero = z.infer<typeof testHero>;
