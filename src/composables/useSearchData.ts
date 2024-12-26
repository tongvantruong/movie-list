import { StorageSerializers, useSessionStorage, type RemovableRef } from '@vueuse/core'
import { DEFAULT_START_PAGE } from '@/const/pagination'
import { computed, type ComputedRef } from 'vue'

type SearchData = {
  searchedText: string
  page: number
}

const defaultData: SearchData = {
  searchedText: '',
  page: DEFAULT_START_PAGE,
}

export function useSearchData(storageKey: string) {
  const storage: RemovableRef<SearchData> = useSessionStorage(storageKey, defaultData, {
    serializer: StorageSerializers.object,
  })

  function updateSearchData(data: Partial<SearchData>) {
    storage.value = {
      ...storage.value,
      ...data,
    }
  }

  const searchedText: ComputedRef<string> = computed(() => storage.value.searchedText)
  const page: ComputedRef<number> = computed(() => storage.value.page)

  return {
    updateSearchData,
    searchedText,
    page,
  }
}
