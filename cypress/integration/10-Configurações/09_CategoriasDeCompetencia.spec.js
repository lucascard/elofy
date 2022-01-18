/// <reference types="cypress" />

describe('Categorias de competência', () => {
    beforeEach(() => {
        cy.session('login', () => {
            cy.visit('/')
            cy.get('#username').type('batman@elofy.com.br')
            cy.wait(500)

            cy.get('#password').type('123456')
            cy.get('#form_login > :nth-child(4) > .login-form-btn').click()

            cy.contains('Liga da Justiça').siblings().find('[class="access_btn"]').click()

            cy.url()
                .should('include', '/eloapp#!/perfil')
        })
    })   
    it('teste', () => {
        cy.visit('/')     
        
        cy.get(`[ng-if="$ctrl.canISee('category')"]`).click({force: true})

        cy.url()
            .should('include', '/category')
    });
});