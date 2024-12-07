'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Search, Plus, Grid, List, Download, ChevronDown, ArrowUpDown, LayoutGrid, ImageIcon, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { AddBookmarkDialog } from './add-bookmark-dialog'
import { ImportDialog } from './import-dialog'
import { cn } from '@/lib/utils'
import { useBookmarks } from './bookmark-provider'
import { useTheme } from 'next-themes'

export function Header() {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    view,
    setView,
    displayOptions,
    setDisplayOptions
  } = useBookmarks()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showImportDialog, setShowImportDialog] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const viewIcons = {
    list: <List className="h-4 w-4" />,
    grid: <Grid className="h-4 w-4" />,
    headlines: <LayoutGrid className="h-4 w-4" />,
    moodboard: <ImageIcon className="h-4 w-4" />,
  }

  return (
    <div className="sticky top-0 z-50 bg-background border-b">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center flex-1 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {viewIcons[view]}
                <span className="ml-2 hidden sm:inline-block">{view.charAt(0).toUpperCase() + view.slice(1)}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>View</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setView('list')}>
                <List className="mr-2 h-4 w-4" />
                List
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView('grid')}>
                <Grid className="mr-2 h-4 w-4" />
                Grid
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView('headlines')}>
                <LayoutGrid className="mr-2 h-4 w-4" />
                Headlines
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView('moodboard')}>
                <ImageIcon className="mr-2 h-4 w-4" />
                Moodboard
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Show in cards</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={displayOptions.showCover}
                onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, showCover: checked })}
              >
                Cover
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={displayOptions.showTitle}
                onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, showTitle: checked })}
              >
                Title
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={displayOptions.showNote}
                onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, showNote: checked })}
              >
                Note
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={displayOptions.showDescription}
                onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, showDescription: checked })}
              >
                Description
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={displayOptions.showHighlights}
                onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, showHighlights: checked })}
              >
                Highlights
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={displayOptions.showTags}
                onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, showTags: checked })}
              >
                Tags
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={displayOptions.showInfo}
                onCheckedChange={(checked) => setDisplayOptions({ ...displayOptions, showInfo: checked })}
              >
                Bookmark info
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortBy(sortBy === 'name' ? 'date' : 'name')}
          >
            <ArrowUpDown className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline-block">Sort by {sortBy === 'name' ? 'Date' : 'Name'}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline-block">Export</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline-block">Add</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowAddDialog(true)}>
                Add bookmark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowImportDialog(true)}>
                Import bookmarks
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <AddBookmarkDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
      
      <ImportDialog
        isOpen={showImportDialog}
        onClose={() => setShowImportDialog(false)}
        onImport={(bookmarks) => {
          // Implement import functionality using the bookmark context
          setShowImportDialog(false)
        }}
      />
    </div>
  )
}

