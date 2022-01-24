/// <reference types="cypress" />
describe('Pesquisa de desligamento', () => {
    beforeEach(() => {
        cy.session('login', () => {
            cy.visit('/')
            cy.get('#username').type(Cypress.env('emailAppDev'))
            cy.wait(500)
            cy.get('#password').type(Cypress.env('passwordAppdev'))
            cy.get('#form_login > :nth-child(4) > .login-form-btn').click()

            cy.contains('Liga da Justiça').siblings().find('[class="access_btn"]').click()

            cy.url()
                .should('include', '/eloapp#!/perfil')
        })
    })

    it('Adicionar nova pesquisa', () => {
        cy.visit('/')

        cy.get(`[ng-if="$ctrl.canISee('pesquisas')"]`).click({force: true})   

        cy.get('.addmore').click() //adicionar nova pesquisa

        cy.url()
            .should('include', 'pesquisas/-1')



     });
});