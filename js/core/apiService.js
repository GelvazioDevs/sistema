const urlBase = 'http://localhost:8080/api/v1/';

const api = {
    baseUrl : urlBase,
    get: async (rota) => {
        const response = await fetch(api.baseUrl + rota, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    },
    post: async (rota, data) => {
        const response = await fetch(api.baseUrl + rota, {
            body: JSON.stringify(data),
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    },
    put: async (rota, data) => {
        const response = await fetch(api.baseUrl + rota + "/" + data.id, {
            body: JSON.stringify(data),
            method: "PUT",
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    },
    delete: async (rota, id) => {
        const response = await fetch(api.baseUrl + rota + "/" + id, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    }
}

const apiIBGE = {
    baseUrl : "https://servicodados.ibge.gov.br/api/v1/",
    get: async (rota) => {
        const response = await fetch(apiIBGE.baseUrl + rota, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    },
    post: async (rota, data) => {
        const response = await fetch(api.baseUrl + rota, {
            body: JSON.stringify(data),
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    },
    put: async (rota, data) => {
        const response = await fetch(api.baseUrl + rota + "/" + data.id, {
            body: JSON.stringify(data),
            method: "PUT",
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    },
    delete: async (rota, id) => {
        const response = await fetch(api.baseUrl + rota + "/" + id, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    }
}