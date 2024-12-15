'use client'

import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Bookmark, BookmarkFormData } from '@/types/bookmark'

interface BookmarkPreviewProps {
  bookmark: BookmarkFormData
  onClose: () => void
}

export function BookmarkPreview({ bookmark, onClose }: BookmarkPreviewProps) {
  if (!bookmark) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="fixed left-1/2 top-1/2 w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 space-y-4 rounded-lg border border-zinc-800 bg-[#1E1E1E] p-6 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">{bookmark.title}</h2>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={onClose}
            >
              <X className="size-4" />
            </Button>
          </div>

          <div className="aspect-[16/9] w-full overflow-hidden rounded-lg border border-zinc-800">
            <iframe
              src={bookmark.url}
              className="size-full"
              title={bookmark.title}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

