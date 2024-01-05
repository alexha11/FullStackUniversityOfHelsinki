describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'thanhduong',
      username: 'thanhduong11',
      passwordHash: 'abcd123456'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3003')
  })

  it('Login form is shown', function() {
    cy.contains('Blogs by Thanh Duong')
    cy.contains('Please log in to your blog account')
    cy.contains('login')
    cy.get('#username')
    cy.get('#password')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('thanhduong11')
      cy.get('#password').type('abcd123456')
      cy.get('#login-button').click()

      cy.contains('thanhduong logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      // ...
    })
  })
})