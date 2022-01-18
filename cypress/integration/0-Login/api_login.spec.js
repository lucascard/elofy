/// <reference types="cypress" />

describe('Teste de api', () => {
    it.skip('Login com sucesso', () => {
        cy.request({
            method: 'POST',
            url: '/' + '/logar',
            body: {
                username: Cypress.env('emailLogin'),
                password: Cypress.env('passwordLogin')
            }
        }).then(res => console.log(res))



        /* cy.request({
            method: 'POST',
            url: 'http://localhost:8080/login',
            body: {
                username: ' */
        
    })
});