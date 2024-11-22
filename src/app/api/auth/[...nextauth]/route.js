import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/utils/auth";
import { prisma } from "@/libs/prima";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Usuario no encontrado");
        }

        const isPasswordValid = await verifyPassword(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Contraseña incorrecta");
        }

        return { id: user.id, email: user.email };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
