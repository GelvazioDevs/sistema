'use strict'

function getData(rota, id){
    if(rota == "clientes"){
        return {
            id: id.toString(),
            name: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
    }
}

const createRow = (data, rota) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${data.id}</td>
        <td>${data.name}</td>
        <td>${data.email}</td>
        <td>${data.celular}</td>
        <td>${data.cidade}</td>
        <td>
            <button type="button" class="button green" onclick="editRegister(${data.id}, '${rota}')">Editar</button>
            <button type="button" class="button red"  onclick="deleteRegister(${data.id}, '${rota}')">Excluir</button>
        </td>
    `
    document.querySelector('#tableConsulta>tbody').appendChild(newRow)
}

const fillFields = (data) => {
    document.getElementById('id').value = data.id
    document.getElementById('nome').value = data.name
    document.getElementById('email').value = data.email
    document.getElementById('celular').value = data.celular
    document.getElementById('cidade').value = data.cidade    
}

function getHtmlConsultaPaginaCliente(){
    return (
        `<table id="tableConsulta" class="records">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Celular</th>
                        <th>Cidade</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `       
    )
}

function getFormularioCliente() {
    return (
            `<form id="form" class="modal-form">
                <input type="hidden" id="id">                
                <input value="João da Silva" 
                       type="text" id="nome"
                       class="modal-field" 
                       placeholder="Nome do Cliente"
                       required>
                <input value="senac@email.com" type="email" id="email" class="modal-field" placeholder="e-mail do Cliente" required>
                <input value="1234567890" type="text" id="celular" class="modal-field" placeholder="Celular do Cliente" required>
                <input value="São Paulo" type="text" id="cidade" class="modal-field" placeholder="Cidade do Cliente" required>
            </form>`
        )    
}

