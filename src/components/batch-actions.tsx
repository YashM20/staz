'use client'

import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'

export function BatchActions({ selectedBookmarks, onDelete, onMove, onExport }: { selectedBookmarks: any[], onDelete: () => void, onMove: () => void, onExport: () => void }) {
  if (selectedBookmarks.length === 0) return null

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#2A2A2A] p-4 rounded-lg shadow-lg"
    >
      <div className="flex items-center space-x-4">
        <span>{selectedBookmarks.length} selected</span>
        <Button onClick={onDelete}>Delete</Button>
        <Button onClick={onMove}>Move</Button>
        <Button onClick={onExport}>Export</Button>
      </div>
    </motion.div>
  )
}

