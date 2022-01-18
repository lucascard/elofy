/// <reference types="cypress" />
describe('PDI', () => {
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

    it('Salvar sem nome e descrição', () => {
        cy.visit('/')
        cy.get('[ng-click="$ctrl.toggleCreatePdiModal(true)"]').click({ force: true, multiple: true })

        cy.get('modal-footer.ng-scope > .mdc-button').click()

        cy.get('.toast')
            .should('have.text', 'Verifique os campos em vermelho!')

        cy.contains('Campo Obrigatório!')
            .should('be.visible')
    });

    it('Salvar com sucesso', () => {
        cy.visit('/')
        cy.get('[ng-click="$ctrl.toggleCreatePdiModal(true)"]').click({ force: true, multiple: true })

        cy.get('.c-modal__body').contains('Nome').next().type('PDI teste -Lucas') //nome do PDI
        
        cy.get('.c-modal__body').contains('Descrição').next().type('descrição teste') //descrição do PDI

        cy.get('.c-modal__body').contains('Responsável').next().click() //escolher o usuário
        
        cy.get('.select-list > :nth-child(2)').click() //selecionar usuario - Batman

        cy.get('modal-footer.ng-scope > .mdc-button').click() //clicar em salvar

        cy.get('.toast')
            .should('have.text', 'PDI criado com sucesso!')
    });
});