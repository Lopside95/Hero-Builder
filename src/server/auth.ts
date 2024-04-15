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
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: DefaultSession["user"] & {
//       id: string;
//       companyId: string;
//       // ...other properties
//       // role: UserRole;
//     };
//   }

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
    // expires: ISODateString;
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

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},

      //eslint-disable-next-lin
      async authorize(credentials) {
        try {
          const validUser = await loginSchema.parseAsync(credentials);

          const user = await prisma.user.findUnique({
            where: {
              email: validUser.email,
            },
          });

          if (!user) return null;

          console.log("IM ONLY CALLED when SIGN-IN");
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    //eslint-disable-next-line
    async jwt({ token, user, trigger }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    //eslint-disable-next-line
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.user.id,
          // name: token.user.name,
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
    signIn: "/login",
    newUser: "/signup",
    error: "/",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    console.log("no session");
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  // console.log("themeMode in auth server/auth", user?.themeMode);

  if (!user) return null;
  return session;
};
