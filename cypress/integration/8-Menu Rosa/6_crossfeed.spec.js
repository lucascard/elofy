/// <reference types="cypress" />
describe('Crossfeed', () => {
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

    it('Criar crossfeed com sucesso', () => {
        cy.visit('/')

        cy.get(`[ng-if="$ctrl.canISee('crossfeed')"]`).click({ force: true, multiple: true })

        cy.get('.md-padding > :nth-child(1) > .form-control').type('Crossfeed teste -Lucas') //nome do crossfeed

        cy.get('#s2id_crossfeed_user > .select2-choice').click() //escolher o usuário
        cy.get('#select2-result-label-17').click() //clicar no usuário Lanterna Verde

        cy.get('#crossfeed_descricao').type('Descrição teste crossfeed') //descrição do crossfeed

        cy.get(':nth-child(6) > ._md-datepicker-has-triangle-icon > .md-datepicker-input-container > .md-datepicker-input')
            .type('10/10/2022') //prazo pra ser respondido

        cy.get('.md-padding > :nth-child(1) > .form-control').scrollIntoView().click() //subir a tela para ver o botão de enviar

        cy.get('#crossfeed_form > .layout-row > .md-raised').click() //clicar em enviar

        cy.get('.toast')
            .should('have.text', 'Adicionado com sucesso.') //mensagem popup verde 
    });
});