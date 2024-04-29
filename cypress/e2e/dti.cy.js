class RegisterForm {
  elements = {
    email_create_Input: () => cy.get('#email_create'),
    create_account_error: () => cy.get('#create_account_error'),
    submitCreate: () => cy.get('#SubmitCreate')
  }

  typeEmail(text) {
    if (!text) return;
    this.elements.email_create_Input().type(text)
  }

  clickSubmit() {
    this.elements.submitCreate().click()
  }
}

class LoginForm {
  elements = {
    email_Input: () => cy.get('#email'),
    password_Input: () => cy.get('#passwd'),
    submitLogin: () => cy.get('#SubmitLogin'),
    erro_alert: () => cy.get('.alert.alert-danger')
  }

  typeEmail(text) {
    if (!text) return;
    this.elements.email_Input().type(text)
  }

  typePassword(text) {
    if (!text) return;
    this.elements.password_Input().type(text)
  }

  clickSubmit() {
    this.elements.submitLogin().click()
  }
}

class PasswordForm {
  elements = {
    email_Input: () => cy.get('#email'),
    forgot_password_link: () => cy.get('.lost_password a'),
    submitBtn: () => cy.get('.submit .btn'),
    success_alert: () => cy.get('.box p')
  }

  typeEmail(text) {
    if (!text) return;
    this.elements.email_Input().type(text)
  }

  clickLink() {
    this.elements.forgot_password_link().click()
  }

  clickSubmit() {
    this.elements.submitBtn().click()
  }
}

const registerForm = new RegisterForm()
const loginForm = new LoginForm()
const passwordForm = new PasswordForm()
const colors = {
  errors: 'rgb(241, 51, 64)',
  success: 'rgb(70, 167, 78)'
}
const input = {
  email: 'test@gmail.com',
  password: 'Testing123'
}

describe('Login Page', () => {
  describe('Submitting an account registration with already existing inputs', () => {
    after(() => {
      cy.clearAllLocalStorage()
    })

    it('Given the user is on the login page', () => {
      cy.visit('/')
    })

    it(`When the user enters "test@gmail.com" in the email field of the registration form`, () => {
      registerForm.typeEmail(input.email)
    })

    it(`Then the user clicks the "Create an account" button`, () => {
      registerForm.clickSubmit()
    })

    it(`Then the page should display the message "An account using this email address has already been registered. Please enter a valid password or request a new one." to the user `, () => {
      registerForm.elements.create_account_error().should('contains.text', 'An account using this email address has already been registered. Please enter a valid password or request a new one.')
    })

    it(`And then the page should display a green success icon in the email field`, () => {
      registerForm.elements.email_create_Input().should('have.css', 'border-color', colors.success)
    })
  })

  describe('Submitting an account login with an invalid password input', () => {
    after(() => {
      cy.clearAllLocalStorage()
    })

    it('Given the user is on the login page', () => {
      cy.visit('/')
    })

    it(`When the user enters "test@gmail.com" in the email field of the login form`, () => {
      loginForm.typeEmail(input.email)
    })

    it(`Then the user enters "Testing123" in the password field of the login form`, () => {
      loginForm.typePassword(input.password)
    })

    it(`Then the user clicks the "Sing in" button`, () => {
      loginForm.clickSubmit()
    })

    it(`Then the page should display the message "Authentication failed." to the user`, () => {
      loginForm.elements.erro_alert().should('contains.text', 'Authentication failed.')
    })
  })

  describe('Submitting an email to change user password', () => {
    after(() => {
      cy.clearAllLocalStorage()
    })

    it('Given the user is on the login page', () => {
      cy.visit('/')
    })

    it(`When the user clicks "Forgot your password?" link`, () => {
      passwordForm.clickLink()
    })

    it(`Then the user should be directed to the "password" page`, () => {
      cy.url().should('include', 'controller=password')
    })

    it(`Then the user enters "test@gmail.com" in the email field`, () => {
      passwordForm.typeEmail(input.email)
    })

    it(`Then the clicks the "Retrieve Password" button`, () => {
      passwordForm.clickSubmit()
    })

    it(`Then the page should display the message "A confirmation email has been sent to your address: test@gmail.com" to the user`, () => {
      passwordForm.elements.success_alert().should('contain.text', `A confirmation email has been sent to your address: ${input.email}`)
    })
  })
})
