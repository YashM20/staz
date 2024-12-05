'use client'

import { Bar } from 'react-chartjs-2'
import { useBookmarks } from './bookmark-provider'

export function Statistics() {
  const { bookmarks } = useBookmarks()

  const tagCounts = bookmarks.reduce((acc: any, bookmark: any) => {
    bookmark.tags.forEach((tag: string) => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {})

  const data = {
    labels: Object.keys(tagCounts),
    datasets: [
      {
        label: 'Bookmarks per Tag',
        data: Object.values(tagCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bookmark Statistics</h2>
      <Bar data={data} options={options} />
    </div>
  )
}

