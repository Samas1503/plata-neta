import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@plata-neta/db";
import { verifyPassword } from "@/lib/password";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !verifyPassword(password, user.passwordHash)) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          tenantId: user.tenantId,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.tenantId = user.tenantId;
        token.role = user.role;
      }
      // AUTH-4: role/tenant frescos cada request — un demotion revoca acceso
      // en el próximo llamado en vez de esperar la expiración del JWT.
      if (token.sub) {
        const row = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { role: true, tenantId: true },
        });
        if (row) {
          token.role = row.role;
          token.tenantId = row.tenantId;
        }
      }
      return token;
    },
    session({ session, token }) {
      session.user.tenantId = token.tenantId as string;
      session.user.role = token.role as typeof session.user.role;
      // AUTH-1: @auth/core no puebla user.id con JWT — viene en token.sub.
      if (token.sub) session.user.id = token.sub;
      return session;
    },
  },
});
