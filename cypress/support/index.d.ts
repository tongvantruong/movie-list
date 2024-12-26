declare namespace Cypress {
  interface Chainable {
    delayApiResponse(url: string, delayTimeMs: number = 1000): Chainable<unknown>
    getByDataCy(query: string): Chainable<JQuery<HTMLElement>>
  }
}
