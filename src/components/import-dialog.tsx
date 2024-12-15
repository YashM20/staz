'use client'

import * as React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Loader2, Plus, ExternalLink, X, Link as LinkIcon, Image, FileText, Video } from 'lucide-react'
import { toast } from "sonner"
import { BookmarkFormData } from '@/types/bookmark'
import { TagsInput } from '@/components/custom/TagsInput'
import { cn } from '@/lib/utils'

interface ImportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImport: (bookmarks: BookmarkFormData[]) => void
}

interface ExtractedLink extends BookmarkFormData {
  status: 'pending' | 'loading' | 'success' | 'error'
  error?: string
  favicon?: string | null
  siteName?: string | null
  image?: string | null
}

export function ImportDialog({ open, onOpenChange, onImport }: ImportDialogProps) {
  const [text, setText] = React.useState('')
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [links, setLinks] = React.useState<ExtractedLink[]>([])
  const [globalTags, setGlobalTags] = React.useState<string[]>([])
  const [selectedLinks, setSelectedLinks] = React.useState<Set<string>>(new Set())

  const handleTextChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setText(newText)

    // Extract URLs using regex
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
    const urls = [...new Set(newText.match(urlRegex) || [])]

    // Initialize links with pending status
    const newLinks: ExtractedLink[] = urls.map(url => ({
      url,
      title: url,
      type: 'link',
      tags: [],
      isFavorite: false,
      isPublic: false,
      status: 'pending'
    }))

    setLinks(newLinks)
    setSelectedLinks(new Set(urls))

    // Extract info for each URL
    for (let i = 0; i < newLinks.length; i++) {
      try {
        setLinks(prev => prev.map((link, idx) => 
          idx === i ? { ...link, status: 'loading' } : link
        ))

        const response = await fetch('/api/extract-url-info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: newLinks[i].url })
        })
        
        const info = await response.json()
        
        if (!response.ok) throw new Error(info.error)

        setLinks(prev => prev.map((link, idx) => 
          idx === i ? {
            ...link,
            title: info.title || link.url,
            description: info.description || null,
            type: info.type as ExtractedLink['type'],
            tags: [...info.tags],
            status: 'success',
            image: info.image
          } : link
        ))
      } catch (error) {
        setLinks(prev => prev.map((link, idx) => 
          idx === i ? { 
            ...link, 
            status: 'error',
            error: error instanceof Error ? error.message : 'Failed to extract info'
          } : link
        ))
      }
    }
  }

  const toggleLinkSelection = (url: string) => {
    const newSelected = new Set(selectedLinks)
    if (newSelected.has(url)) {
      newSelected.delete(url)
    } else {
      newSelected.add(url)
    }
    setSelectedLinks(newSelected)
  }

  const handleImport = async () => {
    if (selectedLinks.size === 0) {
      toast.error('No links selected')
      return
    }

    setIsProcessing(true)
    try {
      const selectedBookmarks = links
        .filter(link => selectedLinks.has(link.url))
        .map(link => ({
          ...link,
          tags: [...link.tags, ...globalTags]
        }))

      await onImport(selectedBookmarks)
      setText('')
      setLinks([])
      setSelectedLinks(new Set())
      setGlobalTags([])
      onOpenChange(false)
      
      toast.success(`Selected ${selectedBookmarks.length} links for import`, {
        description: 'Processing your bookmarks in the background'
      })
    } catch (error) {
      toast.error('Failed to import bookmarks')
    } finally {
      setIsProcessing(false)
    }
  }

  const getTypeIcon = (type: ExtractedLink['type']) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />
      case 'article': return <FileText className="h-4 w-4" />
      case 'video': return <Video className="h-4 w-4" />
      default: return <ExternalLink className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="h-[calc(100vh-2rem)] max-h-[900px] w-[calc(100%-2rem)] max-w-[900px] gap-0 p-0 md:h-[85vh]"
        hideClose
      >
        <DialogHeader className="border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
                <LinkIcon className="size-5 text-primary-foreground" />
              </div>
              <DialogTitle className="text-xl font-semibold">Import Bookmarks</DialogTitle>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="size-9 hover:bg-muted"
              onClick={() => onOpenChange(false)}
            >
              <X className="size-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
          {/* Left Column - Input */}
          <div className="flex flex-col gap-4 border-b p-6 md:w-2/5 md:border-b-0 md:border-r">
            <div className="space-y-2">
              <label className="text-sm font-medium">Paste Links or Text</label>
              <Textarea
                placeholder="Paste text containing URLs (articles, documents, etc.)"
                value={text}
                onChange={handleTextChange}
                className="h-[200px] resize-none font-mono text-sm md:h-[300px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Global Tags</label>
              <TagsInput
                value={globalTags}
                onValueChange={setGlobalTags}
                placeholder="Add tags for all bookmarks..."
              />
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">Found Links</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedLinks.size} of {links.length} selected
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedLinks(new Set(links.map(l => l.url)))}
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedLinks(new Set())}
                >
                  Clear
                </Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1 rounded-md border">
              <div className="space-y-1 p-4">
                {links.map((link, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-colors",
                      selectedLinks.has(link.url) ? "bg-muted" : "hover:bg-muted/50"
                    )}
                    onClick={() => toggleLinkSelection(link.url)}
                  >
                    {link.status === 'loading' ? (
                      <Loader2 className="mt-0.5 h-4 w-4 animate-spin" />
                    ) : (
                      getTypeIcon(link.type)
                    )}
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium">
                            {link.title || 'Loading...'}
                          </p>
                          {link.siteName && (
                            <p className="text-xs text-muted-foreground">
                              {link.siteName}
                            </p>
                          )}
                        </div>
                        {link.favicon && (
                          <img 
                            src={link.favicon} 
                            alt="" 
                            className="h-4 w-4 rounded-sm"
                          />
                        )}
                      </div>
                      
                      {link.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {link.description}
                        </p>
                      )}

                      {link.status === 'success' && (
                        <div className="mt-2">
                          <TagsInput
                            value={link.tags}
                            onValueChange={(newTags) => {
                              setLinks(prev => prev.map((l, i) => 
                                i === index ? { ...l, tags: newTags } : l
                              ))
                            }}
                            placeholder="Add tags..."
                          />
                        </div>
                      )}

                      {link.image && (
                        <img 
                          src={link.image} 
                          alt="" 
                          className="mt-2 aspect-video w-full rounded-md object-cover"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t px-6 py-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={selectedLinks.size === 0 || isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Import {selectedLinks.size} Bookmarks
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

