'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { Cloud, FileText, Hash, Image, Link2, Video } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { useBookmarks } from '@/components/bookmark-provider'

export function AppSidebar() {
  const { bookmarks, filters, setFilters } = useBookmarks()

  const counts = {
    all: bookmarks.length,
    unsorted: bookmarks.filter(b => !b.tags.length).length,
    notes: bookmarks.filter(b => b.type === 'note').length,
    links: bookmarks.filter(b => b.type === 'link').length,
    images: bookmarks.filter(b => b.type === 'image').length,
    videos: bookmarks.filter(b => b.type === 'video').length,
  }

  const tags = Array.from(
    new Set(bookmarks.flatMap(b => b.tags))
  ).map(tag => ({
    name: tag,
    count: bookmarks.filter(b => b.tags.includes(tag)).length
  }))

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="p-4">
          <h2 className="text-lg font-semibold">yashsecond606</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setFilters({ type: 'all' })}
                isActive={filters.type === 'all'}
              >
                <Cloud className="w-4 h-4 mr-2" />
                <span>All bookmarks</span>
                <span className="ml-auto text-muted-foreground">{counts.all}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setFilters({ type: 'unsorted' })}
                isActive={filters.type === 'unsorted'}
              >
                <FileText className="w-4 h-4 mr-2" />
                <span>Unsorted</span>
                <span className="ml-auto text-muted-foreground">{counts.unsorted}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Filters</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setFilters({ type: 'note' })}
                  isActive={filters.type === 'note'}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <span>Notes</span>
                  <span className="ml-auto text-muted-foreground">{counts.notes}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setFilters({ type: 'link' })}
                  isActive={filters.type === 'link'}
                >
                  <Link2 className="w-4 h-4 mr-2" />
                  <span>Links</span>
                  <span className="ml-auto text-muted-foreground">{counts.links}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setFilters({ type: 'image' })}
                  isActive={filters.type === 'image'}
                >
                  <Image className="w-4 h-4 mr-2" />
                  <span>Images</span>
                  <span className="ml-auto text-muted-foreground">{counts.images}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setFilters({ type: 'video' })}
                  isActive={filters.type === 'video'}
                >
                  <Video className="w-4 h-4 mr-2" />
                  <span>Videos</span>
                  <span className="ml-auto text-muted-foreground">{counts.videos}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tags ({tags.length})</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tags.map(tag => (
                <SidebarMenuItem key={tag.name}>
                  <SidebarMenuButton
                    onClick={() => setFilters({ tag: tag.name })}
                    isActive={filters.tag === tag.name}
                  >
                    <Hash className="w-4 h-4 mr-2" />
                    <span>{tag.name}</span>
                    <span className="ml-auto text-muted-foreground">{tag.count}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

