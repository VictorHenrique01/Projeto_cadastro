
function verificarLogin() {
    if (localStorage.getItem('access_token')) {
        document.getElementById('logoutContainer').style.display = 'block'; 
    } else {
        window.location.href = "../view/login.html"; 
    }
}

function logoutUsuario() {
    localStorage.removeItem('access_token');
    console.log("Token removido:", localStorage.getItem('access_token'));
    window.location.href = "../view/login.html"; 
}


document.addEventListener('DOMContentLoaded', verificarLogin);
//não deu certo!