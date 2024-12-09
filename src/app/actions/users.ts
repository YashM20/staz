'use server'

import { db } from '@/db/config'
import { testTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function getUsers() {
  try {
    const users = await db.select().from(testTable)
    return { data: users, error: null }
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return { data: null, error: 'Failed to fetch users' }
  }
}

export async function addUser(data: { name: string; age: string; email: string }) {
  try {
    const newUser = await db.insert(testTable).values({
      name: data.name,
      age: parseInt(data.age),
      email: data.email
    }).returning()
    revalidatePath('/demo')
    return { data: newUser[0], error: null }
  } catch (error) {
    console.error('Failed to add user:', error)
    return { data: null, error: 'Failed to add user' }
  }
}

export async function updateUser(id: number, age: number) {
  try {
    const updatedUser = await db.update(testTable)
      .set({ age })
      .where(eq(testTable.id, id))
      .returning()
    revalidatePath('/demo')
    return { data: updatedUser[0], error: null }
  } catch (error) {
    console.error('Failed to update user:', error)
    return { data: null, error: 'Failed to update user' }
  }
}

export async function deleteUser(id: number) {
  try {
    await db.delete(testTable).where(eq(testTable.id, id))
    revalidatePath('/demo')
    return { error: null }
  } catch (error) {
    console.error('Failed to delete user:', error)
    return { error: 'Failed to delete user' }
  }
} 