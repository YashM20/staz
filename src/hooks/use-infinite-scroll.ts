import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export function useInfiniteScroll(fetchBookmarks: any) {
  const { ref, inView } = useInView()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['bookmarks'],
    queryFn: fetchBookmarks,
    initialPageParam: null,
    getNextPageParam: (lastPage: any) => lastPage.nextCursor,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  return { ref, data, isFetchingNextPage }
}

