'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { Header } from './header'
import { BookmarkGrid } from './bookmark-grid'
import { SidebarInset } from '@/components/ui/sidebar'
import { useBookmarks } from './bookmark-provider'
import { Button } from '@/components/ui/button'

export function MainContent() {
  const { filteredBookmarks } = useBookmarks()
  const [showScrollTop, setShowScrollTop] = useState(false)

  const handleScroll = useCallback(() => {
    setShowScrollTop(window.pageYOffset > 300)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <SidebarInset>
      <Header />
      <main className="flex-1 overflow-y-auto p-6 bg-background-dark">
        <BookmarkGrid />
        <AnimatePresence>
          {showScrollTop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-4 right-4"
            >
              <Button
                variant="secondary"
                size="icon"
                onClick={scrollToTop}
                className="rounded-full bg-[#C4A76C] text-black hover:bg-[#B39355]"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </SidebarInset>
  )
}

