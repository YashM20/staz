'use server'

import { db } from "@/db/config"
import * as schema from "@/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { BookmarkFormData } from "@/types/bookmark"
import { v4 as uuidv4 } from 'uuid'
import { getBookmarkStats } from '@/app/actions/stats-actions'

function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch (error) {
    return ''
  }
}

export async function addBookmark(data: BookmarkFormData) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Unauthorized" }
    }

    const domain = extractDomain(data.url)
    
    // First, try to find or create the domain
    const [domainRecord] = await db
      .insert(schema.domains)
      .values({
        id: uuidv4(),
        name: domain,
        isEnabled: true,
        lastUpdated: new Date(),
      })
      .onConflictDoUpdate({
        target: schema.domains.name,
        set: {
          lastUpdated: new Date(),
        },
      })
      .returning()

    // Then create or update the global bookmark
    const [globalBookmark] = await db
      .insert(schema.globalBookmarks)
      .values({
        url: data.url,
        title: data.title,
        description: data.description || null,
        domainId: domainRecord.id,
        isEnabled: true,
      })
      .onConflictDoUpdate({
        target: schema.globalBookmarks.url,
        set: {
          title: data.title,
          description: data.description || null,
          updatedAt: new Date(),
        },
      })
      .returning()

    // Finally create the user's bookmark
    const newBookmark = {
      globalBookmarkId: globalBookmark.id,
      userId: session.user.id,
      username: session.user.username,
      title: data.title,
      description: data.description || null,
      notes: data.notes || null,
      tags: data.tags || [],
      type: data.type,
      highlights: [],
      isFavorite: data.isFavorite,
      isArchived: false,
      isPublic: data.isPublic,
      isEnabled: true,
      customSlug: null,
      viewCount: 0,
      lastAccessed: null,
    }

    const result = await db.insert(schema.bookmarks)
      .values(newBookmark)
      .returning()

    const stats = await getBookmarkStats()
    console.log("stats", stats)
    revalidatePath('/')
    return { success: true, data: result[0], stats }

  } catch (error) {
    console.error('Error adding bookmark:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to add bookmark' 
    }
  }
}

export async function getBookmarks() {
  try {
    const session = await auth()
    if (!session?.user) {
      console.log("Unauthorized")
      return { success: false, error: "Unauthorized" }
    }

    const userBookmarks = await db.query.bookmarks.findMany({
      where: eq(schema.bookmarks.userId, session.user.id),
      with: {
        globalBookmark: true,
      },
      orderBy: (bookmarks, { desc }) => [desc(bookmarks.createdAt)],
    })

    return { success: true, data: userBookmarks }
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch bookmarks' 
    }
  }
}

export async function updateBookmark(id: string, data: Partial<typeof schema.bookmarks.$inferInsert>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { success: false, error: "Unauthorized" }
    }

    const result = await db
      .update(schema.bookmarks)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.bookmarks.id, id))
      .returning()

    const stats = await getBookmarkStats()
    console.log("stats", stats)
    revalidatePath('/')
    return { success: true, data: result[0], stats }
  } catch (error) {
    console.error('Error updating bookmark:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update bookmark' 
    }
  }
} 