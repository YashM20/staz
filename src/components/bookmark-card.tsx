'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Calendar, Edit2, Eye, MoreVertical, Tag, Trash2, Clock } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Bookmark } from '@/types/bookmark'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

interface BookmarkCardProps {
  bookmark: Bookmark
  onPreview: () => void
  view: 'list' | 'grid' | 'headlines' | 'moodboard'
  isFocused?: boolean
  onReadLater: (id: string) => void
}

export function BookmarkCard({ bookmark, onPreview, view, isFocused, onReadLater }: BookmarkCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { toast } = useToast()

  const cardStyles = {
    list: 'flex gap-4 items-center',
    grid: 'flex flex-col',
    headlines: 'flex items-center gap-4',
    moodboard: 'relative aspect-square',
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: isHovered ? 1.03 : 1,
        boxShadow: isHovered 
          ? '0 10px 20px rgba(0,0,0,0.2)' 
          : '0 0px 0px rgba(0,0,0,0)'
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative rounded-lg overflow-hidden bg-card border",
        cardStyles[view],
        isFocused && "ring-2 ring-primary"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {view !== 'headlines' && (
        <div className={cn(
          "relative",
          view === 'moodboard' ? 'aspect-square' : 'aspect-video'
        )}>
          <Image
            src={bookmark.image || `https://picsum.photos/seed/${bookmark.id}/800/600`}
            alt={bookmark.title}
            fill
            className="object-cover"
          />
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center gap-2"
              >
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8"
                  onClick={onPreview}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className={cn(
        "flex flex-col gap-2",
        view === 'list' ? 'flex-1' : 'p-4'
      )}>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium leading-none">{bookmark.title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48"
            >
              <DropdownMenuItem onClick={onPreview}>
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                Share
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {bookmark.description && view !== 'headlines' && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {bookmark.description}
          </p>
        )}

        {bookmark.tags.length > 0 && view !== 'headlines' && (
          <div className="flex flex-wrap gap-1">
            {bookmark.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
              >
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            {new Date(bookmark.date).toLocaleDateString()}
          </span>
          <span>{bookmark.source}</span>
        </div>

        <Button
          size="sm"
          variant="secondary"
          className="mt-2"
          onClick={() => {
            onReadLater(bookmark.id)
            toast({
              title: "Added to Read Later",
              description: "You can find this bookmark in your Read Later list",
            })
          }}
        >
          <Clock className="h-4 w-4 mr-2" />
          Read Later
        </Button>
      </div>
    </motion.div>
  )
}

