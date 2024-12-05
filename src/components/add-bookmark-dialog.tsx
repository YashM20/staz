'use client'

import * as React from 'react'
import { Bell, Heart, Search, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Toggle } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'
import { useBookmarks } from './bookmark-provider'
import { useToast } from '@/hooks/use-toast'

interface AddBookmarkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddBookmarkDialog({ open, onOpenChange }: AddBookmarkDialogProps) {
  const { addBookmark } = useBookmarks()
  const { toast } = useToast()
  const [url, setUrl] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [note, setNote] = React.useState('')
  const [tags, setTags] = React.useState('')
  const [type, setType] = React.useState('link')
  const [isLiked, setIsLiked] = React.useState(false)
  const [isNotified, setIsNotified] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newBookmark = {
      title,
      description: note,
      url,
      image: `https://picsum.photos/seed/${Date.now()}/800/400`,
      type: type as 'link' | 'article' | 'resource' | 'note' | 'image' | 'video',
      tags: tags.split(',').map(tag => tag.trim()),
      source: new URL(url).hostname,
      date: new Date().toISOString(),
      highlights: [],
      note,
    }
    addBookmark(newBookmark)
    toast({
      title: 'Bookmark added',
      description: 'Your new bookmark has been added successfully.',
    })
    onOpenChange(false)
    resetForm()
  }

  const resetForm = () => {
    setUrl('')
    setTitle('')
    setNote('')
    setTags('')
    setType('link')
    setIsLiked(false)
    setIsNotified(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#1E1E1E] border-zinc-800 p-0">
        <div className="flex items-center justify-between border-b border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">+</span>
            </div>
            <DialogTitle className="text-lg font-normal">New Bookmark</DialogTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent border-zinc-800 focus-visible:ring-zinc-700"
            />

            <Textarea
              placeholder="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[100px] bg-transparent border-zinc-800 focus-visible:ring-zinc-700 resize-none"
            />

            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="bg-transparent border-zinc-800 focus:ring-zinc-700">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-[#1E1E1E] border-zinc-800">
                  <SelectItem value="link">Link</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="resource">Resource</SelectItem>
                  <SelectItem value="note">Note</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Tags</label>
              <Input
                placeholder="Add tags (comma-separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="bg-transparent border-zinc-800 focus-visible:ring-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-400">URL</label>
              <Input
                type="url"
                placeholder="https://"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-transparent border-zinc-800 focus-visible:ring-zinc-700"
              />
            </div>

            <div className="flex items-center gap-2">
              <Toggle
                pressed={isLiked}
                onPressedChange={setIsLiked}
                className="bg-transparent border border-zinc-800 hover:bg-zinc-800 data-[state=on]:bg-zinc-800"
              >
                <Heart className={cn(
                  "h-4 w-4",
                  isLiked ? "fill-current text-red-500" : "text-zinc-400"
                )} />
              </Toggle>
              <Toggle
                pressed={isNotified}
                onPressedChange={setIsNotified}
                className="bg-transparent border border-zinc-800 hover:bg-zinc-800 data-[state=on]:bg-zinc-800"
              >
                <Bell className={cn(
                  "h-4 w-4",
                  isNotified ? "text-blue-500" : "text-zinc-400"
                )} />
              </Toggle>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent border-zinc-800 hover:bg-zinc-800 hover:text-white"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#C4A76C] text-black hover:bg-[#B39355]"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

