/// <reference types="cypress" />

describe('Criação de usuários', () => {
    beforeEach(() => {
        cy.session('login', () => {
            cy.visit('/')
            cy.get('#username').type(Cypress.env('emailLogin'))
            cy.wait(200)
            cy.get('#password').type(Cypress.env('passwordLogin'))
            cy.get('#form_login > :nth-child(4) > .login-form-btn').click()

            cy.url()
                .should('include', '/eloapp#!/perfil')
        })
    });

    const usuarios = require('../../fixtures/usuarios.json')
    usuarios.forEach((u) => {
        it.skip(`Criação do usuário ${u.personagem}`, () => {
            cy.visit('/')

            cy.get(`[ng-if="$ctrl.canISee('usuarios')"]`).click({ force: true })
            cy.get('.add-key-btn > .mdc-button').click()

            cy.get('#user-name').type(u.personagem)
            cy.get('#user-email').type(u.email + '@elofy.com.br')

            cy.get('#s2id_userTeam > .select2-choice').click()
            cy.get('#select2-result-label-30').click()

            cy.get('#s2id_userTipoCargo > .select2-choice > .select2-arrow > b').click() //tipo cargo 
            cy.get('#select2-result-label-33').click()

            cy.get('#s2id_team-afford > .select2-choice').click() //times acessíveis
            cy.get('#select2-result-label-36').click()

            cy.get('#s2id_usuario-perfil > .select2-choice').click()
            cy.get('#s2id_autogen13_search').type('Colaborador{enter}')

            cy.get('#s2id_userGestor > .select2-choice').click()
            cy.get('#s2id_autogen25_search').type('Homem de ferro{enter}')

            cy.get('.flex-end > .mdc-button--raised').click()

            cy.contains('Adicionado com sucesso!')
                .should('be.visible')
        });
    })
});
