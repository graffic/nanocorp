describe('Campaign List', () => {
  it('shows elements', () => {
    cy.visit('/')
    cy.get('tbody > tr').should('have.length', 3)
  })

  it('navigates to platform', () => {
    cy.visit('/')
    cy.get('tbody >  tr:first').find('a[href$=google]').click()
  })

  it('goes directly to platform and back', () => {
    cy.visit('/campaign/100000001/google')
    cy.get('a[href="/"]').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/')
    })
  })
})