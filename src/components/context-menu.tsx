'use client'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'

export function BookmarkContextMenu({ children, onEdit, onDelete, onShare }: { children: React.ReactNode, onEdit: () => void, onDelete: () => void, onShare: () => void }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={onEdit}>Edit</ContextMenuItem>
        <ContextMenuItem onClick={onShare}>Share</ContextMenuItem>
        <ContextMenuItem onClick={onDelete} className="text-red-500">
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

