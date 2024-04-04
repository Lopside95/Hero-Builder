import { prisma } from "@/pages/api/db";
import { procedure, router } from "../trpc";
import { userSchema } from "@/types/user";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  findAll: procedure.query(async () => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }),

  createUser: procedure.input(userSchema).mutation(async ({ input }) => {
    const newUser = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        pic: input.pic,
      },
    });

    return newUser;
  }),
  findEvery: procedure.query(async () => {
    try {
      const allUsers = await prisma.user.findMany();
      return allUsers;
    } catch (error) {
      console.error("Failed to execute query:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while retrieving users.",
      });
    }
  }),
});
