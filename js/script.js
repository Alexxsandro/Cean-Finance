let 
chat,
containerChat,
userDados,
btnperca,
btnAtendente,
btnLimite,
containerCadastro,
btnChatEnviar,
containerLogin;

containerLogin = document.querySelector('.containerLogin');
chat = document.querySelector('.img_chat');
containerChat = document.querySelector('.chat_login');
userDados = document.getElementById('userDados')
btnperca = document.getElementById('btnperca');
btnAtendente = document.getElementById('btnAtendente');
btnLimite = document.getElementById('btnLimite');
btnChatEnviar = document.getElementById('btnChatEnviar');
const cadastroUsuario = [];

let verificaChat = 0;
const openChat = () => {
    if(verificaChat === 0){
        containerChat.classList.add('chatOn');
    }
    verificaChat++;

    setTimeout(() => {
        containerChat.classList.remove('chatOn');
        verificaChat = 0;
    },20000)
}

btnperca.addEventListener('click', () => {
    let msgChat = document.querySelector('.chatRemove');
    msgChat.remove();
            
    setTimeout(() => {
        let chatContainer = document.querySelector('.chat-container');
        let newChat = document.createElement('div');
        let newAtrr = document.createAttribute('class');
        newAtrr.value = 'chatRemove';

        newChat.setAttributeNode(newAtrr);

        newChat.innerHTML = `<p class="paragraf">Digite a opção correta:</p>
        <p class="paragraf">1 - Limite </p>
        <p class="paragraf">2 - Roubo</p>
        `;

        chatContainer.appendChild(newChat)
    },200)

    setTimeout(() => {
        containerChat.classList.remove('chatOn');
    },20000)
})

btnChatEnviar.addEventListener('click', () => {
    let chatValue = document.getElementById('chatvalue');
    if(chatValue.value === '1' || chatValue.value === 1){
        let msgChat = document.querySelector('.chatRemove');
            msgChat.remove();
        
            setTimeout(() => {
                let chatContainer = document.querySelector('.chat-container');
                let newChat = document.createElement('div');
                let newAtrr = document.createAttribute('class');
                newAtrr.value = 'chatRemove';
                newChat.setAttributeNode(newAtrr);
        
                newChat.innerHTML = `<p class="paragraf">Seu Limite: *****</p>
               
                <p class="paragraf">Faça Login para ter informações sobre limites</p>
                `;
                chatContainer.appendChild(newChat)
                chatValue.value = '';
            },200)

            setTimeout(() => {
                containerChat.classList.remove('chatOn');
            },20000)

            userDados.focus();

    }else if(chatValue.value === 2 || chatValue.value === '2'){
        let msgChat = document.querySelector('.chatRemove');
            msgChat.remove();
            
            setTimeout(() => {

                let chatContainer = document.querySelector('.chat-container');
                let newChat = document.createElement('div');
                let newAtrr = document.createAttribute('class');
                newAtrr.value = 'chatRemove';
                newChat.setAttributeNode(newAtrr);
        
                newChat.innerHTML = `<p class="paragraf">Perca ou roubo do cartão</p>
               
                <p class="paragraf">Enviar uma mensagem explicando o acontecido para o email:</p>
                <p class="paragraf">ceancrypto@gmail.<br>com.br</p>
                `;
        
                chatContainer.appendChild(newChat)
                chatValue.value = '';
            },200)

            setTimeout(() => {
                containerChat.classList.remove('chatOn');
            },20000)
    }
})

btnAtendente.addEventListener('click', () => {
    let msgChat = document.querySelector('.chatRemove');
            msgChat.remove();

            setTimeout(() => {

                let chatContainer = document.querySelector('.chat-container');
                let newChat = document.createElement('div');
                let newAtrr = document.createAttribute('class');
                newAtrr.value = 'chatRemove';
                newChat.setAttributeNode(newAtrr);
        
                newChat.innerHTML = `<p class="paragraf">Falar com atendente:</p>
               
                <p class="paragraf">Transferindo para o atendente:<br> <i>John huugs</i></p>
                <p class="paragraf">...</p>
                `;
        
                chatContainer.appendChild(newChat)
                chatValue.value = '';
            },200)

            setTimeout(() => {
                containerChat.classList.remove('chatOn');
            },3500)
})

const btnEntrar = () => {
        if(userDados.value !== '' && userDados.value !== undefined && userDados.value !== null){
            
            fetch('http://localhost:4444/login',{
                method: 'POST',
                headers:{
                    Accept: "application/json",
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": userDados.value
                })
            }).then((resp) => {
                  return resp.json()
                 
            }).then((data) => {
                if(data.msg === '200'){
                    loginSucess()
                    guardaDados(data.value.email);
                }else{
                    
                    containerCadastro = document.querySelectorAll(".container_cadastro input")
                    containerCadastro[1].value = userDados.value;

                    containerCadastro = document.querySelector(".container_cadastro");
                    containerCadastro.classList.add('cadastroAtivo');
                }
              })
        }else{
            loginErro()
        }
}

const guardaDados = (value) => {

    let converte = JSON.stringify(value);
    let setLocalstorage = localStorage.setItem('dadosUsuario', converte); 
}

const btnCadastro = () => {
    
    const dbCadastro = {
        nome: '',
        email: '',
        cpf: '',
        senha: '',
        confirmaSenha: '',
    }

    containerCadastro = document.querySelectorAll(".container_cadastro input")

    console.log(containerCadastro)
    if(containerCadastro[0].value !== '' && containerCadastro[1].value !== '' && containerCadastro[2].value !== '' && 
    containerCadastro[3].value !== '' && containerCadastro[4].value !== '' && (containerCadastro[3].value === containerCadastro[4].value)){
    
        dbCadastro.nome = containerCadastro[0].value;
        dbCadastro.email = containerCadastro[1].value;
        dbCadastro.cpf = containerCadastro[2].value;
        dbCadastro.senha = containerCadastro[3].value;
        dbCadastro.confirmaSenha = containerCadastro[4].value;
    
    cadastroUsuario.push(dbCadastro);

    fetch('http://localhost:4444/cadastro',{
        method: 'POST',
        headers:{
            Accept: "application/json",
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            "nome": dbCadastro.nome,
            "email": dbCadastro.email,
            "cpf": dbCadastro.cpf,
            "senha" : dbCadastro.senha
        })
    }).then((resp) => {
         return resp.json()
    }).then((data) => {
        if(data.msg == null){
            handleOffCadastro()
          }else{
            cadastroEfetuadoSucess()
            guardaDados(data.msg)
          }
    })
}else{
    erroCadastro();
}
}

const modalIncrever = () => {
    containerCadastro = document.querySelector(".container_cadastro");
    containerCadastro.classList.add('cadastroAtivo');

}

const handleOffCadastro = () => {
    
    containerCadastro = document.querySelector(".container_cadastro");
    containerCadastro.classList.remove('cadastroAtivo');
    userDados.focus();
}

const loginSucess = () => {

    let msgCadastroText = document.querySelector('.msgCadastro p');
    msgCadastroText.innerHTML = `<p>Login efetuado com sucesso</p>`

    let msgCadastro = document.querySelector('.msgCadastro');

    msgCadastro.style.marginTop = '106px'
    msgCadastro.classList.add('msgAtivo');
    msgCadastro.style.backgroundColor = '#31a719'

    setTimeout(() => {
        msgCadastro.classList.remove('msgAtivo');
        window.location.href='index.html'
    },800)
}

const loginErro = () => {

    let msgCadastroText = document.querySelector('.msgCadastro p');
    msgCadastroText.innerHTML = `<p>Preencha todos os campos</p>`

    let msgCadastro = document.querySelector('.msgCadastro');

    msgCadastro.style.marginTop = '106px'
    msgCadastro.style.backgroundColor = '#d84545';
    msgCadastro.classList.add('msgAtivo');

    setTimeout(() => {
        msgCadastro.classList.remove('msgAtivo');
    },800)

}

const cadastroEfetuadoSucess = () => {
    
    let msgCadastro = document.querySelector('.msgCadastro');
    msgCadastro.classList.add('msgAtivo');
    msgCadastro.style.backgroundColor = '#31a719'
    
    setTimeout(() => {
        msgCadastro.classList.remove('msgAtivo');
        window.location.href='index.html'
    }, 600)
}

const erroCadastro = () => {

    let msgCadastroText = document.querySelector('.msgCadastro p');
    msgCadastroText.innerHTML = `<p>Preencha todos os campos</p>`

    let msgCadastro = document.querySelector('.msgCadastro');

    msgCadastro.style.backgroundColor = '#d84545';
    msgCadastro.classList.add('msgAtivo');

    setTimeout(() => {
        msgCadastro.classList.remove('msgAtivo');
    },800)
}

chat.addEventListener('click', openChat);
