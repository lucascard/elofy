describe('Feedback', () => {
    beforeEach(() => {
        cy.session('login', () => {
            cy.visit('/')
            cy.get('#username').type('batman@elofy.com.br')
            cy.wait(200)
            cy.get('#password').type('123456')
            cy.get('#form_login > :nth-child(4) > .login-form-btn').click()

            cy.wait(500)

            cy.contains('Liga da Justiça')
                .siblings()
                .find('[class="access_btn"]').click()

            cy.url()
                .should('include', '/eloapp#!/perfil')
        })
    });

    it('Enviar feedback', () => {
        cy.visit('/') //entra direto no sistema sem logar


        cy.get(`[ng-click="$ctrl.callModal('feedback')"]`).click({ force: true, multiple: true })

        cy.wait(1000)
        cy.get('#input-129').type('aquaman{enter}')//Enviar feedback para 

        cy.get(`[ng-click="selectGiveFeedbackType('r')"]`).click()//Escolher tipo de feedback

        cy.get('#give_feedback_answer')
            .type('Obrigado por colocar um esforço extra durante este período agitado de trabalho, João. Entendo que ficar até tarde não é fácil, mas a equipe realmente agradece.')

        cy.get('[data-original-title="Pegar junto, ajudar"]').click() //cy.get(`[${}]`)

        cy.get('[ng-click="give_feedback()"]').click()

        cy.get('.toast').should('have.text', 'Feedback enviado.') //mensagem popup verde
    })

    it('Pedir Feedback', () => {

        cy.visit('/') //entra direto no sistema sem logar

        cy.get(`[ng-click="$ctrl.callModal('feedback')"]`).click({ force: true, multiple: true })
        cy.get('#tab-item-25').click() //pedir feedback

        cy.wait(500)
        cy.get('#input-130').type('aquaman{enter}')//Pedir feedback para
        cy.wait(500)

        cy.get('#request_feedback_answer').type('Solicito feedback quanto ao desempenho do funcionário x na atvidade y.') //Contextualize seu pedido de feedback
        cy.get('#input_124').type('10/19/2021') //prazod
        cy.get('#tab-item-25').scrollIntoView().click() //subir a tela para ver o botão de enviar

        cy.wait(1000)
        cy.get('.ng-valid-required.ng-valid-mindate > .layout-row > .md-raised').click() //data de inicio
        cy.get('.toast')
            .should('have.text', 'Feedback solicitado.')
    })

    it('Nota Privada', () => {

        cy.visit('/') //entra direto no sistema sem logar

        cy.get(`[ng-click="$ctrl.callModal('feedback')"]`).click({ force: true, multiple: true })

        cy.get('#tab-item-26').click() //Nota Privada

        cy.wait(1000)
        cy.get('#input-131').type('Batman{enter}')  //nota sobre quem 
        cy.wait(500)

        cy.get('#note_feedback_answer').type('Obrigado por salvar Ghotan city outra vez. -Teste automatizado') //O que você quer registrar

        cy.get('#tab-item-26').scrollIntoView().click() //Nota Privada

        cy.wait(1000)
        cy.get('.ng-valid-required.ng-valid-mindate > .layout-row > .md-raised').click() //botao de salvar nota
        
        cy.get('.toast') 
            .should('have.text', 'Nota cadastrada.')
    })
})