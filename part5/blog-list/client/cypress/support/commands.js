Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      cy.visit('http://localhost:3003')
    })
  })

Cypress.Commands.add('fillingNewForm', ({title, author, url}) => {
  cy.contains('new note').click()

  cy.get('#title').type(title)
  cy.get('#author').type(author)
  cy.get('#url').type(url)
  
  cy.get('#createButton').click()
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url, likes  },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  }).then(() => {
  cy.visit('http://localhost:3003')
  })
})