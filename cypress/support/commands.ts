Cypress.Commands.add('delayApiResponse', (url, delayTimeMs = 1000) => {
  cy.intercept(url, (req) => {
    req.on('response', (res) => {
      res.setDelay(delayTimeMs)
    })
  })
})

Cypress.Commands.add('getByDataCy', (query) => cy.get(`[data-cy="${query}"]`))
