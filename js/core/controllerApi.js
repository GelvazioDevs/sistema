const deleteRegister = async (id, rota) => {
    await api.delete(rota, id);
    updateTable(rota);    
}

const editRegister = async (id, rota) => {
    const data = await readRegister(id, rota)
    fillFields(data)
    openModal()
}

const updateTable = async (rota) => {
    const db_data = await api.get(rota);
    
    clearTable();
    
    await db_data.forEach(function(data) {
        createRow(data, rota)
    })
}

const readRegister = async function (id, rota) {
    return await api.get(`${rota}/${id}`);    
}

const createRegister = async (data, rota) => {
    return await api.post(rota, data);
}

const updateRegister = async (id, body, rota) => {
    return await api.put(`${rota}/${id}`, body);    
}