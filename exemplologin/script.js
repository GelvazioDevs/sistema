document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    fetch(`http://localhost:3333/users?username=${username}&password=${password}`)
        .then(response => response.json())
        .then(users => {
            const message = document.getElementById('message');
            if (users.length > 0) {
                message.style.color = 'green';
                message.textContent = 'Login bem-sucedido! ✅';
                // Aqui você pode redirecionar ou fazer outra ação
            } else {
                message.style.color = 'red';
                message.textContent = 'Usuário ou senha inválidos ❌';
            }
        })
        .catch(error => {
            console.error('Erro ao conectar com o servidor:', error);
            document.getElementById('message').textContent = 'Erro ao conectar ao servidor.';
        });
});
