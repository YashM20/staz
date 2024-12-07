'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { TagsInput } from '@/components/custom/TagsInput'

interface BookmarkData {
  title: string;
  description: string;
  image: string;
  type: string;
  tags: string[];
}

export function ImportDialog({ isOpen, onClose, onImport }: { isOpen: boolean, onClose: () => void, onImport: (bookmarks: any[]) => void }) {
  const [url, setUrl] = useState('')
  const [file, setFile] = useState(null)
  const [isExtracting, setIsExtracting] = useState(false)
  const [bookmarkData, setBookmarkData] = useState<BookmarkData>({
    title: '',
    description: '',
    image: '',
    type: 'link',
    tags: [],
  })

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  const extractUrlInfo = async () => {
    if (!url) return
    
    setIsExtracting(true)
    try {
      const response = await fetch('/api/extract-url-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      
      const data = await response.json()
      setBookmarkData({
        title: data.title || '',
        description: data.description || '',
        image: data.image || '',
        type: data.type || 'link',
        tags: data.tags || [],
      })
    } catch (error) {
      console.error('Error extracting URL info:', error)
    } finally {
      setIsExtracting(false)
    }
  }

  const handleFileChange = (e: any) => {
    setFile(e.target.files?.[0] || null)
  }

  const handleImport = () => {
    if (url) {
      onImport([{
        ...bookmarkData,
        url,
        date: new Date().toISOString(),
        source: new URL(url).hostname,
      }])
      onClose()
    } else if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const bookmarks = JSON.parse(e.target?.result as string)
        onImport(bookmarks)
        onClose()
      }
      reader.readAsText(file)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Bookmarks</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input 
              type="url" 
              placeholder="Enter URL"
              value={url}
              onChange={handleUrlChange}
              className="flex-1"
            />
            <Button 
              onClick={extractUrlInfo} 
              disabled={!url || isExtracting}
              variant="secondary"
            >
              {isExtracting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Extract Info'
              )}
            </Button>
          </div>

          {url && (
            <>
              <Input 
                placeholder="Title"
                value={bookmarkData.title}
                onChange={(e) => setBookmarkData(prev => ({ ...prev, title: e.target.value }))}
              />
              <Input 
                placeholder="Description"
                value={bookmarkData.description}
                onChange={(e) => setBookmarkData(prev => ({ ...prev, description: e.target.value }))}
              />
              <TagsInput
                placeholder="Add tags..."
                value={bookmarkData.tags}
                onValueChange={(newTags) => setBookmarkData(prev => ({ ...prev, tags: newTags }))}
              />
            </>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or import from file
              </span>
            </div>
          </div>

          <Input type="file" onChange={handleFileChange} accept=".json" />
          
          <Button 
            onClick={handleImport} 
            disabled={(!file && !url) || isExtracting}
            className="w-full"
          >
            Import
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

