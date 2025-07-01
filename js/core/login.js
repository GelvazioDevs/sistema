'use strict'

function loadAcoesLogin() {
    
    document.getElementById('loginForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const message = document.getElementById('message');
        message.textContent = ''; // Limpa a mensagem anterior

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        if (!email || !password) {
            message.style.color = 'red';
            message.textContent = 'Por favor, preencha todos os campos. ❌';
            return;
        }
        // Verifica se o email é válido     
        const users = await api.post('login', { email, password });
        // Verifica se o usuário foi encontrado
        if(users.mensagem !== undefined) {
            message.style.color = 'red';
            message.textContent = users.mensagem + '❌';
            return;
        }

        if (users.length > 0) {
            localStorage.setItem('user', JSON.stringify(users[0]));
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
