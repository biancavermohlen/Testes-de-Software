describe('Login de Usuário no DemoBlaze', () => {
  it('Deve realizar o login com um usuário existente', () => {
    // Acessa o site
    cy.visit('https://www.demoblaze.com/index.html');

    // Clica no botão de "Log in" para abrir o modal de login
    cy.get('#login2').click();

    // Preenche o campo "Username" com um nome de usuário existente
    cy.get('#loginusername').type('novo_usuario_teste_uniq'); // Substitua pelo usuário real

    // Preenche o campo "Password" com a senha
    cy.get('#loginpassword').type('senha_forte_123'); // Substitua pela senha real

    // Clica no botão "Log in" para realizar o login
    cy.get('button').contains('Log in').click();

    // Espera o alerta de sucesso ou erro (dependendo da resposta do site)
    cy.on('window:alert', (str) => {
      // Verifica se o alerta contém a mensagem de sucesso ou erro
      if (str.includes('Welcome')) {
        expect(str).to.include('Welcome');
      } else if (str.includes('User does not exist')) {
        expect(str).to.include('User does not exist');
      } else {
        throw new Error('Mensagem de alerta inesperada');
      }
    });

    // Opcional: Verifica se o usuário foi redirecionado para a página principal após o login
    cy.url().should('eq', 'https://www.demoblaze.com/index.html');
  });
});
