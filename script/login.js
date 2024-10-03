const url = "https://go-wash-api.onrender.com/api/login";

async function loginUsuario() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    
    if (!email) {
        alert("É necessário inserir um Email");
        return;
    }

    if (!password) {
        alert("É necessário inserir a sua Senha");
        return;
    }

    
    let api = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "password": password,
            "user_type_id": 1
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    
    if (api.ok) {
        let resposta = await api.json();
        
    
        localStorage.setItem('access_token', resposta.access_token);
        
        
        window.location.href = "../view/home.html"; 
    } else {
        let respostaErro = await api.json();
        
        
        if (respostaErro.data && respostaErro.data.errors) {
            alert(Object.values(respostaErro.data.errors));
    }
    }

}
