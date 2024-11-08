async function carregarEndereco() {
    let parametros = new URLSearchParams(window.location.search);
    let id = parametros.get('id');
    const url = `https://go-wash-api.onrender.com/api/auth/address/${id}`;
    let token = localStorage.getItem('access_token');

    if (!token) {
        alert("Você precisa estar logado para atualizar um endereço.");
        return;
    }

    try {
        let api = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (api.ok) {
            let endereco = await api.json();
            document.getElementById('title').value = endereco.data.title; 
            document.getElementById('cep').value = endereco.data.cep; 
            document.getElementById('address').value = endereco.data.address; 
            document.getElementById('number').value = endereco.data.number; 
        } else {
            let respostaErro = await api.json();
            alert(respostaErro.message || "Erro ao carregar o endereço.");
        }
    } catch (error) {
        alert("Ocorreu um erro. Tente novamente.");
    }
}

async function atualizarEndereco() {
    let parametros = new URLSearchParams(window.location.search);
    let id = parametros.get('id');
    const url = `https://go-wash-api.onrender.com/api/auth/address/${id}`;
    let token = localStorage.getItem('access_token');

    let title = document.getElementById('title').value;
    let cep = document.getElementById('cep').value;
    let address = document.getElementById('address').value;
    let number = document.getElementById('number').value;

    if (!title  || !cep || !address || !number) {
        alert('É necessário preencher todos os campos.');
        return;
    }

    try {
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "title": title,
                "cep": cep,
                "address": address,
                "number": number
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (api.ok) {
            let resposta = await api.json();
            console.log(resposta)
            alert("Endereço atualizado com sucesso");
            window.location.href = "/index.html";
        } else {
            let respostaErro = await api.json();
            if (respostaErro.data && respostaErro.data.errors) {
                alert(respostaErro.data[0]) 
            }
        }
    } catch (error) {
        alert("Ocorreu um erro. Tente novamente.");
    }
}
window.onload = carregarEndereco;
