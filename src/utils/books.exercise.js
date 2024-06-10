import {useQuery} from 'react-query'
import {client} from './api-client'
import bookPlaceholderSvg from '../assets/book-placeholder.svg'

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
}

const loadingBooks = Array.from({length: 10}, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}))

export const useBookSearch = (searchQuery, user) => {
  const query = useQuery({
    queryKey: ['bookSearch', searchQuery],
    queryFn: () =>
      client(
        `books?query=${encodeURIComponent(searchQuery)}`,
        {
          token: user.token,
        })
        .then(data => data.books),
  })
  return {...query, books: query.data ?? loadingBooks}
}

export const useBook = (bookId, user) => {
  const {data} = useQuery({
    queryKey: ['book', {bookId}],
    queryFn: () =>
      client(`books/${bookId}`,
        {
          token: user.token,
        })
        .then(d => d.book),
  })
  return data ?? loadingBook
}
