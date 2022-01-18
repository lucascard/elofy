/// <reference types="cypress" />
describe('Pesquisa de desligamento', () => {
    beforeEach(() => {
        cy.session('login', () => {
            cy.visit('/')
            cy.get('#username').type(Cypress.env('emailLogin'))
            cy.wait(500)
            cy.get('#password').type(Cypress.env('passwordLogin'))
            cy.get('#form_login > :nth-child(4) > .login-form-btn').click()

            cy.contains('Liga da Justiça').siblings().find('[class="access_btn"]').click()

            cy.url()
                .should('include', '/eloapp#!/perfil')
        })
    })

    it('primeiro teste', () => {
        cy.visit('/')

        cy.get(`[ng-if="$ctrl.canISee('pesquisas')"]`).click({force: true})   

        cy.get(`[ng-if="$ctrl.canISee('desligamento')"]`).click({force: true})
     });
});