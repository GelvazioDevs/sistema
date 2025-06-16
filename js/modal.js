// Carrega o modal conforme cada pagina

function loadModalContainer(pagina) {
    const container = document.getElementById('container');
    container.innerHTML = '';

    if (pagina !== "cliente") {
        let pageNotFound = pagina.toUpperCase();
        container.innerHTML = `<h1 class="header-title" 
        id="header-title-info">Página [${pageNotFound}] não encontrada</h1>`;
        return;
    }

    const htmlModal = getHtmlModal(pagina);
    container.innerHTML = htmlModal;

    if (pagina == "cliente") {
        // Adiciona o evento de click no botão cadastrar cliente
        loadAcoesCliente();
    }
}

function getHtmlModal(pagina) {
    return (
        ` <header>
            <h1 class="header-title" id="title-header">Cadastro de Clientes</h1>
        </header>
        <main>
            <button type="button" class="button blue mobile" id="cadastrarCliente">Cadastrar Cliente</button>
            
            <table id="tableClient" class="records">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Celular</th>
                        <th>Cidade</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>

            <div class="modal" id="modal">
                <div class="modal-content">
                    <header class="modal-header">
                        <h2>Novo Cliente</h2>
                        <span class="modal-close" id="modalClose">&#10006;</span>
                    </header>
                    <form id="form" class="modal-form">
                        <input type="text" id="nome" data-index="new" class="modal-field" placeholder="Nome do Cliente"
                            required>
                        <input type="email" id="email" class="modal-field" placeholder="e-mail do Cliente" required>
                        <input type="text" id="celular" class="modal-field" placeholder="Celular do Cliente" required>
                        <input type="text" id="cidade" class="modal-field" placeholder="Cidade do Cliente" required>
                    </form>

                    <footer class="modal-footer">
                        <button id="salvar" class="button green">Salvar</button>
                        <button id="cancelar" class="button blue">Cancelar</button>
                    </footer>
                </div>
            </div>
        </main>
        `
    );
}