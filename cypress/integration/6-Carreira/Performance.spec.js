/// <reference types="cypress" />

describe('Times', () => {
    beforeEach(() => {
        cy.session('login', () => {
            cy.visit('/')
            cy.get('#username').type('batman@elofy.com.br')
            cy.wait(500)

            cy.get('#password').type('123456')
            cy.get('#form_login > :nth-child(4) > .login-form-btn').click()

            cy.contains('Liga da Justiça')
                .siblings()
                .find('[class="access_btn"]').click()

            cy.url()
                .should('include', '/eloapp#!/perfil')
        })
    })
    it('Bloquear avaliação do Lex Luthor', () => {
        cy.visit('/')

        cy.get(`[ng-if="$ctrl.canISee('carreira')"] > .menu-label`).click()

        cy.url()
            .should('include', '/eloapp#!/career')

        cy.get('.filter__list-item > .material-icons-outlined').click() //excluir filtro de LIBERADO

        cy.get('div > .ng-scope > .d-flex').click() //abrir o filtro
        cy.get('.dropdown__item--count-5').click() //clicar em STATUS
        cy.get('.dropdown--scrollable > :nth-child(1)').click() //clicar em LIBERADO

        cy.get('.d-flex > .ng-pristine > .md-container > .md-bar').click() //clicar no botao SELECIONAR NÃO LIBERADOS


        cy.get('.dt-table').contains('Lex Luthor').siblings().prev().click()

        cy.contains('Avaliação bloqueada')
            .should('be.visible')
    });
    it('Liberar a avaliação do Lex Luthor', () => {
        cy.visit('/')

        cy.get(`[ng-if="$ctrl.canISee('carreira')"] > .menu-label`).click()

        cy.url()
            .should('include', '/eloapp#!/career')

        cy.get('.filter__list-item > .material-icons-outlined').click() //excluir filtro de CLICO TESTE GESTOR
        cy.get('.d-flex > .ng-pristine > .md-container > .md-bar').click() //clicar no botao SELECIONAR NÃO LIBERADOS

        cy.get('career-table.ng-isolate-scope').contains('Ciclo Webinar Teste').parent().parent().find('.fa-check-circle').click()

        cy.contains('Liberar relatório para os selecionados').click()

        cy.contains('Avaliações Liberadas')
            .should('be.visible')
    });
    it('Adicionar e visualizar colunas', () => {
        cy.visit('/')

        cy.get(`[ng-if="$ctrl.canISee('carreira')"] > .menu-label`).click()

        cy.url()
            .should('include', '/eloapp#!/career')

        cy.get('.filter__list-item > .material-icons-outlined').click() //excluir filtro de LIBERADO

        cy.get('div > .ng-scope > .d-flex').click() //abrir o filtro
        cy.get('.dropdown__item--count-5').click() //clicar em STATUS
        cy.get('.dropdown--scrollable > :nth-child(1)').click() //clicar em LIBERADO

        cy.get('.dt-line').contains('Dados gerais').click()
        // cy.get('.user-selector ng-scope ng-animate ng-enter ng-enter-active')
        cy.contains('9box').click()
        cy.get('.select-list').contains('Time').click()
        cy.contains('Status Usuário').click()

        cy.contains('Minhas avaliações').click()

        cy.get('.table__header').contains('Time')
            .should('be.visible')
        cy.get('.table__header').contains('Status Usuário')
            .should('be.visible')
        cy.get('.table__header').contains('15box')
            .should('be.visible')
    });

    it.skip('Entrar em consenso', () => {
        cy.visit('/')

        cy.get(`[ng-if="$ctrl.canISee('carreira')"] > .menu-label`).click()

        cy.url()
            .should('include', '/eloapp#!/career')

        cy.get('.filter__list-item > .material-icons-outlined').click() //excluir filtro de LIBERADO

        cy.get('div > .ng-scope > .d-flex').click() //abrir o filtro
        cy.get('.dropdown__item--count-5').click() //clicar em STATUS
        cy.get('.dropdown--scrollable > :nth-child(1)').click() //clicar em LIBERADO

        cy.contains('Lex Luthor').parent().parent().parent()
            .find('[ng-if="career.showConsensusButton == 1"]').click()

        cy.get('.close-bar > .title')
            .should('contain.text', 'Calibragem')

        cy.contains('Competência_01').parents('.cell').find('[ng-if="score.count_comentarios >= 1"]').click()

        cy.get('#comment_obj').type('Teste automatizado do luquinhas')
        cy.get('.comment_container_okr > .mdc-button').click()

        cy.contains('Comentario adicionado')
            .should('be.visible')

        // BUG ENCONTRADO, OS COMENTÁRIOS ADICIONADOS NÃO APARECEM NA LISTA, APENAS O NÚMERO DE COMENTÁRIOS.
    })
    it('Entrar em YouTime', () => {
        cy.visit('/')

        cy.get(`[ng-if="$ctrl.canISee('carreira')"] > .menu-label`).click()

        cy.url()
            .should('include', '/eloapp#!/career')

        cy.get('.filter__list-item > .material-icons-outlined').click() //excluir filtro de LIBERADO
        cy.get('div > .ng-scope > .d-flex').click() //abrir o filtro
        cy.get('.dropdown__item--count-5').click() //clicar em STATUS
        cy.get('.dropdown--scrollable > :nth-child(1)').click() //clicar em LIBERADO

        cy.contains('Lex Luthor')
            .parent().parent().parent()
            .find('[ng-if="career.showYoutime"]').click() //clicar no botao YouTime

        cy.get('.c-modal__title')
            .should('contain.text', 'YouTime') //verifica o título da modal

        cy.get('.c-modal__footer')
            .contains('Fechar').click() //clicar no botao Fechar

        cy.contains('Nome do Ciclo')
            .should('be.visible') //verifica se a modal foi fechada

        cy.contains('Lex Luthor')
            .parent().parent().parent()
            .find('[ng-if="career.showYoutime"]').click() //clicar no botao YouTime

        cy.contains('Pergunta qualitativa 01')
            .next()
            .clear()
            .type('Teste automatizado do luquinhas')

        cy.contains('Pergunta qualitativa 02')
            .next()
            .clear()
            .type('Outro teste automatizado do luquinhas')

        cy.get('.c-modal__footer')
            .contains('Salvar').click() //clicar em salvar

        cy.get('.toast-message')
            .should('contain.text', 'Adicionado com sucesso.')
    })
    it.skip('Entrar em relatório', () => {
        cy.visit('/')

        cy.window().then((win) => {
            cy.stub(win, 'open', url => {
                win.location.href = 'url que iria abrir na nova aba ou janela';
            }).as("popup")
        })

        cy.get(`[ng-if="$ctrl.canISee('carreira')"] > .menu-label`).click()

        cy.url()
            .should('include', '/eloapp#!/career')

        cy.get('.filter__list-item > .material-icons-outlined').click() //excluir filtro de LIBERADO

        cy.get('div > .ng-scope > .d-flex').click() //abrir o filtro
        cy.get('.dropdown__item--count-5').click() //clicar em STATUS
        cy.get('.dropdown--scrollable > :nth-child(1)').click() //clicar em LIBERADO

        cy.contains('Lex Luthor')
            .parent().parent().parent()
            .find('[ng-click="$ctrl.redirectToCareer(career.userId, career.cycleId)"]')
            .invoke('removeAttr', 'target')
            .click()

        cy.get('.carrier-user-bar > .name')
            .should('contain.text', 'Lex Luthor')

        //testando YOUTIME dentro do Relatório

        cy.get('.carrier-user-bar')
            .contains('YouTime').click() //entrar em YOUTIME

        cy.get('.c-modal__footer')
            .contains('Fechar').click() //Testar o botão cancelar

        cy.get('.carrier-user-bar')
            .contains('5 meses')
            .should('be.visible') //Conferir se a modal está fechada

        cy.get('.carrier-user-bar')
            .contains('YouTime').click() //Abrir YOUTIME novamente.

        cy.get('.c-modal__title')
            .contains('YouTime')
            .should('be.visible') //Conferir se a modal está aberta

        cy.get('.c-modal__footer')
            .contains('Salvar').click() //Clicar em salvar para conferir a msg de erro e o funcionamento

        cy.get('.toast-message')
            .should('contain.text', 'Adicionado com sucesso.') //verificar se o youtime foi salvo.

    })
}); 