import {queryCache, useMutation, useQuery} from 'react-query'
import {client} from './api-client.exercise'

export const useListItems = (user) => {
  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client(
        `list-items`,
        {
          token: user.token,
        })
        .then(data => data.listItems),
  })
  return listItems ?? []
}

export const useListItem = (user, bookId) => {
  const listItems = useListItems(user)
  return listItems.find(li => li.bookId === bookId) ?? null
}

export const useUpdateListItem = (user) => useMutation(
  (updates) => client(`list-items/${updates.id}`,
    {
      method: 'PUT',
      data: updates,
      token: user.token,
    }),
  {
    onSettled: () => {
      queryCache.invalidateQueries('list-items')
    },
  },
)

export const useRemoveListItem = (user) => useMutation(
  (id) => client(`list-items/${id}`,
    {
      method: 'DELETE',
      token: user.token,
    }),
  {
    onSettled: () => {
      queryCache.invalidateQueries('list-items')
    },
  },
)

export const useCreateListItem = (user) => useMutation(
  (bookId) => client(`list-items`,
    {
      data: {
        bookId,
      },
      token: user.token,
    }),
  {
    onSettled: () => {
      queryCache.invalidateQueries('list-items')
    },
  },
)