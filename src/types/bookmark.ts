// Core bookmark type matching database schema
export interface Bookmark {
  id: string
  globalBookmarkId: string
  userId: string
  username: string
  title: string | null
  description: string | null
  coverImage: string | null
  notes: string | null
  tags: string[]
  type: 'link' | 'article' | 'resource' | 'note' | 'image' | 'video'
  highlights: string[]
  isFavorite: boolean
  isArchived: boolean
  isPublic: boolean
  isEnabled: boolean
  customSlug: string | null
  viewCount: number
  lastAccessed: Date | null
  createdAt: Date
  updatedAt: Date
}

// Form data for adding/editing bookmarks
export interface BookmarkFormData {
  url: string
  title: string
  description?: string | null
  type: 'link' | 'article' | 'resource' | 'note' | 'image' | 'video'
  tags: string[]
  notes?: string | null
  isFavorite: boolean
  isPublic: boolean
}

// Global bookmark metadata
export interface GlobalBookmark {
  id: string
  url: string
  domainId: string
  title?: string
  description?: string
  coverImage?: string
  favicon?: string
  contentType?: string
  isBroken: boolean
  lastChecked?: string
  metadata: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

// For the internal bookmark creation
export interface NewBookmark extends BookmarkFormData {
  globalBookmarkId: string
  userId: string
  username: string
  isArchived: boolean
  viewCount: number
  createdAt: string
  updatedAt: string
}

