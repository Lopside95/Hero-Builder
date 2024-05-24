import { z } from "zod";

// zod schema for users

export const userSchema = z
  .object({
    userName: z.string().min(1, "Required"),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .transform((val) => val.toLowerCase()),
    password: z.string().min(1, "Required"),
    repeatPassword: z.string().min(1, "Required"),
    pic: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"],
  });

export const deleteUserSchema = z.object({
  password: z.string().min(1, "Required"),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
export type User = z.infer<typeof userSchema>;

export type Login = z.infer<typeof loginSchema>;
