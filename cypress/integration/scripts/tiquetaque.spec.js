describe('teste', () => {
    it('tique taque', () => {
        cy.visit('https://www.tiquetaque.app/painel')

        cy.get('#email').type('lucas@elofy.com.br')
        cy.get('#password').type('4254{enter}')

        cy.url()
            .should('include', 'https://www.tiquetaque.app/entries')

        cy.get('#btn-remote-record > :nth-child(2)').click()

        cy.contains('Bom Dia, Lucas!')
            .should('be.visible')

    });
});