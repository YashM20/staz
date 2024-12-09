'use client'

import { useState } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { MainContent } from '@/components/main-content'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ViewProvider } from '@/components/view-provider'
import { BookmarkProvider } from '@/components/bookmark-provider'

export default function Home() {
  console.log('Home', process.env.DATABASE_URL)
  return (
    <SidebarProvider defaultOpen>
      <ViewProvider>
        <BookmarkProvider>
          <div className="flex h-screen bg-background">
            <AppSidebar />
            <MainContent />
          </div>
        </BookmarkProvider>
      </ViewProvider>
    </SidebarProvider>
  )
}

