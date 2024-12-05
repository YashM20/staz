export interface Bookmark {
  id: string
  title: string
  description?: string
  url: string
  image?: string
  type: 'link' | 'article' | 'resource' | 'note' | 'image' | 'video'
  tags: string[]
  source: string
  date: string
  highlights?: string[]
  note?: string
}

