
// FUNCOES DINAMICAS POR PAGINA ABAIXO => ACIMA NAO MEXER!!!
// FUNCOES DINAMICAS POR PAGINA ABAIXO => ACIMA NAO MEXER!!!
// FUNCOES DINAMICAS POR PAGINA ABAIXO => ACIMA NAO MEXER!!!
// FUNCOES DINAMICAS POR PAGINA ABAIXO => ACIMA NAO MEXER!!!

function getHtmlConsultaPagina(pagina) {
    if(pagina == "clientes") {
        return getHtmlConsultaPaginaCliente();
    }

    return `<h1>Página da consulta de [${pagina}] não encontrada!</h1>
    <h1>Crie a consulta em:modal.js  na função "getHtmlConsultaPagina(pagina)"!</h1>`;
}

function getFormulario(pagina) {
    if(pagina == "clientes") {
        return getFormularioCliente();
    }

    return `<h1>Formulário da página:[${pagina}] não encontrado!</h1>
    <h1>Crie o formulário em:modal.js  na função "getFormulario(pagina)"!</h1>`;
}

