import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'

export function useInfiniteScroll(fetchBookmarks) {
  const { ref, inView } = useInView()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(['bookmarks'], fetchBookmarks, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  return { ref, data, isFetchingNextPage }
}

