'use client'

import { useEffect } from 'react'
import { useBookmarkStats } from '@/hooks/use-bookmark-stats'
import { getBookmarkStats } from '@/app/actions/stats-actions'
import { useBookmarks } from './bookmark-provider'
import { motion } from 'motion/react'
import { Cloud, FileText, Link2, Image, Video, Hash, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  count?: number
  isActive?: boolean
  indent?: boolean
  isLoading?: boolean
  onClick?: () => void
}

const SidebarItem = ({ icon, label, count, isActive, indent, isLoading, onClick }: SidebarItemProps) => (
  <motion.div
    whileHover={{ x: 4 }}
    className={cn(
      "flex items-center px-3 py-2 rounded-lg cursor-pointer",
      isActive ? "bg-white/10" : "hover:bg-white/5",
      indent ? "ml-4" : ""
    )}
    onClick={onClick}
  >
    <div className="flex flex-1 items-center">
      {icon}
      <span className="ml-3">{label}</span>
    </div>
    {isLoading ? (
      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
    ) : (
      <span className="text-sm text-muted-foreground">{count ?? 0}</span>
    )}
  </motion.div>
)

export function Sidebar() {
  const { stats, setStats, isLoading, setIsLoading } = useBookmarkStats()
  const { filters, setFilters } = useBookmarks()

  useEffect(() => {
    async function loadStats() {
      setIsLoading(true)
      try {
        const data = await getBookmarkStats()
        setStats(data)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [setStats, setIsLoading])

  const handleFilterClick = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  return (
    <div className="h-screen w-64 overflow-y-auto border-r border-white/10 bg-[#1E1E1E]">
      <div className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-medium">yashsecond606</span>
          </div>
        </div>

        <SidebarItem
          icon={<Cloud className="size-5" />}
          label="All bookmarks"
          count={stats?.total}
          isActive={!filters.type && !filters.tag}
          isLoading={isLoading}
          onClick={() => handleFilterClick({})}
        />

        <SidebarItem
          icon={<FileText className="size-5" />}
          label="Unsorted"
          count={stats?.unsorted}
          isActive={filters.type === 'unsorted'}
          isLoading={isLoading}
          onClick={() => handleFilterClick({ type: 'unsorted' })}
        />

        <div className="mt-6">
          <div className="mb-2 text-xs font-semibold uppercase text-gray-400">
            Collections
          </div>
          <SidebarItem
            icon={<Hash className="size-5" />}
            label="tabs"
            count={stats?.tags['tabs'] || 0}
          />
        </div>

        <div className="mt-6">
          <div className="mb-2 text-xs font-semibold uppercase text-gray-400">
            Filters
          </div>
          <SidebarItem
            icon={<FileText className="size-5" />}
            label="Notes"
            count={stats?.types['note'] || 0}
          />
          <SidebarItem
            icon={<Link2 className="size-5" />}
            label="Links"
            count={stats?.types['link'] || 0}
          />
          <SidebarItem
            icon={<FileText className="size-5" />}
            label="Articles"
            count={stats?.types['article'] || 0}
          />
          <SidebarItem
            icon={<Image className="size-5" />}
            label="Images"
            count={stats?.types['image'] || 0}
          />
          <SidebarItem
            icon={<Video className="size-5" />}
            label="Video"
            count={stats?.types['video'] || 0}
          />
          <SidebarItem
            icon={<Hash className="size-5" />}
            label="Without tags"
            count={stats?.tags[''] || 0}
          />
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase text-gray-400">
            <span>Tags</span>
            {isLoading && <Loader2 className="h-3 w-3 animate-spin" />}
          </div>
          {Object.entries(stats?.tags ?? {}).map(([tag, count]) => (
            <SidebarItem
              key={tag}
              icon={<Hash className="size-5" />}
              label={tag}
              count={count}
              isActive={filters.tag === tag}
              indent
              onClick={() => handleFilterClick({ tag })}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

