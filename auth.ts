import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { db } from "@/db/config";
import * as schema from "@/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    allowDangerousEmailAccountLinking: true,
  })],
  adapter: DrizzleAdapter(db),
  session: { strategy: "database" },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) {
        return false
      }
      
      try {
        const existingUser = await db.select()
          .from(schema.users)
          .where(eq(schema.users.email, user.email))
          .limit(1)

        if (existingUser.length > 0) {
          return true
        }

        // Generate a username from email (before the @)
        const baseUsername = user.email.split('@')[0]
        let username = baseUsername
        let counter = 1

        // Check username availability and add number if taken
        while (true) {
          const existingUsername = await db.select()
            .from(schema.users)
            .where(eq(schema.users.username, username))
            .limit(1)

          if (existingUsername.length === 0) break
          username = `${baseUsername}${counter}`
          counter++
        }

        const newUser = schema.insertUserSchema.parse({
          email: user.email,
          name: user.name ?? 'User',
          username: username,
          image: user.image,
          emailVerified: new Date(),
          preferences: {},
          otherData: {},
        });

        await db.insert(schema.users).values(newUser);
        return true

      } catch (error) {
        console.error("Error in signIn callback:", error)
        // Log the detailed error but return a generic message
        if (error instanceof Error) {
          console.error(`Detailed error: ${error.message}`)
        }
        return false
      }
    }
  },
})