import NextAuth, { AuthError } from "next-auth"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { users } from "@/db/schema/users"
import { db } from "@/db/config"
import { accounts, sessions, verificationTokens } from "@/db/schema"
import { eq } from "drizzle-orm"
import { uuid } from "drizzle-orm/pg-core"
import { randomUUID } from 'crypto'
import { nanoid } from 'nanoid'
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    })
  ],
  
  adapter: DrizzleAdapter(db),

  callbacks: {
    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
    signIn: async ({ user: userProvider, account }) => {
      try {
        if (account?.provider === "google") {
          const { image, name, email } = userProvider;
          
          if (!email) {
            throw new AuthError("Email is required");
          }

          // Check if user exists
          const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email)
          });

          if (!existingUser) {
            // Generate username from email
            let baseUsername = email.split('@')[0]
              .toLowerCase()
              .replace(/[^a-z0-9]/g, '');
            
            if (baseUsername.length < 3) {
              baseUsername = `user${baseUsername}`;
            }
            
            let username = baseUsername;
            let counter = 1;

            while (await db.query.users.findFirst({ where: eq(users.username, username) })) {
              username = `${baseUsername}${counter}`;
              counter++;
            }

            // Create user with all required fields
            const newUser = {
              id: nanoid(),
              email: email,
              name: name || username,
              username: username,
              image: image || null,
              emailVerified: new Date(),
              isActive: true,
              role: 'user' as const,
              bio: '',
              preferences: {} as Record<string, unknown>,
              otherData: {} as Record<string, unknown>,
              warningCount: 0,
              trustScore: 0,
              createdAt: new Date(),
              updatedAt: new Date(),
              isBlocked: false,
              isSuspended: false,
            };

            await db.insert(users).values(newUser);
          }

          return true;
        }
        return false;
      } catch (error) {
        console.error("Sign in error:", error);
        throw new AuthError("Failed to sign in");
      }
    },
  },
  
  pages: {
    signIn: "/login",
  },
})