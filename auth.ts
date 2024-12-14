import { db } from "@/db/config";
// import { schema } from "@/db/schema";
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    allowDangerousEmailAccountLinking: true,
  })],
  adapter: DrizzleAdapter(db),
  logger: {
    debug: console.log,
  },
  events: {
    createUser: async (message) => {
      console.log("createUser", message)
    },

  },
  session: { strategy: "database" },
  callbacks: {
    // async session({ session, token }) {
    //   console.log("session", session)
    //   console.log("token", token)
    //   if (session.user) {
    //     session.user.id = token.sub!
    //   }
    //   return session
    // },
    async jwt({ token, user, account }) {
      console.log("token", token)
      console.log("user", user)
      console.log("account", account)
      if (user) {
        token.id = user.id
      }
      return token
    },
    async signIn({ user, account }) {
      if (!user.email) {
        return false
      }
      
      try {
        const existingUser = await db.select()
          .from(schema.users)
          .where(eq(schema.users.email, user.email))

        if (existingUser.length > 0) {
          return true
        }

        await db.insert(schema.users).values({
          email: user.email,
          name: user.name,
          image: user.image,
          emailVerified: new Date(),
        })

        return true
      } catch (error) {
        console.error("Error in signIn callback:", error)
        return false
      }
    }

  },
})