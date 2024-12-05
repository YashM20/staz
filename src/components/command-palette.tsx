'use client'

import { Command } from 'cmdk'

export function CommandPalette() {
  return (
    <Command>
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Group heading="Actions">
          <Command.Item>Add Bookmark</Command.Item>
          <Command.Item>Search Bookmarks</Command.Item>
          <Command.Item>Import Bookmarks</Command.Item>
        </Command.Group>
        <Command.Group heading="Recent">
          {/* Recent bookmarks */}
        </Command.Group>
      </Command.List>
    </Command>
  )
}

