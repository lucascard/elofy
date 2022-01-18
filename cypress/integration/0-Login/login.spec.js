describe('Tela de login', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('Login com sucesso', () => {
        cy.get('#username').type(Cypress.env('emailLogin'))
        cy.wait(200)
        cy.get('#password').type(Cypress.env('passwordLogin'))

        cy.server()
        cy.route('POST', '**/logar').as('postLogar')
        cy.get('#form_login > :nth-child(4) > .login-form-btn').click()

        cy.wait('@postLogar').then((xhr) => {
            expect(xhr.status).be.eq(200)
            expect(xhr.response.body.login_status).be.eq("success")
        })

        cy.contains('Você possui acesso à múltiplas empresas')
            .should('be.visible')
    });

    it('Login com senha errada', () => {
        cy.get('#username').type('batman@elofy.com.br')
        cy.wait(200)
        cy.get('#password').type('23456')
        cy.get('#form_login > :nth-child(4) > .login-form-btn').click()

        cy.contains('E-mail ou senha incorretos.')
            .should('be.visible')
    });

    it('Login sem nada', () => {
        cy.get('#form_login > :nth-child(4) > .login-form-btn').click()

        cy.get('[id="username-error"]')
            .should('exist')//
        cy.get('[id="password-error"]')
            .should('exist')
    });

    it('Esqueceu sua senha?', () => {
        cy.get('#forgot_password').click()

        cy.contains('Recuperar Senha')
            .should('be.visible')

        cy.get('#recuperar-email').type('lucas@elofy.com.br')

        cy.get('#form-recuperar > :nth-child(4) > .login-form-btn').click() //botao enviar/send

        cy.get('#form-recuperar > .success > .alert')
            .should('be.visible')   // mensagem de sucesso - Email enviado

        cy.get('#form-recuperar > .voltar_email_screen > .material-icons').click() //botao Voltar para login

        cy.contains('Iniciar sessão')   
            .should('be.visible')
    });

    it.skip('Seu primeiro acesso?', () => { // O PRIMEIRO ACESSO FALHOU
        cy.contains('Seu primeiro acesso?').click()

        cy.contains('Primeiro Acesso')
            .should('be.visible')

        cy.get('#primeiro-email').type('teste322@elofy.com.br')
        cy.get('#primeiro_form_login > :nth-child(4) > .login-form-btn').click()
        cy.get('#errortext').should('be.visible')
        cy.get('#primeiro_form_login > :nth-child(5) > .login-form-btn-default').click()

        cy.contains('Iniciar sessão')
            .should('be.visible')
    })

    it.skip('Login com conta microsoft', () => {
        cy.get('[alt="microsoft"]').click()
        cy.url().should('include', 'https://login.microsoftonline.com/')

    })
});