
function verificarLogin() {
    if (localStorage.getItem('access_token')) {
        document.getElementById('logoutContainer').style.display = 'block'; 
    }
}

function logoutUsuario() {
    localStorage.removeItem('access_token');
    alert("Sua sessão foi encerrada com sucesso.")
    window.location.href = "../view/login.html"; 
}

document.addEventListener('DOMContentLoaded', verificarLogin);
// deu certo!