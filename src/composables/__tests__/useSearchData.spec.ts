import { describe, it, expect } from 'vitest'
import { useSearchData } from '@/composables/useSearchData'

describe('useSearchData', () => {
  it('should return empty searchText and 1 as page by default', () => {
    const { searchedText, page } = useSearchData('test-key')
    expect(searchedText.value).toBe('')
    expect(page.value).toBe(1)
  })
  it('should be able to update searched text', () => {
    const { searchedText, updateSearchData } = useSearchData('test-key')
    const expectedText = 'new search'
    updateSearchData({ searchedText: expectedText })
    expect(searchedText.value).toBe(expectedText)
  })
  it('should be able to update page', () => {
    const { page, updateSearchData } = useSearchData('test-key')
    const expectedPage = 3
    updateSearchData({ page: expectedPage })
    expect(page.value).toBe(expectedPage)
  })
  it('should be able to update both searched text and page', () => {
    const { searchedText, page, updateSearchData } = useSearchData('test-key')
    const expectedSearchedText = 'search'
    const expectedPage = 3
    updateSearchData({ searchedText: expectedSearchedText, page: expectedPage })
    expect(searchedText.value).toBe(expectedSearchedText)
    expect(page.value).toBe(expectedPage)
  })
})
