'use client'

import { createContext, useContext, useState } from 'react'
import { type ViewType, type DisplayOptions } from '@/types/view'

interface ViewContextType {
  view: ViewType
  setView: (view: ViewType) => void
  displayOptions: DisplayOptions
  setDisplayOptions: (options: DisplayOptions) => void
}

const ViewContext = createContext<ViewContextType | undefined>(undefined)

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<ViewType>('grid')
  const [displayOptions, setDisplayOptions] = useState<DisplayOptions>({
    showCover: true,
    showTitle: true,
    showDescription: true,
    showTags: true,
    showInfo: true,
  })

  return (
    <ViewContext.Provider
      value={{ view, setView, displayOptions, setDisplayOptions }}
    >
      {children}
    </ViewContext.Provider>
  )
}

export function useView() {
  const context = useContext(ViewContext)
  if (!context) {
    throw new Error('useView must be used within a ViewProvider')
  }
  return context
}

