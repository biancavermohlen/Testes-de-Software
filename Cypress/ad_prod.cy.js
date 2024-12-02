describe('Adição de Produto ao Carrinho', () => {
  it('Deve adicionar o Samsung Galaxy S6 ao carrinho', () => {
    // Acessa o site
    cy.visit('https://www.demoblaze.com/index.html');

    // Clica no link do produto Samsung Galaxy S6
    cy.contains('Samsung galaxy s6').click();

    // Verifica se estamos na página do produto correto
    cy.url().should('include', 'prod.html?idp_=1');

    // Clica no botão "Add to cart" para adicionar o produto ao carrinho
    cy.get('a').contains('Add to cart').click();

    // Verifica se o produto foi adicionado ao carrinho (confirmar com alerta)
    cy.on('window:alert', (str) => {
      expect(str).to.include('Product added');
    });

    // Opcional: Verifica se o carrinho foi atualizado ou se o produto aparece na página do carrinho
    cy.get('a').contains('Cart').click();
    cy.url().should('include', 'cart.html');
    cy.contains('Samsung galaxy s6').should('exist');
  });
});
