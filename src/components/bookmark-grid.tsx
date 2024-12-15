'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useSpring, animated } from 'react-spring'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { BookmarkCard } from './bookmark-card'
import { BookmarkPreview } from './bookmark-preview'
import { Bookmark, BookmarkFormData, GlobalBookmark } from '@/types/bookmark'
import { useInView } from 'react-intersection-observer'
import { getBookmarks } from '@/app/actions/bookmark-actions'
import { toast } from 'sonner'
import { useBookmarkView } from '@/hooks/use-bookmark-view'
import type { DropResult } from 'react-beautiful-dnd'

// Update the BookmarkPreviewData interface
interface BookmarkPreviewData {
  id: string
  url: string
  title: string
  description: string | null
  coverImage: string | null
  tags: string[]
  createdAt: Date
  type: 'link' | 'article' | 'resource' | 'note' | 'image' | 'video'
  isFavorite: boolean
  isPublic: boolean
}

// First, define the exact database response type
type DbResponse = {
  id: string
  globalBookmarkId: string
  userId: string
  username: string
  title: string | null
  description: string | null
  coverImage: string | null
  notes: string | null
  tags: string[]
  type: string
  highlights: string[]
  isFavorite: boolean
  isArchived: boolean
  isPublic: boolean
  isEnabled: boolean
  customSlug: string | null
  viewCount: number
  lastAccessed: string | null
  createdAt: string
  updatedAt: string
  globalBookmark: {
    id: string
    url: string
    domainId: string
    title: string | null
    description: string | null
    coverImage: string | null
    favicon: string | null
    contentType: string | null
    isBroken: boolean
    lastChecked: string | null
    metadata: Record<string, unknown>
    createdAt: string
    updatedAt: string
  }
}

// Define the runtime type we want after conversion
type RuntimeBookmark = {
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
  globalBookmark: {
    id: string
    url: string
    domainId: string
    title: string | null
    description: string | null
    coverImage: string | null
    favicon: string | null
    contentType: string | null
    isBroken: boolean
    lastChecked: Date | null
    metadata: Record<string, unknown>
    createdAt: Date
    updatedAt: Date
  }
}

export function BookmarkGrid() {
  const { view } = useBookmarkView()
  const [bookmarks, setBookmarks] = useState<RuntimeBookmark[]>([])
  const [visibleBookmarks, setVisibleBookmarks] = useState(20)
  const [previewBookmark, setPreviewBookmark] = useState<BookmarkPreviewData | null>(null)
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)
  const [ref, inView] = useInView()
  const [isLoading, setIsLoading] = useState(true)

  // Fetch bookmarks on mount
  useEffect(() => {
    const fetchBookmarks = async () => {
      setIsLoading(true)
      try {
        const result = await getBookmarks()
        if (result.success && result.data) {
          const dbData = result.data as unknown as DbResponse[]
          
          const convertedBookmarks: RuntimeBookmark[] = dbData.map(bookmark => ({
            ...bookmark,
            createdAt: new Date(bookmark.createdAt),
            updatedAt: new Date(bookmark.updatedAt),
            lastAccessed: bookmark.lastAccessed ? new Date(bookmark.lastAccessed) : null,
            type: bookmark.type as 'link' | 'article' | 'resource' | 'note' | 'image' | 'video',
            globalBookmark: {
              ...bookmark.globalBookmark,
              createdAt: new Date(bookmark.globalBookmark.createdAt),
              updatedAt: new Date(bookmark.globalBookmark.updatedAt),
              lastChecked: bookmark.globalBookmark.lastChecked 
                ? new Date(bookmark.globalBookmark.lastChecked)
                : null
            }
          }))
          
          setBookmarks(convertedBookmarks)
        } else {
          toast.error('Failed to load bookmarks')
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchBookmarks()
  }, [])

  // Load more bookmarks when scrolling
  useEffect(() => {
    if (inView) {
      setVisibleBookmarks(prev => prev + 20)
    }
  }, [inView])

  const visibleBookmarksList = bookmarks.slice(0, visibleBookmarks)

  const gridConfig = {
    list: 'grid-cols-1 gap-4',
    grid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
    headlines: 'grid-cols-1 gap-2',
    moodboard: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4',
  }

  const transitions = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 300, friction: 20 },
  })

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return
    const newBookmarks = Array.from(bookmarks)
    const [reorderedBookmark] = newBookmarks.splice(result.source.index, 1)
    newBookmarks.splice(result.destination.index, 0, reorderedBookmark)
    setBookmarks(newBookmarks)
  }, [bookmarks, setBookmarks])

  if (isLoading) {
    return <div>Loading bookmarks...</div>
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="bookmarks" isDropDisabled={true} isCombineEnabled={false} ignoreContainerClipping={true}>
          {(provided) => (
            <animated.div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={transitions}
              className={`grid ${gridConfig[view]}`}
            >
              <AnimatePresence>
                {visibleBookmarksList.map((bookmark: RuntimeBookmark, index) => (
                  <Draggable 
                    key={bookmark.id} 
                    draggableId={bookmark.id} 
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <BookmarkCard
                          bookmark={{
                            id: bookmark.id,
                            url: bookmark.globalBookmark.url,
                            title: bookmark.title,
                            description: bookmark.description,
                            coverImage: bookmark.coverImage,
                            tags: bookmark.tags,
                            createdAt: bookmark.createdAt,
                            type: bookmark.type
                          }}
                          onPreview={() => setPreviewBookmark({
                            id: bookmark.id,
                            url: bookmark.globalBookmark.url,
                            title: bookmark.title || 'Untitled',
                            description: bookmark.description,
                            coverImage: bookmark.coverImage,
                            tags: bookmark.tags,
                            createdAt: bookmark.createdAt,
                            type: bookmark.type,
                            isFavorite: bookmark.isFavorite,
                            isPublic: bookmark.isPublic
                          })}
                          view={view}
                          isFocused={index === focusedIndex}
                          onReadLater={(id) => {
                            // Implement read later functionality
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              </AnimatePresence>
              {provided.placeholder}
            </animated.div>
          )}
        </Droppable>
      </DragDropContext>

      {previewBookmark && (
        <BookmarkPreview
          bookmark={{
            url: previewBookmark.url,
            title: previewBookmark.title || 'Untitled',
            description: previewBookmark.description,
            type: previewBookmark.type,
            tags: previewBookmark.tags,
            isFavorite: previewBookmark.isFavorite,
            isPublic: previewBookmark.isPublic
          }}
          onClose={() => setPreviewBookmark(null)}
        />
      )}

      <div ref={ref} className="h-10" />
    </>
  )
}

