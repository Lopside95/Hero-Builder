import { SignalZero } from "lucide-react";
import { z } from "zod";

export const userSchema = z.object({
  userName: z.string(),
  email: z.string(),
  password: z.string(),
  pic: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Need email"),
  password: z.string().min(1, "need password"),
});
export type User = z.infer<typeof userSchema>;

export type Login = z.infer<typeof loginSchema>;
