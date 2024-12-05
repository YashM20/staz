'use client'

import { motion } from 'motion/react'
import { Cloud, FileText, Link2, Image, Video, Hash, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  count?: number
  isActive?: boolean
  indent?: boolean
}

const SidebarItem = ({ icon, label, count, isActive, indent }: SidebarItemProps) => (
  <motion.div
    whileHover={{ x: 4 }}
    className={cn(
      "flex items-center px-3 py-2 rounded-lg cursor-pointer",
      isActive ? "bg-white/10" : "hover:bg-white/5",
      indent ? "ml-4" : ""
    )}
  >
    <div className="flex items-center flex-1">
      {icon}
      <span className="ml-3">{label}</span>
    </div>
    {count !== undefined && (
      <span className="text-sm text-gray-400">{count}</span>
    )}
  </motion.div>
)

export function Sidebar() {
  return (
    <div className="w-64 bg-[#1E1E1E] border-r border-white/10 h-screen overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <span className="text-sm font-medium">yashsecond606</span>
          </div>
        </div>

        <SidebarItem
          icon={<Cloud className="w-5 h-5" />}
          label="All bookmarks"
          count={260}
          isActive
        />

        <SidebarItem
          icon={<FileText className="w-5 h-5" />}
          label="Unsorted"
          count={3}
        />

        <div className="mt-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">
            Collections
          </div>
          <SidebarItem
            icon={<Hash className="w-5 h-5" />}
            label="tabs"
            count={257}
          />
        </div>

        <div className="mt-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">
            Filters
          </div>
          <SidebarItem
            icon={<FileText className="w-5 h-5" />}
            label="Notes"
            count={1}
          />
          <SidebarItem
            icon={<Link2 className="w-5 h-5" />}
            label="Links"
            count={244}
          />
          <SidebarItem
            icon={<FileText className="w-5 h-5" />}
            label="Articles"
            count={13}
          />
          <SidebarItem
            icon={<Image className="w-5 h-5" />}
            label="Images"
            count={2}
          />
          <SidebarItem
            icon={<Video className="w-5 h-5" />}
            label="Video"
            count={1}
          />
          <SidebarItem
            icon={<Hash className="w-5 h-5" />}
            label="Without tags"
            count={257}
          />
        </div>

        <div className="mt-6">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2">
            Tags (4)
          </div>
          <SidebarItem
            icon={<Hash className="w-5 h-5" />}
            label="ai"
            count={2}
            indent
          />
          <SidebarItem
            icon={<Hash className="w-5 h-5" />}
            label="api"
            count={2}
            indent
          />
          <SidebarItem
            icon={<Hash className="w-5 h-5" />}
            label="huggingface"
            count={1}
            indent
          />
          <SidebarItem
            icon={<Hash className="w-5 h-5" />}
            label="qr"
            count={1}
            indent
          />
        </div>
      </div>
    </div>
  )
}

