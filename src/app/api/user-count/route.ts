import { db } from "@/db/config"
import * as schema from "@/db/schema"
import { count } from "drizzle-orm"

export async function GET() {
  try {
    const [result] = await db
      .select({ value: count() })
      .from(schema.users)

    return Response.json({ count: result.value })
  } catch (error) {
    console.error('Error fetching user count:', error)
    return Response.json({ count: 1 }, { status: 500 })
  }
} 