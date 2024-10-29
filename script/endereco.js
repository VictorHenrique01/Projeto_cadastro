async function cadastrarEndereco() {
       
    const url = "https://go-wash-api.onrender.com/api/auth/address";
   

    let title = document.getElementById('title').value;
    let cep = document.getElementById('cep').value;
    let address = document.getElementById('address').value; 
    let number = document.getElementById('number').value;
    let complement = document.getElementById('complement').value;

    let token = localStorage.getItem('access_token');
    
    if (!token) {
        alert("Você precisa estar logado para cadastrar um endereço.");
        return;
    }


    if (!title || !cep || !address || !number || !complement) {
        alert('É necessário preencher todos os campos.');
        return;
    }

    let api = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "title": title,
            "cep": cep,
            "address": address,
            "number": number,
            "complement": complement
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    
    if (api.ok) {
        let resposta = await api.json();
        console.log(resposta)
        alert("Endereço cadastrado com sucesso")
        window.location.href = "/index.html";
    
        
    } else {
        let respostaErro = await api.json();
        
        
        if (respostaErro.data && respostaErro.data.errors) {
            alert(respostaErro.data.errors[0]);
    }
}

}
