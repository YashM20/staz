'use client'

import { create } from 'zustand'

interface BookmarkFiltersState {
  filters: {
    type?: string
    tag?: string
  }
  setFilters: (filters: { type?: string; tag?: string }) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const useBookmarkFilters = create<BookmarkFiltersState>()((set: any) => ({
  filters: {},
  setFilters: (filters: { type?: string; tag?: string }) => set({ filters }),
  searchQuery: '',
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
})) 