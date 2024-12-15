'use client'

import { create } from 'zustand'
import { BookmarkStats } from '@/app/actions/stats-actions'

interface BookmarkStatsState {
  stats: BookmarkStats | null
  setStats: (stats: BookmarkStats | null) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

export const useBookmarkStats = create<BookmarkStatsState>((set) => ({
  stats: null,
  setStats: (stats) => set({ stats }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading })
})) 