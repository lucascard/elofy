/// <reference types="cypress" />
describe('Pesquisa de desligamento', () => {
    beforeEach(() => {
        cy.loginAppDev()
    })

    it('Adicionar nova pesquisa', () => {
        cy.visit('/')

        cy.get(`[ng-if="$ctrl.canISee('pesquisas')"]`).click({ force: true })

        cy.get('.addmore').click() //adicionar nova pesquisa

        cy.url()
            .should('include', 'pesquisas/-1')

        

    });
});