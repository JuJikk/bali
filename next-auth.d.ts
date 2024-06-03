import NextAuth from "next-auth";
import "next-auth/jwt";
import "next-auth/react";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface User {
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
