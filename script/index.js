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

            let tbody = document.querySelector("tbody");
            tbody.innerHTML = ""; 

            
            if (Array.isArray(enderecos)) {
                enderecos.forEach(endereco => {
                    let row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${endereco.title}</td>
                        <td>${endereco.cep}</td>
                        <td>${endereco.address}</td>
                        <td>${endereco.number}</td>
                    `;
                    tbody.appendChild(row);
                });
            } else {
                console.error("enderecos não é um array:", enderecos);
                alert("Não foram encontrados endereços.");
            }
        } else {
            let respostaErro = await api.json();
            console.error(respostaErro);
            alert(respostaErro.message || "Erro ao listar endereços."); 
        }
    } catch (error) {
        console.error("Erro ao listar endereços:", error);
        alert("Erro ao listar endereços.");
    }
}

window.onload = listarEnderecos;
