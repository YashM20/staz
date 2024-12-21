import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { db } from "@/db/config";
import * as schema from "@/db/schema";
import { toast } from "sonner"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    allowDangerousEmailAccountLinking: true,
  })],
  adapter: DrizzleAdapter(db),
  session: { strategy: "database" },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    // authorized({ auth }) {
    //   return !!auth
    // },
    async signIn({ user, account }) {
      if (!user.email) {
        toast.error("Email is required")
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
          toast.error("Failed to sign in")
        }
        return false
      }
    },
    
    // Add session callback to include username
    async session({ session, user }) {
      console.log("session", session)
      console.log("user", user)
      if (session.user) {
        // Get user from database to include username
        const dbUser = await db.select()
          .from(schema.users)
          .where(eq(schema.users.id, user.id))
          .limit(1)
          .then(res => res[0]);

        // Add username and id to the session
        session.user.username = dbUser.username;
        session.user.id = user.id;
      }
      return session;
    }
  },
})