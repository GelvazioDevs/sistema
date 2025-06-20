// Carrega o modal conforme cada pagina

function loadModalContainer(pagina) {
    const container = document.getElementById('container');
    container.innerHTML = '';

    if (pagina == "login") {
        const htmlModal = getHtmlModalLogin();
        container.innerHTML = htmlModal;
        loadAcoesLogin();
    } else {
        const htmlModal = getHtmlPagina(pagina);
        container.innerHTML = htmlModal;
        loadAcoesModal(pagina);
    }
}

function getHtmlModalLogin() {
        return (
            ` <header>
                    <h1 class="header-title" id="title-header">Login Sistema</h1>
                </header>

        <main style="text-align: center;width: 30%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;">
       
            <form id="loginForm" class="modal-form">
                <input
                    value="senac@email.com"
                    style="width:320px;"
                    type="email"
                    id="email"
                    class="modal-field"
                    placeholder="E-mail do Usuário" required>

                <input
                    value="Senac.2025"
                    type="password" id="password" data-index="new"
                    class="modal-field" placeholder="Senha do Usuario"
                    required
                    style="width:320px;">
                    <br/>

                <footer class="modal-footer"
                    style="width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 5px;
                        background-color: #f0f0f0;">

                    <input type="submit" id="entrar" class="button green" value="Entrar"  id="salvar" class="button green">
                    <button id="cancelar" class="button blue">Cancelar</button>
                </footer>
            </form>               
        </main>
        `
        );
}

function getHtmlPagina(pagina) {
    return (
        `   
            <main>
            <div class="acoesConsulta">
                <button type="button" class="button blue mobile" id="cadastrarRegistro">Cadastrar ${pagina}</button>
                <span class="header-title" id="title-header">Cadastro de ${pagina}</span>
            </div>
                ${getHtmlConsultaPagina(pagina)}
                ${getHtmlModalCadastro(pagina)}
            </main>    
        `
    )
}

function getHtmlModalCadastro(pagina) {
    return (
        `<div class="modal" id="modal">
                <div class="modal-content">
                    <header class="modal-header">
                        <h2>Novo Registro</h2>
                        <span class="modal-close" id="modalClose">&#10006;</span>
                    </header>
                    ${getFormulario(pagina)}
                    <footer class="modal-footer">
                        <button id="salvar" class="button green">Salvar</button>
                        <button id="cancelar" class="button blue">Cancelar</button>
                    </footer>
                </div>
            </div>`
    )
}

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableConsulta>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")    
}

const saveData = async (rota) => {
    if (isValidFields()) {
        let idIncrementado = await getIdIncrementado(rota);
        let idAtual = parseInt(document.getElementById('id').value);
        let id = 0;
        if (idAtual > 0) {
            id = idAtual;
        } else {
            id = idIncrementado;
        }

        const data = getData(rota, id);

        if (idAtual > 0) {
            updateRegister(id, data, rota)
        } else {
            createRegister(data, rota)
        }

        updateTable(rota)
        
        closeModal()
    }
}


function loadAcoesModal(rota) {

    updateTable(rota);

    // Eventos
    document.getElementById('cadastrarRegistro')
        .addEventListener('click', openModal)

    document.getElementById('modalClose')
        .addEventListener('click', closeModal)

    document.getElementById('salvar')
        .addEventListener('click', function() {
            saveData(rota)
        })

    document.getElementById('cancelar')
        .addEventListener('click', closeModal)
}


