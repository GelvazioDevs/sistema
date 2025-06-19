const api = {
    baseUrl : "http://localhost:3333/",
    get: async (rota) => {
        const response = await fetch(api.baseUrl + rota);
        return response.json();
    },
    post: async (rota, data) => {
        const response = await fetch(api.baseUrl + rota, {	body: JSON.stringify(data), method: "POST"});
        return response.json();
    },
    put: async (rota, data) => {
        const response = await fetch(api.baseUrl + rota + "/" + data.id, {	body: JSON.stringify(data), method: "PUT"});
        return response.json();
    },
    delete: async (rota, id) => {
        const response = await fetch(api.baseUrl + rota + "/" + id, { method: "DELETE"});
        return response.json();
    }
}