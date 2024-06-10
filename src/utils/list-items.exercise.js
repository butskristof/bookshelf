import {queryCache, useMutation, useQuery} from 'react-query'
import {client} from './api-client.exercise'
import {setQueryDataForBook} from './books'

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
    config: {
      onSuccess(listItems) {
        for (const item of listItems)
          setQueryDataForBook(item.book);
      }
    }
  })
  return listItems ?? []
}

export const useListItem = (user, bookId) => {
  const listItems = useListItems(user)
  return listItems.find(li => li.bookId === bookId) ?? null
}

const defaultMutationConfig = {
  onSettled: () => {
    queryCache.invalidateQueries('list-items')
  },
}

export const useUpdateListItem = (user, config = {}) => useMutation(
  (updates) => client(`list-items/${updates.id}`,
    {
      method: 'PUT',
      data: updates,
      token: user.token,
    }),
  {
    ...defaultMutationConfig,
    ...config,
  },
)

export const useRemoveListItem = (user, config) => useMutation(
  (id) => client(`list-items/${id}`,
    {
      method: 'DELETE',
      token: user.token,
    }),
  {
    ...defaultMutationConfig,
    ...config,
  },
)

export const useCreateListItem = (user, config) => useMutation(
  (bookId) => client(`list-items`,
    {
      data: {
        bookId,
      },
      token: user.token,
    }),
  {
    ...defaultMutationConfig,
    ...config,
  },
)