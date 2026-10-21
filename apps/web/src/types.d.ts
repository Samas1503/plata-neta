import type { DefaultSession } from "next-auth";
import type { UserRole } from "@plata-neta/db";

declare module "next-auth" {
  interface User {
    tenantId: string;
    role: UserRole;
  }

  interface Session {
    user: {
      tenantId: string;
      role: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    tenantId: string;
    role: UserRole;
  }
}
