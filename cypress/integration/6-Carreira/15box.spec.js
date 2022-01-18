/// <reference types="cypress" />

describe('15box', () => {
    beforeEach(() => {
        cy.session('login', () => {
            cy.visit('/')
            cy.get('#username').type('batman@elofy.com.br')
            cy.wait(500)
            cy.get('#password').type('123456')
            cy.get('#form_login > :nth-child(4) > .login-form-btn').click()

            cy.contains('Você possui acesso à múltiplas empresas')
                .should('be.visible')

            cy.contains('Liga da Justiça')
                .siblings()
                .find('[class="access_btn"]').click()

            cy.url()
                .should('include', '/eloapp#!/perfil')

            cy.pause()
        })
    })
    it('Chegar em 15box', () => {
        cy.visit('/')

        cy.get('.menu-container > :nth-child(1)')

    });
});