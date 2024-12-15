'use server'

import { db } from "@/db/config"
import * as schema from "@/db/schema"
import { eq, and, sql, not } from "drizzle-orm"
import { auth } from "@/auth"

export interface BookmarkStats {
  total: number
  favorites: number
  archived: number
  unread: number
  shared: number
  unsorted: number
  types: {
    [key: string]: number
  }
  tags: {
    [key: string]: number
  }
}

export async function getBookmarkStats(): Promise<BookmarkStats | null> {
  try {
    const session = await auth()
    if (!session?.user?.id) return null

    const userId = session.user.id

    // Get basic counts
    const [totalCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.bookmarks)
      .where(eq(schema.bookmarks.userId, userId))

    const [favoritesCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.bookmarks)
      .where(and(
        eq(schema.bookmarks.userId, userId),
        eq(schema.bookmarks.isFavorite, true)
      ))

    const [archivedCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.bookmarks)
      .where(and(
        eq(schema.bookmarks.userId, userId),
        eq(schema.bookmarks.isArchived, true)
      ))

    const [unreadCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.bookmarks)
      .where(and(
        eq(schema.bookmarks.userId, userId),
        sql`${schema.bookmarks.lastAccessed} IS NULL`
      ))

    const [sharedCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.bookmarks)
      .where(and(
        eq(schema.bookmarks.userId, userId),
        eq(schema.bookmarks.isPublic, true)
      ))

    // Get count of bookmarks without tags
    const [unsortedCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.bookmarks)
      .where(and(
        eq(schema.bookmarks.userId, userId),
        sql`array_length(tags, 1) IS NULL OR array_length(tags, 1) = 0`
      ))

    // Get type counts with proper filtering
    const typeCounts = await db
      .select({
        type: schema.bookmarks.type,
        count: sql<number>`count(*)`
      })
      .from(schema.bookmarks)
      .where(and(
        eq(schema.bookmarks.userId, userId),
        not(eq(schema.bookmarks.isArchived, true))
      ))
      .groupBy(schema.bookmarks.type)

    // Get tag counts with proper filtering
    const tagCounts = await db
      .select({
        count: sql<number>`count(*)`,
        tag: sql<string>`unnest(tags)`
      })
      .from(schema.bookmarks)
      .where(and(
        eq(schema.bookmarks.userId, userId),
        not(eq(schema.bookmarks.isArchived, true)),
        sql`array_length(tags, 1) > 0`
      ))
      .groupBy(sql`unnest(tags)`)

    const stats: BookmarkStats = {
      total: Number(totalCount.count),
      favorites: Number(favoritesCount.count),
      archived: Number(archivedCount.count),
      unread: Number(unreadCount.count),
      shared: Number(sharedCount.count),
      unsorted: Number(unsortedCount.count),
      types: Object.fromEntries(
        typeCounts.map(({ type, count }) => [type, Number(count)])
      ),
      tags: Object.fromEntries(
        tagCounts.map(row => [String(row.tag), Number(row.count)])
      )
    }

    return stats

  } catch (error) {
    console.error('Error getting bookmark stats:', error)
    return null
  }
} 