'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function SearchFilters({ onFilterChange }: { onFilterChange: (filter: string, value: string) => void }) {
  return (
    <div className="flex items-center space-x-2">
      <Select onValueChange={(value) => onFilterChange('type', value)}>
        <SelectTrigger>
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="article">Articles</SelectItem>
          <SelectItem value="image">Images</SelectItem>
          <SelectItem value="video">Videos</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('date', value)}>
        <SelectTrigger>
          <SelectValue placeholder="Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All time</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">This week</SelectItem>
          <SelectItem value="month">This month</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

