'use client'

import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { type Bookmark } from '@/types/bookmark'
import bookmarksData from '@/data/bookmarks.json'

interface BookmarkContextType {
  bookmarks: Bookmark[]
  filteredBookmarks: Bookmark[]
  filters: {
    type?: string
    tag?: string
  }
  setFilters: (filters: { type?: string; tag?: string }) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortBy: 'name' | 'date'
  setSortBy: (sortBy: 'name' | 'date') => void
  view: 'list' | 'grid' | 'headlines' | 'moodboard'
  setView: (view: 'list' | 'grid' | 'headlines' | 'moodboard') => void
  displayOptions: {
    showCover: boolean
    showTitle: boolean
    showNote: boolean
    showDescription: boolean
    showHighlights: boolean
    showTags: boolean
    showInfo: boolean
  }
  setDisplayOptions: (options: Partial<BookmarkContextType['displayOptions']>) => void
  addBookmark: (newBookmark: Omit<Bookmark, 'id'>) => void
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined)

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [filters, setFilters] = useState<{ type?: string; tag?: string }>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'date'>('date')
  const [view, setView] = useState<'list' | 'grid' | 'headlines' | 'moodboard'>('grid')
  const [displayOptions, setDisplayOptions] = useState({
    showCover: true,
    showTitle: true,
    showNote: false,
    showDescription: true,
    showHighlights: true,
    showTags: true,
    showInfo: true,
  })

  const handleDisplayOptionsChange = (options: Partial<typeof displayOptions>) => {
    setDisplayOptions(prev => ({
      ...prev,
      ...options
    }))
  }

  useEffect(() => {
    setBookmarks(bookmarksData.bookmarks as unknown as Bookmark[])
  }, [])

  const filteredBookmarks = useMemo(() => {
    return bookmarks
      .filter((bookmark) => {
        const matchesType =
          !filters.type ||
          filters.type === 'all' ||
          (filters.type === 'unsorted' && bookmark.tags.length === 0) ||
          bookmark.type === filters.type

        const matchesTag = !filters.tag || bookmark.tags.includes(filters.tag)

        const matchesSearch =
          !searchQuery ||
          bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bookmark.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bookmark.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )

        return matchesType && matchesTag && matchesSearch
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.title.localeCompare(b.title)
        } else {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
      })
  }, [bookmarks, filters, searchQuery, sortBy])

  const addBookmark = (newBookmark: Omit<Bookmark, 'id'>) => {
    const bookmark: Bookmark = {
      ...newBookmark,
      id: Date.now().toString(),
    }
    setBookmarks((prevBookmarks) => [...prevBookmarks, bookmark])
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        filteredBookmarks,
        filters,
        setFilters,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        view,
        setView,
        displayOptions,
        setDisplayOptions: handleDisplayOptionsChange,
        addBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  )
}

export function useBookmarks() {
  const context = useContext(BookmarkContext)
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider')
  }
  return context
}

