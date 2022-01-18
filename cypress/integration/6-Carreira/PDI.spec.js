/// <reference types="cypress" />

describe('Times', () => {
    beforeEach(() => {
        cy.session('login', () => {
            cy.visit('/')
            cy.get('#username').type('batman@elofy.com.br')
            cy.wait(500)

            cy.get('#password').type('123456')
            cy.get('#form_login > :nth-child(4) > .login-form-btn').click()

            cy.contains('Liga da Justiça')
                .siblings()
                .find('[class="access_btn"]').click()

            cy.url()
                .should('include', '/eloapp#!/perfil')
        })
    })
    it.only('Novo PDI sem nome e descrição', () => {
        cy.visit('/')

        cy.get(`[ng-if="$ctrl.canISee('carreira')"] > .menu-label`).click() //clicar em Carreira

        cy.url()
            .should('include', '/eloapp#!/career') //verificar se está na URL correta

        cy.get('.side-menu-content-container')
            .contains('PDI').click() //Entrar em PDI

        cy.url()
            .should('include', '/eloapp#!/pdi') //verificar se está na URL correta

        cy.get('.page-label')
            .should('contains.text', 'PDI') //verificar se está na página correta

        cy.get('.plus-button').click() //clicar em + PDI

        cy.get('.c-modal__title')
            .should('contains.text', 'Novo PDI') //verificar se a modal está aberta

        cy.get('.c-modal__footer')
            .contains('Salvar').click() //clicar em Salvar

        cy.get('.toast-message')
            .should('contains.text', 'Verifique os campos em vermelho!') //verificar se a mensagem de sucesso aparece

        cy.get('.pdi-create__name > .error-msg')
            .should('contain.text', 'Campo Obrigatório!') //verificar se a mensagem de erro aparece no campo NOME

        cy.get(':nth-child(2) > .ng-isolate-scope > .error-msg')
            .should('contain.text', 'Campo Obrigatório!') //verificar se a mensagem de erro aparece no campo DESCRIÇÃO

    })
}); 