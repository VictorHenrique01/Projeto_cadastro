// Captura o ID do endereço a partir do URL
function obterIdEndereco() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Carrega os dados do endereço ao abrir a página de atualização
document.addEventListener("DOMContentLoaded", async function() {
    const id = obterIdEndereco();
    if (!id) {
        alert("ID do endereço não encontrado.");
        return;
    }

    await carregarDadosEndereco(id);

    document.querySelector('form').addEventListener('submit', async function(event) {
        event.preventDefault();
        await atualizarEndereco(id);
    });
});

// Carrega os dados do endereço para o formulário
async function carregarDadosEndereco(id) {
    const url = `https://go-wash-api.onrender.com/api/auth/address/${id}`;
    const token = localStorage.getItem('access_token');

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const endereco = await response.json();
                document.getElementById('title').value = endereco.data.title;
                document.getElementById('cep').value = endereco.data.cep;
                document.getElementById('address').value = endereco.data.address;
                document.getElementById('number').value = endereco.data.number;
            } else {
                console.error("Resposta não é JSON:", await response.text());
                alert("Erro ao carregar os dados do endereço. Tente novamente mais tarde.");
            }
        } else {
            console.error("Erro ao carregar endereço:", await response.text());
        }
    } catch (error) {
        console.error("Erro ao conectar com a API:", error);
    }
}

// Atualiza o endereço na API
async function atualizarEndereco(id) {
    const url = `https://go-wash-api.onrender.com/api/auth/address/${id}`;
    const token = localStorage.getItem('access_token');
    const dadosAtualizados = {
        title: document.getElementById('title').value,
        cep: document.getElementById('cep').value,
        address: document.getElementById('address').value,
        number: document.getElementById('number').value
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dadosAtualizados)
        });

        if (response.ok) {
            alert("Endereço atualizado com sucesso!");
            window.location.href = "/index.html";
        } else {
            console.error("Erro ao atualizar endereço:", await response.text());
        }
    } catch (error) {
        console.error("Erro ao conectar com a API:", error);
    }
}
