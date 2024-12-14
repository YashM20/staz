'use server'

import { db } from '@/db/config'
import { users } from '@/db/schema/users'
import { eq } from 'drizzle-orm'

export async function updateUserProfile(
  userId: string,
  data: {
    username: string,
    bio?: string,
    preferences?: Record<string, unknown>,
    otherData?: Record<string, unknown>,
  }
) {
  try {
    await db.update(users)
      .set({
        username: data.username,
        bio: data.bio || '',
        preferences: data.preferences || {},
        otherData: data.otherData || {},
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));
    
    return { success: true };
  } catch (error) {
    console.error('Failed to update user profile:', error);
    return { success: false, error: 'Failed to update user profile' };
  }
} 