const url = "https://go-wash-api.onrender.com/api/user"; 

async function cadastroUsuario(){  
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let cpf_cnpj = document.getElementById('cpf_cnpj').value
    let birthday = document.getElementById('birthday').value

    if(!name){
        alert("É necessário inserir seu Nome")
        return;
    }

    if(!cpf_cnpj){
        alert("É necessario inserir um CPF ou CNPJ")
        return;
    }

    if(!email){
        alert("É necessário inserir um Email")
        return;
    }

    if(!password){
        alert("É necessário inserir a sua Senha")
        return;
    }

    if(!birthday){
        alert("Insira sua Data de Nascimento")
    }

    if (!document.getElementById('terms').checked) {
        alert("Você precisa aceitar os termos para prosseguir.");
        return;
    }

    if (cpf_cnpj.length < 11 || (cpf_cnpj.length > 11 && cpf_cnpj.length !== 14)) {

        alert("CPF ou CNPJ Invalido!");
        return;
    }

    
    if (cpf_cnpj.length === 11) {
        
    } else if (cpf_cnpj.length === 14) { 
        
    }

    let api = await fetch(url,{ 
        method: "POST", 
        body: JSON.stringify( 

            { 
                "name":name,
                "email":email,
                "user_type_id":1,
                "password": password,
                "cpf_cnpj": cpf_cnpj,
                "terms": 1,
                "birthday":birthday
                           

            }
        ),
        headers:{
            'Content-Type': 'application/json'
        }
    })

    

    if(api.ok){
        let resposta = await api.json();
        console.log(resposta)
        alert("Cadastro realizado com sucesso.\nEnviamos um link de ativação para o seu email!");

        return

    }

    
    let respostaErro = await api.json();

    if (respostaErro.data && respostaErro.data.errors) {
        let mensagens = [];
    
        if (respostaErro.data.errors.email) {
            mensagens.push(respostaErro.data.errors.email[0]);
    }
        if (respostaErro.data.errors.cpf_cnpj) {
            mensagens.push(respostaErro.data.errors.cpf_cnpj[0]);
    }

    alert(mensagens.join("\n"));
    }

}
