'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Twitter, Linkedin, Link } from 'lucide-react'
import { toast, useToast } from '@/hooks/use-toast'

export function ShareDialog({ isOpen, onClose, bookmark }: { isOpen: boolean, onClose: () => void, bookmark: any }) {
  const shareUrl = `${window.location.origin}/bookmark/${bookmark.id}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "Copied to clipboard",
      description: "The bookmark URL has been copied to your clipboard",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Bookmark</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input value={shareUrl} readOnly />
          <div className="flex justify-between">
            <Button onClick={copyToClipboard}>
              <Link className="mr-2 h-4 w-4" />
              Copy Link
            </Button>
            <Button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`)}>
              <Twitter className="mr-2 h-4 w-4" />
              Share on Twitter
            </Button>
            <Button onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`)}>
              <Linkedin className="mr-2 h-4 w-4" />
              Share on LinkedIn
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

