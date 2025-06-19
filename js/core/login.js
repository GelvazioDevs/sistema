'use strict'

function loadAcoesLogin() {
    
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        const users = api.get(`users?email=${email}&pass=${password}`)
        console.log(users)

        const message = document.getElementById('message');
        if (users.length > 0) {
            message.style.color = 'green';
            message.textContent = 'Login bem-sucedido! ✅';
            // Aqui você pode redirecionar ou fazer outra ação
            window.location.href = 'index.html'; // Redireciona para a página principal
        } else {
            message.style.color = 'red';
            message.textContent = 'Usuário ou senha inválidos ❌';
        }
    });
}
