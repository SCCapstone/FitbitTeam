describe('first test', () => {
  it('Navigate to site', () => {
    cy.visit('http://fitbittesterv2.herokuapp.com/login')
  })
  it('Login client test', () => {
    cy.get('input[id=InputUser').type('{selectall}{backspace}')
    cy.get('input[id=InputUser').type('test@email.com')
    cy.get('input[id=InputPassword').type('123456')
    cy.get('a[class="btn btn-lg btn-info"]').click()

  })
  it('client add meds', () => {
    cy.contains('Add a Medication').click()
    cy.get('input[placeholder="Medicine Name"').type('test')
    cy.get('select').select('W') // Select the 'W' option
    cy.get('input[placeholder="medTime"').type('12:35:00')
    cy.contains('Add').click()
    //opens again for back
    cy.contains('Add a Medication').click()
    cy.contains('Back').click()
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
    cy.contains('Edit').click()
    cy.get('input[placeholder="First Name"]').type('test')
    cy.get('input[placeholder="Last Name"]').type('test')
    cy.contains('Save').click()
    cy.get('a[routerLink="../cmain"]').click()
  })
  
  it('client timeline', () => {
    cy.contains('Status:').click()
    cy.contains('Table').click()
    cy.get('i[class="glyphicon glyphicon-home"]').click()
  })
  it('logout', () => {
    cy.get('a[routerLink="../settings"]').click()
    cy.contains('Logout').click()

  })
  it('admin login', () => {
    cy.get('input[id=InputUser').type('{selectall}{backspace}')
    cy.get('input[id=InputUser').type('admin@email.com')
    cy.get('input[id=InputPassword').type('123456')
    cy.get('a[class="btn btn-lg btn-info"]').click()

  })
  it('adding a patient', () => {
    cy.contains('Add a Patient').click()
    cy.contains('Cancel').click()
    cy.contains('Add a Patient').click()
    cy.get('input[placeholder="Reference Number"]').type('test123')
    cy.contains('Add').click()

  })
  it('logout', () => {
    cy.get('a[routerLink="../asettings"]').click()
    cy.contains('Logout').click()

  })

})
describe('login and add client medication test', () => {
  it('Navigate to site', () => {
    cy.visit('http://fitbittesterv2.herokuapp.com/login')
  })
  it('Login client test', () => {
    cy.get('input[id=InputUser').type('{selectall}{backspace}')
    cy.get('input[id=InputUser').type('test@email.com')
    cy.get('input[id=InputPassword').type('123456')
    cy.get('a[class="btn btn-lg btn-info"]').click()

  })
  
})
