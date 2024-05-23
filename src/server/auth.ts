import { prisma } from "@/pages/api/db";
import { loginSchema, userSchema } from "@/types/user";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultUser,
  type NextAuthOptions,
} from "next-auth";
import { type DefaultJWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
// Handles login and session

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    userName: string;
    email: string;
    password: string;
  }

  interface Session {
    user: {
      id: string;
      userName: string;
      email: string;
      password: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      id: string;
      userName: string;
      email: string;
      password: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {},

      async authorize(credentials) {
        try {
          const validUser = await loginSchema.parseAsync(credentials);

          const user = await prisma.user.findUnique({
            where: {
              email: validUser.email,
            },
          });

          if (!user) return null;

          const validPass = bcrypt.compareSync(
            validUser.password,
            user.password
          );

          if (!validPass) return null;
          console.log("FAILED PASS CHECK");

          // TODO: issue with compareSync and checking passwords

          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token, trigger }) {
      return {
        ...session,
        user: {
          id: token.user.id,
          userName: token.user.userName,
          email: token.user.email,
          password: token.user.password,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 2592000,
    updateAge: 86400,
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    newUser: "/signup",
    error: "/",
  },
};

export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return null;
  return session;
};
