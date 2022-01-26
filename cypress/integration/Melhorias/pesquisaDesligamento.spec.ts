/// <reference types="cypress" />
/// <reference types="cypress-mailslurp" />

describe('app-dev', function () {
    before(function () {
        return cy.mailslurp()
            .then(mailslurp => mailslurp.createInbox())
            .then(inbox => {
                // save inbx id and email address to this (make sure you use function and not arrow syntax)
                cy.wrap(inbox.id).as('inboxId')
                cy.wrap(inbox.emailAddress).as('emailAddress')
            })
        
    });
    
    beforeEach(() => {
        cy.loginAppDev()
    })

    it.only('Mensagens de erro', () => {
        cy.visit('/')

        cy.get(`[ng-if="$ctrl.canISee('usuarios')"]`).click({ force: true }) //entrando em usuarios

        cy.get('tbody')
            .contains('Cyborg')
            .parents('tr')
            .find(`[ng-class="{'disable-content':item.des_publico_pesquisa > 0}"]`).click() //entrando na pesquisa de desligamento do cyborg

        cy.get('.modal_header')
            .contains('Enviar Pesquisa desligamento')
            .should('be.visible') //verificando se a modal da pesquisa de desligamento está aberta

        cy.get('.model_bod > .modalBotoes')
            .contains('Enviar').click()  //clicando em enviar para gerar as mensagens de erro

        cy.get('#usuarioPublicoPesquisaModal > .modal-dialog > .modal-content > .modal-body > .model_bod > :nth-child(1) > :nth-child(2)')
            .contains('Campo obrigatório')
            .should('be.visible')   //verificando a mensagem de campo obrigatório no campo "Escolha um template"

        cy.get('#usuarioPublicoPesquisaModal > .modal-dialog > .modal-content > .modal-body > .model_bod > :nth-child(1)')
            .contains('Escolha um template').next().click() //escolhendo um template

        cy.contains('Pesquisa desligamento teste').click() //escolhendo o template

        cy.get('.model_bod > .modalBotoes')
            .contains('Enviar').click()  //clicando novamente para gerar outras mensagens de erro

        cy.get('#usuarioPublicoPesquisaModal > .modal-dialog > .modal-content > .modal-body > .model_bod > :nth-child(1) > :nth-child(3)')
            .contains('Campo obrigatório')
            .should('be.visible')   //verificando a mensagem de campo obrigatório no campo "Tipo de desligamento"

        cy.get('#usuarioPublicoPesquisaModal > .modal-dialog > .modal-content > .modal-body > .model_bod > :nth-child(1)')
            .contains('Tipo de desligamento').next().click() //Tipo de desligamento

        cy.contains('Involuntário').click()

        cy.get('.model_bod > .modalBotoes')
            .contains('Enviar').click()  //clicando novamente para gerar outras mensagens de erro

        cy.get('.error-msg')
            .should('contain.text', 'Campo obrigatório')    //verificando a mensagem de campo obrigatório em "Selecione um usuário"  

            

        /* cy.get('.model_bod > .modalBotoes')
            .contains('Cancelar').click() //clicando no botão cancelar

        cy.get('[ng-click="resetFilter()"]').click() //clicando no botão limpar     */
    });

    it('Desligamento Involuntário direto pelo elofy && Exclusão do desligamento', () => {
        cy.visit('/')

        cy.get(`[ng-if="$ctrl.canISee('usuarios')"]`).click({ force: true }) //entrando em usuarios

        cy.get('tbody')
            .contains('Cyborg')
            .parents('tr')
            .find(`[ng-class="{'disable-content':item.des_publico_pesquisa > 0}"]`).click() //entrando na pesquisa de desligamento do cyborg

        cy.get('.modal_header')
            .contains('Enviar Pesquisa desligamento')
            .should('be.visible')

        cy.get('#usuarioPublicoPesquisaModal > .modal-dialog > .modal-content > .modal-body > .model_bod > :nth-child(1)')
            .contains('Escolha um template').next().click() //escolha um template

        cy.contains('Pesquisa desligamento teste').click()

        cy.get('#usuarioPublicoPesquisaModal > .modal-dialog > .modal-content > .modal-body > .model_bod > :nth-child(1)')
            .contains('Tipo de desligamento').next().click() //Tipo de desligamento

        cy.contains('Involuntário').click()
        cy.contains('Direto pelo Elofy').prev().click()

        cy.get('.name').type('Lanterna Verde')
        cy.get('ul.ng-scope > :nth-child(1)').click() //selecionando quem vai responder

        cy.get('.model_bod > .modalBotoes')
            .contains('Enviar').click() //salvar

        cy.get('[ng-click="resetFilter()"]').click() //clicando no botão limpar  
        cy.wait(500)

        cy.get('tbody')
            .contains('Cyborg')
            .parents('tr')
            .find(`[ng-click="deleteShutdownSearch(item)"]`).click({ force: true })

        cy.get('.swal2-popup')
            .contains('Você deseja excluir esta pesquisa?')
            .should('be.visible')

        cy.get('.swal2-popup')
            .contains('Continuar').click()

        cy.contains('Deletado com sucesso')
            .should('be.visible')
    });

    it('Desligamento Voluntário direto pelo elofy && Exclusão do desligamento', () => {
        cy.visit('/')

        cy.get(`[ng-if="$ctrl.canISee('usuarios')"]`).click({ force: true }) //entrando em usuarios

        cy.get('tbody')
            .contains('Cyborg')
            .parents('tr')
            .find(`[ng-class="{'disable-content':item.des_publico_pesquisa > 0}"]`).click() //entrando na pesquisa de desligamento do cyborg

        cy.get('.modal_header')
            .contains('Enviar Pesquisa desligamento')
            .should('be.visible')

        cy.get('#usuarioPublicoPesquisaModal > .modal-dialog > .modal-content > .modal-body > .model_bod > :nth-child(1)')
            .contains('Escolha um template').next().click() //escolha um template

        cy.contains('Pesquisa desligamento teste').click()

        cy.get('#usuarioPublicoPesquisaModal > .modal-dialog > .modal-content > .modal-body > .model_bod > :nth-child(1)')
            .contains('Tipo de desligamento').next().click() //Tipo de desligamento

        cy.contains('Voluntário').click()
        cy.contains('Direto pelo Elofy').prev().click()

        cy.get('.name').type('Lanterna Verde')
        cy.get('ul.ng-scope > :nth-child(1)').click() //selecionando quem vai responder

        cy.get('.model_bod > .modalBotoes')
            .contains('Enviar').click() //salvar

        cy.get('[ng-click="resetFilter()"]').click() //clicando no botão limpar    

        cy.get('tbody')
            .contains('Cyborg')
            .parents('tr')
            .find(`[ng-click="deleteShutdownSearch(item)"]`).click({ force: true })

        cy.get('.swal2-popup')
            .contains('Você deseja excluir esta pesquisa?')
            .should('be.visible')

        cy.get('.swal2-popup')
            .contains('Continuar').click()

        cy.contains('Deletado com sucesso')
            .should('be.visible')
    });

    it('Desligamento Involuntário por link externo && Exclusão do desligamento', () => {
        cy.visit('/')

        cy.get(`[ng-if="$ctrl.canISee('usuarios')"]`).click({ force: true }) //entrando em usuarios

        cy.get('tbody')
            .contains('Cyborg')
            .parents('tr')
            .find(`[ng-class="{'disable-content':item.des_publico_pesquisa > 0}"]`).click() //entrando na pesquisa de desligamento do cyborg

        cy.get('.modal_header')
            .contains('Enviar Pesquisa desligamento')
            .should('be.visible')

        cy.get('#usuarioPublicoPesquisaModal > .modal-dialog > .modal-content > .modal-body > .model_bod > :nth-child(1)')
            .contains('Escolha um template').next().click() //escolha um template

        cy.contains('Pesquisa desligamento teste').click()

        cy.get('#usuarioPublicoPesquisaModal > .modal-dialog > .modal-content > .modal-body > .model_bod > :nth-child(1)')
            .contains('Tipo de desligamento').next().click() //Tipo de desligamento

        cy.contains('Involuntário').click() //selecionando o tipo de desligamento
        cy.contains('Por link externo').prev().click() //selecionando o tipo de desligamento

        cy.contains('Insira o e-mail pessoal da pesquisa desligada').next().type('emailteste@elofy.com.br')

        cy.get('.model_bod > .modalBotoes')
            .contains('Enviar').click() //salvar

        cy.get('.c-modal__title')
            .should('have.text', 'Copiar link') //conferindo se a modal está aberta

        cy.get('.copy_link').click() //copiando o link

        cy.get('.toast')
            .should('have.text', 'Cópiado') //verificando se o link foi copiado

        cy.get('.ng-scope > .d-flex')
            .contains('Concluído').click() //clicando no botão concluir

        cy.get('[ng-click="resetFilter()"]').click() //clicando no botão limpar para garantir que a modal fechou

        cy.get('tbody')
            .contains('Cyborg')
            .parents('tr')
            .find(`[ng-click="deleteShutdownSearch(item)"]`).click({ force: true }) //clicando no botão excluir pesquisa

        cy.get('.swal2-popup')
            .contains('Você deseja excluir esta pesquisa?')
            .should('be.visible') //verificando se a modal de exclusão está aberta

        cy.get('.swal2-popup')
            .contains('Continuar').click() //clicando no botão excluir

        cy.contains('Deletado com sucesso')
            .should('be.visible') //verificando se a pesquisa foi deletada
    });

    it.only('Desligamento Voluntário por link externo && Exclusão do desligamento', function () {

        cy.visit('/')

        cy.get(`[ng-if="$ctrl.canISee('usuarios')"]`).click({ force: true }) //entrando em usuarios

        cy.get('tbody')
            .contains('Cyborg')
            .parents('tr')
            .find(`[ng-class="{'disable-content':item.des_publico_pesquisa > 0}"]`).click() //entrando na pesquisa de desligamento do cyborg

        cy.get('.modal_header')
            .contains('Enviar Pesquisa desligamento')
            .should('be.visible')

        cy.get('#usuarioPublicoPesquisaModal > .modal-dialog > .modal-content > .modal-body > .model_bod > :nth-child(1)')
            .contains('Escolha um template').next().click() //escolha um template

        cy.contains('Pesquisa desligamento teste').click()

        cy.get('#usuarioPublicoPesquisaModal > .modal-dialog > .modal-content > .modal-body > .model_bod > :nth-child(1)')
            .contains('Tipo de desligamento').next().click() //Tipo de desligamento

        cy.contains('Voluntário').click() //selecionando o tipo de desligamento
        cy.contains('Por link externo').prev().click() //selecionando o tipo de desligamento

        cy.contains('Insira o e-mail pessoal da pesquisa desligada').next().type('cardosolucasrodrigues@gmail.com')

        cy.get('.model_bod > .modalBotoes')
            .contains('Enviar').click() //salvar

        cy.get('.c-modal__title')
            .should('have.text', 'Copiar link') //conferindo se a modal está aberta

        cy.get('.copy_link').click() //copiando o link

        cy.get('.link__hash').invoke('text').then(($value) => {
            const link = $value
            cy.visit(link)
        })

        cy.url()
            .should('include', '/desligamento/')

        cy.get('.button__code').click()

        cy.get('.toast')
            .should('have.text', 'Code sent to your email')

      //  cy.mailslurp()
            // use inbox id and a timeout of 30 seconds
       //     .then(mailslurp => mailslurp.waitForLatestEmail(this.inboxId, 30000, true))
            // extract the confirmation code from the email body
      //      .then(email => /.*verification code is (\d{6}).*/.exec(email.body!!)!![1])
            // fill out the confirmation form and submit
     //       .then(code => {
      //          cy.get('.area__code > :nth-child(1)').type(code)
      //          cy.log(code)
      //          /* cy.get("[name=code]").type(code).trigger('change');
        //        cy.get("[data-test=confirm-sign-up-confirm-button]").click(); */
     //       })










        /* cy.get('.toast')
            .should('have.text', 'Cópiado') //verificando se o link foi copiado
 
        cy.get('.ng-scope > .d-flex')
            .contains('Concluído').click() //clicando no botão concluir

        cy.get('[ng-click="resetFilter()"]').click() //clicando no botão limpar para garantir que a modal fechou

        cy.get('#search_name').type('{control+v}') */

        /*  cy.get('tbody')
             .contains('Cyborg')
             .parents('tr')
             .find(`[ng-click="deleteShutdownSearch(item)"]`).click({ force: true }) //clicando no botão excluir pesquisa
 
         cy.get('.swal2-popup')
             .contains('Você deseja excluir esta pesquisa?')
             .should('be.visible') //verificando se a modal de exclusão está aberta
 
         cy.get('.swal2-popup')
             .contains('Continuar').click() //clicando no botão excluir
 
         cy.contains('Deletado com sucesso')
             .should('be.visible') //verificando se a pesquisa foi deletada */
    });
});
