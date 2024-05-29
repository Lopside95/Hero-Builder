import { z } from "zod";

// zod schema for users

export const passwordRegex = z
  .string()
  .regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{5,}$/,
    "Invalid password"
  )
  .min(5, "Must be at least 5 characters")
  .optional();

export const userSchema = z
  .object({
    userName: z.string().min(1, "Required"),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .transform((val) => val.toLowerCase()),
    password: passwordRegex,
    repeatPassword: passwordRegex,
    pic: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"],
  });

export const updateUserSchema = z.object({
  userName: z.string().optional(),
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .transform((val) => val.toLowerCase())
    .optional(),
  password: passwordRegex,
});

export const deleteUserSchema = z.object({
  password: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type User = z.infer<typeof userSchema>;

export type Login = z.infer<typeof loginSchema>;
