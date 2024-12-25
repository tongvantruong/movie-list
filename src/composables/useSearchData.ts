import { SESSION_KEY_SEARCH_DATA } from '@/const/key'
import { StorageSerializers, useSessionStorage } from '@vueuse/core'
import { DEFAULT_START_PAGE } from '@/const/pagination'

type SearchData = {
  searchedText: string
  page: number
}

const defaultData: SearchData = {
  searchedText: '',
  page: DEFAULT_START_PAGE,
}

export function useSearchData() {
  const storage = useSessionStorage<SearchData>(SESSION_KEY_SEARCH_DATA, defaultData, {
    serializer: StorageSerializers.object,
  })

  function setData(data: Partial<SearchData>) {
    storage.value = {
      ...storage.value,
      ...data,
    }
  }

  return {
    setData,
    searchedText: storage.value.searchedText,
    page: storage.value.page,
    searchDataRef: storage,
  }
}
