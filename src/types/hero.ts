import z, { TypeOf } from "zod";
import { userSchema } from "./user";

export const bootsSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "You need to select boots"),
  moveSpeed: z.number({
    required_error: "speed is required",
    invalid_type_error: "speed must be a number",
  }),
  bonus: z.string(),
  description: z.string(),
  cost: z.number({
    required_error: "Cost is required",
    invalid_type_error: "Cost must be a number",
  }),
  url: z.string(),
});

export const weaponSchema = z.object({
  id: z.string(),

  // weaponId: z.string(),
  // name: z.string().min(1, "You need a weapon"),
  name: z.string().min(1, "You need to select a weapon"),
  damage: z.number(),
  bonus: z.string(),
  description: z.string(),
  cost: z.number(),
  url: z.string(),
});

export const picsSchema = z.object({
  name: z.string().min(1, "You need a profile pic"),
  url: z.string(),
});

export const heroDetails = z.object({
  totalSpeed: z.number(),
  totalDamage: z.number(),
  backstory: z.string(),
  profilePic: z.string(),
  // name: z.string(),
  name: z.string().min(2, "You need a name").max(25),
  // url: picsSchema,
  // id: z.string(),
});

// export const finalHeroSchema = z.object({
//   weapon: weaponSchema,
//   boots: bootsSchema,

//   details: heroDetails,
//   // user: userSchema,
//   gold: z.number(),
//   // gold: z.number().refine((val) => val === 0, {
//   //   message: "You still have gold",
//   // }),
// });

export const testHero = z.object({
  name: z.string(),
  boots: z.string(),
  weapon: z.string(),
});

export const exampleHeroSchema = z.object({
  name: z.string(),
  damage: z.string(),
  speed: z.string(),
  img: z.string(),
  bootsImg: z.string(),
  weaponImg: z.string(),
});

export const finalHeroSchema = z.object({
  name: z.string().min(2, "You need a name").max(25),
  speed: z.number(),
  damage: z.number(),
  backstory: z.string(),
  profilePic: z.string(),
  // name: z.string(),
  boots: bootsSchema,
  weapon: weaponSchema,
  gold: z.number(),
});

// export type FinalHeroPrisma = z.infer<typeof finalHeroPrisma>;
export type FinalHeroSchema = z.infer<typeof finalHeroSchema>;
export type HeroPics = z.infer<typeof picsSchema>;
export type HeroDetails = z.infer<typeof heroDetails>;
export type Boots = z.infer<typeof bootsSchema>;
export type Weapon = z.infer<typeof weaponSchema>;
export type ExampleHeroSchema = z.infer<typeof exampleHeroSchema>;

export type TestHero = z.infer<typeof testHero>;

// import z from "zod";

// export type Hero = z.infer<typeof heroSchema>;

// // export const boots = z.object({
// //   id: z.string(),
// //   // name: z.string().min(1, "You need boots"),
// //   name: z.string().min(1, "You need to select boots"),
// //   moveSpeed: z.number(),
// //   // bonus: z.string(),
// //   description: z.string(),
// //   cost: z.number(),
// //   url: z.string(),
// // });

// // export const weapon = z.object({
// //   id: z.string(),
// //   // name: z.string().min(1, "You need a weapon"),
// //   name: z.string().min(1, "You need to select a weapon"),
// //   damage: z.number(),
// //   // bonus: z.string(),
// //   description: z.string(),
// //   cost: z.number(),
// //   url: z.string(),
// // });

// // export const picsSchema = z.object({
// //   name: z.string().min(1, "You need a profile pic"),
// //   url: z.string(),
// // });

// // const heroDetails = z.object({
// //   totalMS: z.number(),
// //   totalDmg: z.number(),
// //   backstory: z.string(),
// //   // name: z.string(),
// //   name: z.string().min(2, "You need a name").max(25),
// //   url: picsSchema,
// //   id: z.string(),
// // });

// // export const finalHeroSchema = z.object({
// //   weapon: weapon,
// //   boots: boots,

// //   details: heroDetails,
// //   gold: z.number(),
// //   // gold: z.number().refine((val) => val === 0, {
// //   //   message: "You still have gold",
// //   // }),
// // });

// // export const testHero = z.object({
// //   name: z.string(),
// //   boots: z.string(),
// //   weapon: z.string(),
// // });

// // export type HeroPics = z.infer<typeof picsSchema>;
// // export type HeroDetails = z.infer<typeof heroDetails>;
// // export type Boots = z.infer<typeof boots>;
// // export type Weapon = z.infer<typeof weapon>;

// // export type TestHero = z.infer<typeof testHero>;
