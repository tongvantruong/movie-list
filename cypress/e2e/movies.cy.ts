// TODO: Split the test file to smaller files, e.g. search, pagination, favorite, cache, to reduce e2e test run time during parallel execution
describe('Searching', () => {
  it('should show loading skeleton before showing data', () => {
    // Delay API to make sure loading skeleton is shown
    cy.delayApiResponse('https://jsonmock.hackerrank.com/api/movies/search*', 2000)
    cy.visit('/')
    assertLoading()
    assertDataIsLoaded()
  })
  it('should be able to search', () => {
    cy.visit('/')
    assertDataIsLoaded()
    assertNumberOfMoviesOnCurrentPage(10)
    searchAndWait('History of the Islands')
    assertNumberOfMoviesOnCurrentPage(1)
  })
  it('should empty message "No movie found" if searched by a weird string', () => {
    cy.visit('/')
    assertDataIsLoaded()
    typeInSearchInput('@No movie matched this text@')
    cy.contains('No movie found').should('be.visible')
  })
  it('should show pagination if more than 1 pages, hide it if has only 1 page', () => {
    cy.visit('/')
    assertDataIsLoaded()
    checkPaginationVisibility(true)
    searchAndWait('History of the Islands')
    checkPaginationVisibility(false)
  })
})

describe('Pagination', () => {
  const pages = [3, 5, 'last']
  pages.forEach((page: string | number) => {
    it(`should be able to open page: ${page}`, () => {
      cy.visit('/')
      assertDataIsLoaded()
      checkPaginationVisibility(true)

      cy.getByDataCy('home-view-movie-list').find('.v-card-item').as('movieItems')

      cy.get('@movieItems')
        .first()
        .find('.movie-item__title')
        .invoke('text')
        .then((firstItemTitle) => {
          if (typeof page === 'number') {
            clickOnPaginationAt(page)
          } else if (page === 'last') {
            clickOnLastPage()
          }
          assertLoading()
          assertDataIsLoaded()

          cy.get('@movieItems')
            .first()
            .find('.movie-item__title')
            .invoke('text')
            .should('not.eq', firstItemTitle)
        })
    })
  })
})

describe('Favorite feature', () => {
  it('should show tooltip when hovered on favorite icon', () => {
    cy.visit('/')
    assertDataIsLoaded()
    cy.getByDataCy('movie-item-icon').first().find('.v-icon').rightclick() // simulate mover over with right click
    cy.getByDataCy('movie-item-tooltip').should('be.visible')
  })
  it('should be able to like/unlike items', () => {
    cy.visit('/')
    assertDataIsLoaded()

    // First item
    assertMovieFavoriteIcon(0, false)
    clickOnFavoriteIcon(0)
    assertMovieFavoriteIcon(0, true)
    clickOnFavoriteIcon(0)
    assertMovieFavoriteIcon(0, false)

    // Third item
    assertMovieFavoriteIcon(2, false)
    clickOnFavoriteIcon(2)
    assertMovieFavoriteIcon(2, true)
    clickOnFavoriteIcon(2)
    assertMovieFavoriteIcon(2, false)
  })
  it('should see favorite items on "Favorites" page \
    - reload should still see it \
    - click on favorite icon to remove it', () => {
    cy.visit('/')
    assertDataIsLoaded()
    assertMovieFavoriteIcon(0, false)
    clickOnFavoriteIcon(0)
    assertMovieFavoriteIcon(0, true)

    cy.getByDataCy('side-bar-nav').contains('Favorites').click()
    assertNumberOfMoviesOnCurrentPage(1)

    cy.reload()
    assertNumberOfMoviesOnCurrentPage(1)

    clickOnFavoriteIcon(0)
    assertNumberOfMoviesOnCurrentPage(0)
    cy.contains('No favorite movie found').should('be.visible')
  })
})

describe('cache', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    cy.visit('/')
  })
  it('should not show loading indicator if searching the same text', () => {
    assertDataIsLoaded()
    typeInSearchInput('a')
    assertLoading()
    assertDataIsLoaded()
    typeInSearchInput('b')
    assertLoading()
    assertDataIsLoaded()
    typeInSearchInput('a')
    assertNoLoading()
    assertDataIsLoaded()
    typeInSearchInput('b')
    assertNoLoading()
    assertDataIsLoaded()
  })
  it('should not show loading indicator if visiting the same page', () => {
    assertDataIsLoaded()
    clickOnPaginationAt(4)
    assertLoading()
    assertDataIsLoaded()
    clickOnPaginationAt(3)
    assertLoading()
    assertDataIsLoaded()
    clickOnPaginationAt(4)
    assertNoLoading()
    assertDataIsLoaded()
    clickOnPaginationAt(3)
    assertNoLoading()
    assertDataIsLoaded()
  })
  it('should not show loading indicator if reloading the same page', () => {
    cy.reload()
    assertNoLoading()
    assertDataIsLoaded()
  })
})

function assertMovieFavoriteIcon(itemIndex: number, isLiked: boolean) {
  const expectedIcon = isLiked ? 'mdi-star' : 'mdi-star-outline'
  cy.getByDataCy('movie-item-icon').eq(itemIndex).find('.v-icon').should('have.class', expectedIcon)
}

function clickOnFavoriteIcon(itemIndex: number) {
  cy.getByDataCy('movie-item-icon').eq(itemIndex).find('.v-icon').click()
}

function clickOnLastPage() {
  cy.getByDataCy('home-view-pagination').find('.v-pagination__last button').click()
}

function clickOnPaginationAt(pageNumber: number) {
  cy.getByDataCy('home-view-pagination').find('.v-pagination__item').contains(pageNumber).click()
}

function searchAndWait(textToSearch: string) {
  cy.getByDataCy('search-input').find('input').clear()
  cy.getByDataCy('search-input').type(textToSearch)
  assertLoading()
  assertDataIsLoaded()
}

function typeInSearchInput(textToSearch: string) {
  cy.getByDataCy('search-input').find('input').clear()
  cy.getByDataCy('search-input').type(textToSearch)
}

function checkPaginationVisibility(isVisible: boolean) {
  if (isVisible) {
    cy.getByDataCy('home-view-pagination').scrollIntoView()
    cy.getByDataCy('home-view-pagination').should('be.visible')
  } else cy.getByDataCy('home-view-pagination').should('not.exist')
}

function assertDataIsLoaded() {
  cy.getByDataCy('home-view-movie-list').should('be.visible')
}

function assertLoading() {
  cy.getByDataCy('loading-skeleton').should('be.visible')
}

function assertNoLoading() {
  cy.getByDataCy('loading-skeleton').should('not.exist')
}

function assertNumberOfMoviesOnCurrentPage(expectedCount: number) {
  cy.get('#main').find('.v-card-item').should('have.length', expectedCount)
}
