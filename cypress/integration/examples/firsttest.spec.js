describe('first test', () => {
  it('Navigate to site', () => {
    cy.visit('https://fitbittester.herokuapp.com/')
  })
  it('Login client test', () => {
    cy.get('input[id=InputUser').type('{selectall}{backspace}')
    cy.get('input[id=InputUser').type('test@email.com')
    cy.get('input[id=InputPassword').type('123456')
    cy.get('a[class="btn btn-lg btn-success"]').click()

  })
  it('client add meds', () => {
    cy.get('button[class="btn btn-md btn-success"]').click()
    cy.get('input[placeholder="Medicine Name"').type('test')
    cy.get('input[placeholder="medDate"').type('test')
    cy.get('input[placeholder="medTime"').type('test')
    cy.get('button[class="btn btn-md btn-success"]').click()
    //opens again for back
    cy.get('button[class="btn btn-md btn-success"]').click()
    cy.get('button[class="btn btn-sm btn-danger"]').click()
  })
  it('client settings', () => {
    cy.get('a[routerLink="../settings"]').click()
    
  })
})