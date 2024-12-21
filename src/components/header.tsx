'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Search, Plus, Grid, List, Download, ChevronDown, ArrowUpDown, LayoutGrid, ImageIcon, Sun, Moon, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
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
import { toast } from 'sonner'
import { BookmarkFormData } from '@/types/bookmark'
import { addBookmark } from '@/app/actions/bookmark-actions'
import { useBookmarkStats } from '@/hooks/use-bookmark-stats'
import { useSession, signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
  const { setStats } = useBookmarkStats()
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])



  if (!mounted) return null

  if (window.location.pathname === '/login') return null

  const viewIcons = {
    list: <List className="size-4" />,
    grid: <Grid className="size-4" />,
    headlines: <LayoutGrid className="size-4" />,
    moodboard: <ImageIcon className="size-4" />,
  }

  const handleImport = async (bookmarks: BookmarkFormData[]) => {
    let successCount = 0
    let failedCount = 0

    for (const bookmark of bookmarks) {
      try {
        const result = await addBookmark(bookmark)
        if (result.success) {
          successCount++
          if (result.stats) {
            setStats(result.stats)
          }
        } else {
          failedCount++
        }
      } catch (error) {
        failedCount++
        console.error('Failed to import bookmark:', error)
      }
    }

    if (failedCount === 0) {
      toast.success(`Successfully imported ${successCount} bookmarks`, {
        description: 'Your bookmarks have been imported successfully.'
      })
    } else {
      toast.error(`Failed to import ${failedCount} bookmarks`, {
        description: 'Some bookmarks could not be imported. Please try again.'
      })
    }

    setShowImportDialog(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-background pl-9"
            />
          </div>
        </div>

        {/* Right side */}
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
                <List className="mr-2 size-4" />
                List
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView('grid')}>
                <Grid className="mr-2 size-4" />
                Grid
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView('headlines')}>
                <LayoutGrid className="mr-2 size-4" />
                Headlines
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView('moodboard')}>
                <ImageIcon className="mr-2 size-4" />
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
            <ArrowUpDown className="mr-2 size-4" />
            <span className="hidden sm:inline-block">Sort by {sortBy === 'name' ? 'Date' : 'Name'}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
          >
            <Download className="mr-2 size-4" />
            <span className="hidden sm:inline-block">Export</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                size="sm"
              >
                <Plus className="mr-2 size-4" />
                <span className="hidden sm:inline-block">Add</span>
                <ChevronDown className="ml-2 size-4" />
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

          {/* User Profile Menu */}
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-9 w-9 rounded-full border border-border/40 bg-background/95 p-0.5 shadow-sm transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <Avatar className="h-full w-full">
                    <AvatarImage 
                      src={session.user.image || ''} 
                      alt={session.user.name || ''} 
                      className="object-cover"
                    />
                    <AvatarFallback 
                      className="bg-accent text-sm font-medium"
                      delayMs={300}
                    >
                      {session.user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56" 
                align="end" 
                forceMount
                sideOffset={8}
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm font-medium leading-none">{session.user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="flex items-center text-muted-foreground hover:text-foreground focus:text-foreground"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => router.push('/login')}
              className="ml-2"
            >
              Sign In
            </Button>
          )}

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AddBookmarkDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />
      
      <ImportDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onImport={handleImport}
      />
    </header>
  )
}

