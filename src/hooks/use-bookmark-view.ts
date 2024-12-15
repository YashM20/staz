'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ViewType = 'list' | 'grid' | 'headlines' | 'moodboard'

interface BookmarkViewState {
  view: ViewType
  setView: (view: ViewType) => void
  sortBy: 'name' | 'date'
  setSortBy: (sortBy: 'name' | 'date') => void
  displayOptions: {
    showCover: boolean
    showTitle: boolean
    showNote: boolean
    showDescription: boolean
    showHighlights: boolean
    showTags: boolean
    showInfo: boolean
  }
  setDisplayOptions: (options: Partial<BookmarkViewState['displayOptions']>) => void
}

type BookmarkViewStore = BookmarkViewState

export const useBookmarkView = create<BookmarkViewStore>()(
  persist(
    (set) => ({
      view: 'grid',
      setView: (view: ViewType) => set({ view }),
      sortBy: 'date',
      setSortBy: (sortBy: 'name' | 'date') => set({ sortBy }),
      displayOptions: {
        showCover: true,
        showTitle: true,
        showNote: false,
        showDescription: true,
        showHighlights: true,
        showTags: true,
        showInfo: true,
      },
      setDisplayOptions: (options: Partial<BookmarkViewState['displayOptions']>) =>
        set((state) => ({
          displayOptions: { ...state.displayOptions, ...options },
        })),
    }),
    {
      name: 'bookmark-view-storage',
    }
  )
) 