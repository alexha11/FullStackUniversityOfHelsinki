describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'thanhduong',
      username: 'thanhduong11',
      passwordHash: 'abcd123456'
    }

    const user2 = {
      name: 'thuvan',
      username: 'thuvan11',
      passwordHash: 'abcd123456'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user1) 
    cy.request('POST', 'http://localhost:3003/api/users/', user2) 

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
      cy.login({ "username": "thanhduong11", "password": "abcd123456" })
      cy.fillingNewForm({ "title" :'software', "author" : 'thanhduong11',"url" : 'www.facebook.com'})

    })

    it('A blog can be created', function() {
      cy.fillingNewForm({ "title" :'test', "author" : 'thanhduong',"url" : 'www.facebook.com'})
      cy.contains('test thanhduong')
    })

    it('users can like a blog', function() {
      cy.contains('view').click()
      cy.get('#likeBtn').click()
      cy.contains('1')
    })

    it('a blog can be deleted', function() {
      cy.contains('software thanhduong11')
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'software thanhduong11')

    })
    
    it('ensure only the author could see delete button of the blogs', function() {
      cy.contains('Logout').click()
      cy.login({ "username": "thuvan11", "password": "abcd123456" })
      cy.contains('thuvan logged in')
      cy.contains('view').click()
      cy.get('button').should('not.contain', 'remove')
    })

    it('check the blogs are ordered according to the like', function() {
      cy.createBlog( {"title": "a1", "author": "duong", "url": "facebook", "likes": 19} )
      cy.createBlog( {"title": "a2", "author": "van", "url": "facebook", "likes": 12} )
      cy.createBlog( {"title": "a3", "author": "thanhduong", "url": "gmail", "likes": 20} )
      cy.get('.blog').eq(0)
    }) 
  })
})