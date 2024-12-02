describe('Teste de exclusão de itens do carrinho', () => {
  it('Deve adicionar o produto três vezes ao carrinho e excluir dois itens, mantendo um', () => {
      // Visita a página inicial
      cy.visit('https://www.demoblaze.com/index.html');

      // Adiciona o produto ao carrinho três vezes
      for (let i = 0; i < 3; i++) {
          cy.contains('Samsung galaxy s6').click(); // Acessa a página do produto
          cy.contains('Add to cart').click(); // Adiciona ao carrinho
          cy.on('window:alert', (text) => {
              expect(text).to.equal('Product added'); // Confirma o alerta
          });
          cy.go('back'); // Retorna à página inicial
      }

      // Acessa o carrinho
      cy.contains('Cart').click();
      cy.url().should('include', 'cart.html');

      // Aguarda os itens carregarem
      cy.wait(2000);

      // Verifica que há 3 itens no carrinho
      cy.get('tr.success').should('have.length', 3);

      // Exclui dois itens
      for (let i = 0; i < 2; i++) {
          cy.get('a[onclick^="deleteItem"]') // Seleciona o botão de exclusão
              .first()
              .click(); // Clica no primeiro botão de exclusão
          cy.wait(2000); // Aguarda que o carrinho atualize
      }

      // Verifica que apenas 1 item permanece no carrinho
      cy.get('tr.success').should('have.length', 1);
  });
});
