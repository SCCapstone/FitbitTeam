describe('login and add client medication test', () => {
  it('Navigate to site', () => {
    cy.visit('https://fitbittester.herokuapp.com/')
  })
  it('Login client test', () => {
    cy.get('input[id=InputUser').type('{selectall}{backspace}')
    cy.get('input[id=InputUser').type('test@email.com')
    cy.get('input[id=InputPassword').type('123456')
    cy.get('a[class="btn btn-lg btn-success"]').click()

  })
  it('navigate to client settings', () => {
    cy.get('a[routerLink="../settings"]').click()
  })
})
