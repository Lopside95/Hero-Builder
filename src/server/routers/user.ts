import { prisma } from "@/pages/api/db";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { userSchema } from "@/types/user";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { finalHeroSchema } from "@/types/hero";
import { connect } from "http2";

export const userRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx }) => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }),
  getHeroesByUserId: protectedProcedure.query(async ({ ctx }) => {
    const userHeroes = await prisma.finalHero.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return userHeroes;
  }),

  createUser: publicProcedure
    .input(userSchema)
    .mutation(async ({ input, ctx }) => {
      const newUser = await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          pic: input.pic,
        },
      });
      return newUser;
    }),

  userByEmail: publicProcedure
    .input(userSchema)
    .query(async ({ input, ctx }) => {
      const currentUser = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session?.user.email,
        },
      });

      return currentUser;
      // const foundUser = await prisma.user.findUnique({
      //   where: {
      //     email: input.email,
      //   },
      // });
    }),

  updateUser: protectedProcedure
    .input(userSchema)
    .mutation(async ({ ctx, input }) => {
      // const user = await ctx.prisma.user.findUnique({
      //   where: {
      //     id: ctx.session.user.id,
      //   },
      // });

      const updatedUser = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          pic: input.pic,
        },
      });

      return updatedUser;
    }),

  getUserById: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session?.user.id,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "couldn't find",
      });
    }

    console.log("userInRouter", user);
    return user;
  }),
  getFinalHeroByUserId: protectedProcedure.query(async ({ ctx }) => {
    const userHero = await ctx.prisma.finalHero.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return userHero;
  }),
  getUserByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.email) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid email",
        });
      }

      const existingUser = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exists",
        });
      }

      return true;
    }),
  // createFinalHero: protectedProcedure
  //   .input(finalHeroSchema)
  //   .mutation(async ({ ctx, input }) => {
  //     const userId = ctx.session.user.id;
  //     const weaponId = prisma.boots.findUnique({
  //       where: {

  //       }
  //     })
  // const bootsId = await ctx.prisma.boots.findUnique({
  //   where: {
  //     id: input.boots.bootsId,
  //   },
  // });
  // const weaponId = await ctx.prisma.weapon.findUnique({
  //   where: {
  //     id: input.weapon.weaponId,
  //   },
  // // });
  // const newFinalHero = await prisma.finalHero.create({
  //   data: {
  //     details: {
  //       create: {
  //         name: input.details.name,
  //         totalSpeed: input.details.totalSpeed,
  //         totalDamage: input.details.totalDamage,
  //         backstory: input.details.backstory,
  //         profilePic: input.details.profilePic,
  //       }
  //     },
  //     boots: {
  //       connect: {
  //         name: input.boots.name,
  //         bonus: input.boots.bonus,
  //         moveSpeed: input.boots.moveSpeed,
  //         description: input.boots.description,
  //         url: input.boots.url,
  //         cost: input.boots.cost,
  //         id: prisma.boots.findUnique({
  //           where: {
  //             id: input.boots.
  //           }
  //         })
  //       }
  //     }
  //   }
  // })

  // findHeroesByUser: publicProcedure
  //   .input(userSchema)
  //   .query(async ({ input }) => {
  //     // const userEmail = await prisma.user.findUnique({
  //     //   where: {
  //     //     email: input.email
  //     //   }

  //     // })
  //     const userHeroes = await prisma.user.findUnique({
  //       where: {
  //         email: input.email,
  //       },
  //       include: {
  //         FinalHero: true,
  //       },
  //     });
  //     return userHeroes;
  //   }),
  // findUserHeroes: publicProcedure.input(userSchema).query(async () => {
  //   const userEmail = await prisma.user.findUnique({
  //     where: {
  //       email: input.email,
  //     }
  //   })

  // })
});
// const newFinalHero = await prisma.finalHero.create({
//   data: {
//     details: {
//       create: {
// name: input.details.1
//       },
//     },
//     boots: {
//       connect: {
//         name:
//     weapon: {
//       connect: {
//         id: input.weapon.weaponId,
//       },
//     },
//     user: {
//       connect: {
//         id: ctx.session.user.id,
//       },
//     },
//   },
// });
// return newFinalHero;

// try {
//   return newFinalHero;
// } catch (error) {
//   if (error instanceof TRPCError) {
//     throw new TRPCError({
//       code: "INTERNAL_SERVER_ERROR",
//       message: error.message,
//     });
//   }
// }
// createFinalHero: protectedProcedure
//   .input(finalHeroSchema)
//   .mutation(async ({ ctx, input }) => {
//     const userId = await ctx.prisma.user.findUnique({
//       where: {
//         id: ctx.session.user.id,
//       },
//     });
//     // const bootsId = await ctx.prisma.boots.findUnique({
//     //   where: {
//     //     id: input.boots.bootsId,
//     //   },
//     // });
//     // const weaponId = await ctx.prisma.weapon.findUnique({
//     //   where: {
//     //     id: input.weapon.weaponId,
//     //   },
//     // });
//     const newFinalHero = await prisma.finalHero.create({
//       data: {
//         details: {
//           create: {
//             name: input.details.name,
//             totalSpeed: input.details.totalSpeed,
//             totalDamage: input.details.totalDamage,
//             backstory: input.details.backstory,
//             profilePic: input.details.profilePic,
//           },
//         },
//         boots: {
//           connect: {
//             where: {
//               boots: {
//                 name: input.boots.name,
//               },
//             },
//           },
//         },
//         weapon: {
//           connect: {
//             id: input.weapon.weaponId,
//           },
//         },
//         user: {
//           connect: {
//             id: ctx.session.user.id,
//           },
//         },
//       },
//     });

//     try {
//       return newFinalHero;
//     } catch (error) {
//       if (error instanceof TRPCError) {
//         throw new TRPCError({
//           code: "INTERNAL_SERVER_ERROR",
//           message: error.message,
//         });
//       }
//     }
//   }),

// getUserByEmail: publicProcedure
//   .input(z.object({ email: z.string().email() }))
//   .mutation(async ({ ctx, input }) => {
//     if (!input.email) {
//       throw new TRPCError({
//         code: "BAD_REQUEST",
//         message: "Invalid email",
//       });
//     }

//     const existingUser = await ctx.prisma.user.findUnique({
//       where: {
//         email: input.email,
//       },
//     });

//     if (existingUser) {
//       throw new TRPCError({
//         code: "BAD_REQUEST",
//         message: "User already exists",
//       });
//     }

//     return true;
//   }),
