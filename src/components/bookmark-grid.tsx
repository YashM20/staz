'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useSpring, animated } from 'react-spring'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { BookmarkCard } from './bookmark-card'
import { BookmarkPreview } from './bookmark-preview'
import { useBookmarks } from './bookmark-provider'
import { Bookmark } from '@/types/bookmark'
import { useInView } from 'react-intersection-observer'

export function BookmarkGrid() {
  const { filteredBookmarks, view } = useBookmarks()
  const [previewBookmark, setPreviewBookmark] = useState<Bookmark | null>(null)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [visibleBookmarks, setVisibleBookmarks] = useState(20)
  const loadMoreRef = useRef(null)
  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
  })

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      setFocusedIndex(prev => Math.min(prev + 1, filteredBookmarks.length - 1))
    } else if (e.key === 'ArrowLeft') {
      setFocusedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && focusedIndex !== -1) {
      setPreviewBookmark(filteredBookmarks[focusedIndex])
    }
  }, [filteredBookmarks, focusedIndex])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (inView) {
      setVisibleBookmarks(prev => Math.min(prev + 20, filteredBookmarks.length))
    }
  }, [inView, filteredBookmarks.length])

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

  const handleDragEnd = (result: any) => {
    if (!result.destination) return
    const newBookmarks = Array.from(filteredBookmarks)
    const [reorderedBookmark] = newBookmarks.splice(result.source.index, 1)
    newBookmarks.splice(result.destination.index, 0, reorderedBookmark)
    // Update the bookmarks in your state management system
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="bookmarks">
        {(provided) => (
          <animated.div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={transitions}
            className={`grid ${gridConfig[view]}`}
          >
            <AnimatePresence>
              {filteredBookmarks.slice(0, visibleBookmarks).map((bookmark, index) => (
                <Draggable key={bookmark.id} draggableId={bookmark.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <BookmarkCard
                        bookmark={bookmark}
                        onPreview={() => setPreviewBookmark(bookmark)}
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

      <div ref={inViewRef} />

      <BookmarkPreview
        bookmark={previewBookmark}
        onClose={() => setPreviewBookmark(null)}
      />
    </DragDropContext>
  )
}

