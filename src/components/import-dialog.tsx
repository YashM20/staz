'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function ImportDialog({ isOpen, onClose, onImport }: { isOpen: boolean, onClose: () => void, onImport: (bookmarks: any[]) => void }) {
  const [file, setFile] = useState(null)

  const handleFileChange = (e: any) => {
    setFile(e.target.files?.[0] || null)
  }

  const handleImport = () => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const bookmarks = JSON.parse(e.target?.result as string)
        onImport(bookmarks)
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
          <Input type="file" onChange={handleFileChange} accept=".json" />
          <Button onClick={handleImport} disabled={!file}>
            Import
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

