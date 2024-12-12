# Component System Documentation

## Core Components

### Layout Components
1. **AppSidebar**
   - Main navigation sidebar
   - Filters and categorization
   - Dynamic counts and statistics

2. **MainContent**
   - Bookmark grid display
   - Responsive layout
   - Scroll-to-top functionality

### Bookmark Components
1. **BookmarkCard**
   ```typescript
   interface BookmarkCardProps {
     bookmark: Bookmark
     onPreview: () => void
     view: 'list' | 'grid' | 'headlines' | 'moodboard'
     isFocused?: boolean
     onReadLater: (id: string) => void
   }
   ```

2. **AddBookmarkDialog**
   - URL input with metadata extraction
   - Tag management
   - Custom fields
   - Preview functionality

### UI Components
1. **Dialog System**
   - Modal dialogs
   - Confirmation dialogs
   - Form dialogs

2. **Context Menus**
   - Right-click actions
   - Dropdown menus
   - Action menus

### State Management
1. **BookmarkProvider**
   ```typescript
   interface BookmarkContextType {
     bookmarks: Bookmark[]
     filteredBookmarks: Bookmark[]
     filters: { type?: string; tag?: string }
     // ... other state
   }
   ```

### Theme Components
1. **ThemeProvider**
   - Dark/Light mode support
   - Custom color schemes
   - Dynamic theme switching 