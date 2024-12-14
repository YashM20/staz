import { handlers } from "@/auth" // Referring to the auth.ts we just created

// Add runtime directive to use Node.js
export const runtime = "nodejs"

export const { GET, POST } = handlers