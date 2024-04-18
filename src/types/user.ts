import { z } from "zod";

export const userSchema = z
  .object({
    userName: z.string().min(1, "Required"),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .transform((val) => val.toLowerCase()),
    // email: z.string().min(1, "Required").email(),
    password: z.string().min(1, "Required"),
    repeatPassword: z.string().min(1, "Required"),
    pic: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"],
  });

export const loginSchema = z.object({
  email: z.string().min(1, "Need email"),
  password: z.string().min(1, "need password"),
});
export type User = z.infer<typeof userSchema>;

export type Login = z.infer<typeof loginSchema>;

// import { ThemeMode } from "@prisma/client";
// import { z } from "zod";
// import { Languages } from "~/Constants/enums";

// const passwordRegex = z
//   .string()
//   .regex(
//     /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
//     "Invalid password",
//   )
//   .min(8, "Password must be at least 8 characters")
//   .max(32, "Password must be at most 32 characters")
//   .optional();

// export const userSettingsSchema = z
//   .object({
//     firstName: z
//       .string()
//       .min(1)
//       .max(25)
//       .transform((val) => val.at(0)?.toUpperCase() + val.slice(1))
//       .optional(),
//     lastName: z
//       .string()
//       .min(1)
//       .max(25)
//       .transform((val) => val.at(0)?.toUpperCase() + val.slice(1))
//       .optional(),
//     email: z
//       .string()
//       .email({ message: "Invalid email address" })
//       .transform((val) => val.toLowerCase())
//       .optional(),
//     device: z.string().optional(),

//     password: passwordRegex,
//     newPassword: passwordRegex,
//     repeatNewPassword: passwordRegex,
//     language: z.string().optional(),
//     rememberMe: z.boolean().optional(),
//     themeMode: z.nativeEnum(ThemeMode).optional(),
//   })
// .refine((data) => data.newPassword === data.repeatNewPassword, {
//   message: "Passwords must match",
//   path: ["repeatNewPassword"],
// });
