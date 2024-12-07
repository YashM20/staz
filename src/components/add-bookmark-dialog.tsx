'use client'

import * as React from 'react'
import { Bell, Heart, Search, User, X, Link as LinkIcon, ExternalLink, Plus } from 'lucide-react'
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
import { TagsInput } from './custom/TagsInput'

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
  const [tags, setTags] = React.useState<string[]>([])
  const [type, setType] = React.useState('link')
  const [isLiked, setIsLiked] = React.useState(false)
  const [isNotified, setIsNotified] = React.useState(false)
  const [isExtracting, setIsExtracting] = React.useState(false)
  const [ogImage, setOgImage] = React.useState<string>('')
  const [isImageLoading, setIsImageLoading] = React.useState(false)

  const extractUrlInfo = async () => {
    if (!url) return
    
    setIsExtracting(true)
    setIsImageLoading(true)
    try {
      const response = await fetch('/api/extract-url-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      
      const data = await response.json()
      setTitle(data.title || '')
      setNote(data.description || '')
      setTags(data.tags || [])
      setType(data.type || 'link')
      setOgImage(data.image || '')
    } catch (error) {
      console.error('Error extracting URL info:', error)
      toast({
        title: 'Error',
        description: 'Failed to extract URL information',
        variant: 'destructive',
      })
    } finally {
      setIsExtracting(false)
      setIsImageLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newBookmark = {
      title,
      description: note,
      url,
      image: `https://picsum.photos/seed/${Date.now()}/800/400`,
      type: type as 'link' | 'article' | 'resource' | 'note' | 'image' | 'video',
      tags,
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
    setTags([])
    setType('link')
    setIsLiked(false)
    setIsNotified(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="p-0 gap-0 w-[calc(100%-2rem)] max-w-[900px] h-[calc(100vh-2rem)] md:h-[85vh] max-h-[900px]"
        hideClose
      >
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <Plus className="h-5 w-5 text-primary-foreground" />
              </div>
              <DialogTitle className="text-xl font-semibold">Add Bookmark</DialogTitle>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-9 w-9 hover:bg-muted"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="grid md:grid-cols-[2fr,3fr] h-full">
              {/* Left Column */}
              <div className="p-6 space-y-6 border-b md:border-b-0 md:border-r">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">URL</label>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="h-8 px-3 flex items-center gap-2"
                      onClick={extractUrlInfo}
                      disabled={isExtracting || !url}
                    >
                      {isExtracting ? (
                        <>
                          <span className="animate-spin">
                            <Search className="h-4 w-4" />
                          </span>
                          <span>Fetching...</span>
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-4 w-4" />
                          <span>Fetch Info</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="https://"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="pr-3 font-mono text-sm"
                    />
                  </div>
                </div>

                {ogImage && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Preview</label>
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border">
                      {isImageLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                          <div className="animate-spin">
                            <Search className="h-6 w-6" />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={ogImage}
                          alt="Preview"
                          className="object-cover w-full h-full"
                          onError={() => setOgImage('')}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Note</label>
                  <Textarea
                    placeholder="Add a note..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="min-h-[120px] resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Type</label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="resource">Resource</SelectItem>
                      <SelectItem value="note">Note</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Tags</label>
                  <TagsInput
                    value={tags}
                    onValueChange={setTags}
                    placeholder="Add tags..."
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Toggle
                    pressed={isLiked}
                    onPressedChange={setIsLiked}
                    aria-label="Toggle favorite"
                    className="data-[state=on]:bg-primary/10"
                  >
                    <Heart className={cn(
                      "h-4 w-4",
                      isLiked ? "fill-current text-red-500" : "text-muted-foreground"
                    )} />
                  </Toggle>
                  <Toggle
                    pressed={isNotified}
                    onPressedChange={setIsNotified}
                    aria-label="Toggle notifications"
                    className="data-[state=on]:bg-primary/10"
                  >
                    <Bell className={cn(
                      "h-4 w-4",
                      isNotified ? "text-blue-500" : "text-muted-foreground"
                    )} />
                  </Toggle>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t p-4 bg-muted/50 backdrop-blur supports-[backdrop-filter]:bg-muted/50">
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!url || !title}
              >
                Save Bookmark
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

