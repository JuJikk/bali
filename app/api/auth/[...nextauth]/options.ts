import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("https://api.bali321.com/api/v1/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          return {
            id: user.email,
            token: user.token,
          };
        }
        return null;
      },
    }),
    CredentialsProvider({
      id: "custom-google-log-in",
      type: "credentials",
      name: "GoogleLogIn",
      credentials: {
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials) {
        const res = await fetch("https://api.bali321.com/api/v1/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: credentials?.code,
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          return {
            id: user.email,
            token: user.token,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/log-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_NAME,
};
