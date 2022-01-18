describe('Registrar 1-1', () => {
    beforeEach(() => {
        cy.session('login', () => {
            cy.visit('/')
            cy.get('#username').type(Cypress.env('emailLogin'))
            cy.wait(200)
            cy.get('#password').type(Cypress.env('passwordLogin'))
            cy.get('#form_login > :nth-child(4) > .login-form-btn').click()

            cy.wait(500)

            cy.contains('Liga da Justiça')
                .siblings()
                .find('[class="access_btn"]').click()

            cy.url()
                .should('include', '/eloapp#!/perfil')
        })
    });

    it('Tentar registrar sem selecionar nenhum usuário.', () => {
        cy.visit('/') //entra direto no sistema sem logar

        cy.get(`[ng-click="$ctrl.callModal('oneonone')"]`).click({ force: true, multiple: true })

        cy.get('.modal_oneone_header > .ng-binding')
            .should('contains.text', 'Conversas 1-1s')

        cy.get('[ng-show="templatesView == true"] > .modalBotoes > .mdc-button--raised').click() //botão ir para 1-1

        cy.get('.toast').should('contains.text', 'Selecione ao menos uma pessoa') //mensagem popup vermelha 
    })

    it('Registrar com sucesso.', () => {
        cy.visit('/') //entra direto no sistema sem logar

        cy.get(`[ng-click="$ctrl.callModal('oneonone')"]`).click({ force: true, multiple: true })

        cy.get('.modal_oneone_header > .ng-binding')
            .should('contains.text', 'Conversas 1-1s')

        cy.get('#select_19').click() //Escolha um template

        cy.get('#select_container_20 > md-select-menu._md > ._md')
            .contains('Questionário_03 - Conversas 1-1').click()

        cy.wait(500)

        cy.get('#input_21').type('Conversa testes auto -Lucas') //Motivo

        cy.get('#select_22').click() //Escolha um usuário

        cy.get('[label="users"]')
            .contains('Aquaman').click()

        cy.get('[label="users"]')
            .contains('Cyborg').click()

        cy.get('#radio_9').click() //para fechar as opções

        cy.get('[ng-show="templatesView == true"] > .modalBotoes > .mdc-button--raised').click() //botão ir para 1-1

        cy.get('.toast')
            .should('contains.text', 'Adicionado com sucesso.') //mensagem popup verde

        cy.url()
            .should('include', '/eloapp#!/oneonone') //verifica se está na página de conversas

    })

    it.skip('Ir para 1-1 sem selecionar nenhum usuário.', () => {
        cy.visit('/') //entra direto no sistema sem logar

        cy.get(`[ng-click="$ctrl.callModal('oneonone')"]`).click({ force: true, multiple: true })

        cy.get('.modal_oneone_header > .ng-binding')
            .should('contains.text', 'Conversas 1-1s')

        cy.get('[ng-show="templatesView == true"] > .modalBotoes > .mdc-button--raised').click() //botão ir para 1-1

        cy.get('.toast')
            .should('contains.text', 'Selecione ao menos uma pessoa') //mensagem popup vermelha 
    })
})

describe('Agendar 1-1', () => {
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
    it('Agendar sem selecionar nenhum usuário', () => {
        cy.visit('/') //entra direto no sistema sem logar

        cy.get(`[ng-click="$ctrl.callModal('oneonone')"]`).click({ force: true, multiple: true })

        cy.get('.modal_oneone_header > .ng-binding')
            .should('contains.text', 'Conversas 1-1s')

        cy.get('.oneone-type-combo').contains('Agendar 1-1').prev().click()  //checkbox agendar 1-1

        cy.get('[ng-show="templatesView == true"] > .modalBotoes > .mdc-button--raised').click()

        cy.get('.toast').should('contains.text', 'Selecione ao menos uma pessoa') //mensagem popup vermelha 
    });

    it('Agendar sem data', () => {
        cy.visit('/') //entra direto no sistema sem logar

        cy.get(`[ng-click="$ctrl.callModal('oneonone')"]`).click({ force: true, multiple: true })

        cy.get('.modal_oneone_header > .ng-binding')
            .should('contains.text', 'Conversas 1-1s')

        cy.get('.oneone-type-combo').contains('Agendar 1-1').prev().click()  //checkbox agendar 1-1

        cy.get('#select_22').click() //Escolha um usuário

        cy.get('[label="users"]')
            .contains('Aquaman').click()

        cy.get('#radio_10').click() //para fechar as opções

        cy.get('[ng-show="templatesView == true"] > .modalBotoes > .mdc-button--raised').click()

        cy.get('.toast')
            .should('contains.text', 'Selecione uma data para o 1:1') //mensagem popup vermelha
    });

    it('Agendar sem hora', () => {
        cy.visit('/') //entra direto no sistema sem logar

        cy.get(`[ng-click="$ctrl.callModal('oneonone')"]`).click({ force: true, multiple: true })

        cy.get('.modal_oneone_header > .ng-binding')
            .should('contains.text', 'Conversas 1-1s')

        cy.get('.oneone-type-combo').contains('Agendar 1-1').prev().click()  //checkbox agendar 1-1

        cy.get('#select_22').click() //Escolha um usuário

        cy.get('[label="users"]')
            .contains('Aquaman').click()

        cy.get('#radio_10').click() //para fechar as opções

        cy.wait(1000)
        cy.get('#input_12').type('06/12/2021')
        cy.wait(1000)

        cy.get('#radio_10').click() //para fechar as opções

        cy.get('[ng-show="templatesView == true"] > .modalBotoes > .mdc-button--raised').click()

        cy.get('.toast').should('contains.text', 'Selecione um hora') //mensagem popup vermelha
    });

    it('Agendar sem minuto', () => {
        cy.visit('/') //entra direto no sistema sem logar

        cy.get(`[ng-click="$ctrl.callModal('oneonone')"]`).click({ force: true, multiple: true })

        cy.get('.modal_oneone_header > .ng-binding')
            .should('contains.text', 'Conversas 1-1s')

        cy.get('.oneone-type-combo').contains('Agendar 1-1').prev().click()  //checkbox agendar 1-1

        cy.get('#select_22').click() //Escolha um usuário

        cy.get('[label="users"]')
            .contains('Aquaman').click()

        cy.get('#radio_10').click() //para fechar as opções

        cy.wait(1000)
        cy.get('#input_12').type('06/12/2021')
        cy.wait(1000)

        cy.get('#radio_10').click() //para fechar as opções

        cy.get('#select_value_label_0').click({ force: true })

        cy.get('#select_option_31').click() //escolher hora - 03

        cy.get('[ng-show="templatesView == true"] > .modalBotoes > .mdc-button--raised').click()

        cy.get('.toast')
            .should('contains.text', 'Selecione um minuto') //mensagem popup vermelha

    });

    it('Agendar sem duração', () => {
        cy.visit('/') //entra direto no sistema sem logar

        cy.get(`[ng-click="$ctrl.callModal('oneonone')"]`).click({ force: true, multiple: true })

        cy.get('.modal_oneone_header > .ng-binding')
            .should('contains.text', 'Conversas 1-1s')

        cy.get('.oneone-type-combo').contains('Agendar 1-1').prev().click()  //checkbox agendar 1-1

        cy.get('#select_22').click() //Escolha um usuário

        cy.get('[label="users"]')
            .contains('Aquaman').click()

        cy.get('#radio_10').click() //para fechar as opções

        cy.wait(1000)
        cy.get('#input_12').type('06/12/2021')
        cy.wait(1000)

        cy.get('#radio_10').click() //para fechar as opções

        cy.get('#select_value_label_0').click({ force: true })

        cy.get('#select_option_44').click() //escolher hora - 03

        cy.get('#select_value_label_1').click({ force: true })

        cy.get('#select_option_55').click() //escolher minuto - 30


        cy.get('[ng-show="templatesView == true"] > .modalBotoes > .mdc-button--raised').click()

        cy.get('.toast')
            .should('contains.text', 'Selecione uma duração') //mensagem popup vermelha 

    });

    it('Agendar com sucesso', () => {
        cy.visit('/') //entra direto no sistema sem logar

        cy.get(`[ng-click="$ctrl.callModal('oneonone')"]`).click({ force: true, multiple: true })

        cy.get('.modal_oneone_header > .ng-binding')
            .should('contains.text', 'Conversas 1-1s')

        cy.get('.oneone-type-combo').contains('Agendar 1-1').prev().click()  //checkbox agendar 1-1

        cy.get('#select_22').click() //Escolha um usuário

        cy.get('[label="users"]')
            .contains('Aquaman').click()

        cy.get('#radio_10').click() //para fechar as opções

        cy.wait(1000)
        cy.get('#input_12').type('06/12/2021')
        cy.wait(1000)

        cy.get('#radio_10').click() //para fechar as opções

        cy.get('#select_value_label_0').click({ force: true })

        cy.get('#select_option_44').click() //escolher hora - 03

        cy.get('#select_value_label_1').click({ force: true })

        cy.get('#select_option_55').click() //escolher minuto - 30

        cy.get('#select_17').click({ force: true })

        cy.get('#select_option_61').click() //escolher duração - 1 hora

        cy.get('[ng-show="templatesView == true"] > .modalBotoes > .mdc-button--raised').click()

        cy.get('.toast')
            .should('contains.text', 'Adicionado com sucesso.') //mensagem popup vermelha 

        cy.url()
            .should('include', '/eloapp#!/oneonone') //verifica se está na página de conversas
    });
});