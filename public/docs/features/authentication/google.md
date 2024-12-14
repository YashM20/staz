# Google OAuth Authentication

## Setup

1. **Create Google OAuth Credentials**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing one
   - Enable Google OAuth API
   - Configure OAuth consent screen
   - Create OAuth 2.0 credentials

2. **Configure Environment Variables**

```env
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

## Implementation

### NextAuth Configuration

```typescript
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    allowDangerousEmailAccountLinking: true,
  })],
  adapter: DrizzleAdapter(db),
  session: { strategy: "database" },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false
      
      // User creation/verification logic
      try {
        const existingUser = await db.select()
          .from(schema.users)
          .where(eq(schema.users.email, user.email))
          .limit(1)

        if (existingUser.length > 0) {
          return true
        }

        // Create new user with generated username
        const username = await generateUniqueUsername(user.email)
        await createNewUser(user, username)
        return true
      } catch (error) {
        console.error("Sign in error:", error)
        return false
      }
    }
  }
})
```

## Usage

### Sign In Button

```typescript
<form action={async () => {
  "use server"
  await signIn("google")
}}>
  <button>Sign in with Google</button>
</form>
```

### Sign Out Button

```typescript
<form action={async () => {
  "use server"
  await signOut()
}}>
  <button>Sign out</button>
</form>
```

## Error Handling

Common issues and solutions:

1. **Invalid OAuth Configuration**
   - Verify credentials in `.env`
   - Check authorized redirect URIs
   - Confirm OAuth consent screen setup

2. **User Creation Failures**
   - Check database connection
   - Verify schema migrations
   - Monitor username generation

3. **Session Issues**
   - Validate session strategy
   - Check database sessions table
   - Clear browser cookies 