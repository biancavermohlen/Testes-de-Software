describe('Finalizar Compra no DemoBlaze', () => {
  it('Deve adicionar o Samsung Galaxy S6 ao carrinho e finalizar a compra', () => {
      // Acessar a página inicial
      cy.visit('https://www.demoblaze.com/index.html');

      // Adicionar o produto ao carrinho
      cy.contains('Samsung galaxy s6').click();
      cy.contains('Add to cart').click();

      // Verificar se o produto foi adicionado ao carrinho
      cy.url().should('include', 'prod.html?idp_=1');
      cy.contains('Cart').click();
      cy.url().should('include', 'cart.html');
      cy.contains('Samsung galaxy s6');

      // Realizar o processo de compra
      cy.contains('Place Order').click();
      cy.get('#name').type('João Silva');
      cy.get('#country').type('Brasil');
      cy.get('#city').type('São Paulo');
      cy.get('#card').type('4111111111111111');
      cy.get('#month').type('12');
      cy.get('#year').type('2025');

      // Clicar no botão Purchase para finalizar a compra
      cy.contains('Purchase').click();

      // Clicar no botão OK para finalizar e fechar a tela modal
      cy.contains('OK').click();
  });
});
