'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = [];//JSON.parse(db_client)
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

// CRUD - create read update delete
const deleteClient = async (id, rota) => {
    const response = await fetch(`http://localhost:3333/clientes/${id}`, {
        method: "DELETE",
    });

    const response2 = await response.json();

    clearTable();
    updateTable();

    return response2.id;
}

const updateClient = async (id, body) => {
    const response = await fetch(`http://localhost:3333/clientes/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
    });

    return await response.json();
}

const readClient = async function (id) {
    const response = await fetch(`http://localhost:3333/clientes/${id}`);
    var dados = await response.json();
    return dados;
}

const createClient = async (client) => {
    const response = await fetch(`http://localhost:3333/clientes`, {
        method: "POST",
        body: JSON.stringify(client),
    });

    return await response.json();
}

// Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('id').dataset.index = 'new'
}

async function getIdIncrementado() {
    try {
        // Faz a consulta à API
        const response = await fetch('http://localhost:3333/clientes');

        if (!response.ok) {
            throw new Error(`Erro ao buscar os clientes: ${response.statusText}`);
        }

        // Converte a resposta para JSON
        const clientes = await response.json();

        // Se a lista de clientes estiver vazia, retornamos 1 (como exemplo)
        if (clientes.length === 0) {
            console.log("Nenhum cliente encontrado. Retornando id 1.");
            return 1;
        }

        // Encontrar o cliente com o maior id
        const maiorId = Math.max(...clientes.map(cliente => cliente.id));

        // Retorna o id incrementado em 1
        const idIncrementado = maiorId + 1;

        console.log(`Maior ID encontrado: ${maiorId}. ID incrementado: ${idIncrementado}`);

        return idIncrementado;
    } catch (error) {
        console.error('Erro ao buscar ou processar os dados:', error);
        return null;
    }
}


const saveClient = async () => {
    if (isValidFields()) {
        let idIncrementado = await getIdIncrementado();
        let idAtual = parseInt(document.getElementById('id').value);
        let id = 0;
        if (idAtual > 0) {
            id = idAtual;
        } else {
            id = idIncrementado;
        }

        const client = {
            id: id.toString(),
            name: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }

        if (idAtual > 0) {
            updateClient(id, client)
        } else {
            createClient(client)
        }

        updateTable()
        closeModal()
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.id}</td>
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" onclick="editClient(${client.id})">Editar</button>
            <button type="button" class="button red"  onclick="deleteClient(${client.id})">Excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = async () => {
    const response = await fetch(`http://localhost:3333/clientes`);
    var db_client = await response.json();

    console.log("clientes: ");
    console.log(db_client);

    clearTable();

    await db_client.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('id').value = client.id
    document.getElementById('nome').value = client.name
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}

const editClient = async (id) => {
    const client = await readClient(id)
    fillFields(client)
    openModal()
}

function loadAcoesCliente() {

    updateTable();

    // Eventos
    document.getElementById('cadastrarCliente')
        .addEventListener('click', openModal)

    document.getElementById('modalClose')
        .addEventListener('click', closeModal)

    document.getElementById('salvar')
        .addEventListener('click', saveClient)

    document.getElementById('cancelar')
        .addEventListener('click', closeModal)
}

