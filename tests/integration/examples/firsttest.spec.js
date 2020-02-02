<<<<<<< HEAD:cypress/integration/examples/firsttest.spec.js
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
  it('client settings alexa', () => {
    //cy.get('a[routerLink=""]').click()
  })
  it('client settings fitbit', () => {
    //cy.get('a[routerLink=""]').click()
  })
  it('client settings name change', () => {
    cy.get('button[class="btn btn-md btn-primary"]').click()
    cy.get('input[placeholder="First Name"]').type('test')
    cy.get('input[placeholder="Last Name"]').type('test')
    cy.contains('Save').click()
    cy.get('a[routerLink="../cmain"]').click()
  })
  
  it('client timeline', () => {
    cy.get('img').click()
    cy.contains('Week').click()
    cy.contains('Month').click()
    cy.contains('Year').click()
    cy.contains('Table').click()
    cy.get('a[routerLink="../cmain"]').click()
  })
  it('logout', () => {
    cy.get('a[routerLink="../settings"]').click()
    cy.contains('Logout').click()

  })
  it('admin login', () => {
    cy.get('input[id=InputUser').type('{selectall}{backspace}')
    cy.get('input[id=InputUser').type('admin@email.com')
    cy.get('input[id=InputPassword').type('123456')
    cy.get('a[class="btn btn-lg btn-success"]').click()

  })
  it('adding a patient', () => {
    cy.contains('Add').click()
    cy.contains('Back').click()
    cy.contains('Add').click()
    cy.get('input[placeholder="Name"]').type('test')
    cy.get('input[placeholder="Reference Number"]').type('test123')
    cy.contains('Add').click()

  })
  it('logout', () => {
    cy.get('a[routerLink="../asettings"]').click()
    cy.contains('Logout').click()

  })

})
=======
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
  it('navigate to client settings', () => {
    cy.get('a[routerLink="../settings"]').click()
    
  })
})
>>>>>>> c28f9898c1bbebcab4715155fa70b2460236f2c1:tests/integration/examples/firsttest.spec.js
