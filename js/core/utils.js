const isValidFields = () => {
	return document.getElementById('form').reportValidity()
}

async function getIdIncrementado(rota) {
    try {
        // Faz a consulta à API
        const response = await api.get(rota);

        // Se a lista de clientes estiver vazia, retornamos 1 (como exemplo)
        if (response.length === 0) {
            alert("Nenhum cliente encontrado. Retornando id 1.");
            console.log("Nenhum cliente encontrado. Retornando id 1.");
            return 1;
        }

        // Encontrar o cliente com o maior id
        const maiorId = Math.max(...response.map(cliente => cliente.id));

        // Retorna o id incrementado em 1
        const idIncrementado = maiorId + 1;

        return idIncrementado;
    } catch (error) {
        alert('Erro ao buscar ou processar os dados:', error);
        console.error('Erro ao buscar ou processar os dados:', error);
        return null;
    }
}
