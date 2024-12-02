describe('Cadastro de Usuário no DemoBlaze', () => {
  it('Deve realizar o cadastro de um novo usuário', () => {
    // Acessa o site
    cy.visit('https://www.demoblaze.com/index.html');

    // Clica no botão de "Sign up" para abrir o modal de cadastro
    cy.get('#signin2').click();

    // Preenche o campo "Username" com um nome de usuário único
    cy.get('#sign-username').type('novo_usuario_teste_uniq'); // Alterado para um nome único

    // Preenche o campo "Password" com uma senha
    cy.get('#sign-password').type('senha_forte_123');

    // Clica no botão "Sign up" para realizar o cadastro
    cy.get('button').contains('Sign up').click();

    // Espera o alerta de sucesso ou erro (dependendo da resposta do site)
    cy.on('window:alert', (str) => {
      // Verifica se o alerta contém a mensagem de sucesso ou erro
      if (str.includes('Sign up successful.')) {
        expect(str).to.include('Sign up successful.');
      } else if (str.includes('This user already exist.')) {
        expect(str).to.include('This user already exist.');
      } else {
        throw new Error('Mensagem de alerta inesperada');
      }
    });

    // Opcional: Verifica se o usuário foi redirecionado para a página principal
    cy.url().should('eq', 'https://www.demoblaze.com/index.html');
  });
});
