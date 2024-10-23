async function listarEnderecos() {
    const url = "https://go-wash-api.onrender.com/api/auth/address";
    let token = localStorage.getItem('access_token');

    if (!token) {
        alert("Você precisa estar logado para ver seus endereços.");
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
            let resposta = await api.json();
            console.log(resposta);
            
            let enderecos = resposta.data;
            let tbody = document.getElementById("addressTableBody");
            tbody.innerHTML = ""; 

            if (Array.isArray(enderecos)) {
                enderecos.forEach(endereco => {
                    let row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${endereco.id}</td>
                        <td>${endereco.title}</td>
                        <td>${endereco.cep}</td>
                        <td>${endereco.address}</td>
                        <td>${endereco.number}</td>
                        <td><button class="botao_atualiza" data-id="${endereco.id}">Atualizar</button></td>
                        <td><button class="botao_deleta" data-id="${endereco.id}">Deletar</button></td>
                    `;
                    tbody.appendChild(row);
                });
            } else {
                console.error("enderecos não são um array:", enderecos);
                alert("Não foram encontrados endereços.");
            }
        } else {
            let respostaErro = await api.json();
            console.error(respostaErro);
        }
    } catch (error) {
        console.error("Erro ao listar endereços:", error);
    }
}

window.onload = listarEnderecos;