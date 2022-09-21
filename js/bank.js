
let 
containerPix,
pix,
iconeSaldo,
pagamento,
deposita,
msgAlerta,
saldoUsuario,
pixEnviar,
saldoAtualizadoPixFinal;

pixEnviar = document.querySelector('.pixEnviar');
msgAlerta = document.querySelector('.msgAlerta');
deposita = document.querySelector('.deposita');
pagamento = document.querySelector('.pagamento');
iconeSaldo = document.querySelector('.iconeSaldo');
pix = document.querySelector('.pix');
containerPix = document.querySelector('.containerPix');
filtro = document.querySelector('.filtro');
saldoAtualizadoPixFinal = document.querySelector(".saldoAtuali");

(function() {
    fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL')
    .then((resp) => {
         return resp.json()
    }).then((data) => {
            let lista = document.querySelector('.lista');
            let newSpan = document.createElement('li');
            newSpan.innerHTML = `<span>BTC</span>/<span>BRL - </span><span>${data.BTCBRL.low}</span>
            <span class="cotaSpan">EUR</span> /<span>BRL - </span><span>${data.EURBRL.low}</span>
            <span class="cotaSpan">USD</span>/<span>BRL - </span><span>${data.USDBRL.low}</span>`
           
            lista.appendChild(newSpan)
            lodaPagina()
        })
})();

const lodaPagina = () => {

    let nomeUsuario = document.querySelector('.nomeUsuario');
    let getLocalStorage = localStorage.getItem('dadosUsuario');
    let converte = JSON.parse(getLocalStorage);
    
    fetch('http://localhost:4444/login',{
        method: 'POST',
        headers:{
            Accept: "application/json","content-Type": "application/json"
        },
        body: JSON.stringify({
            "email" : converte
        })

    }).then((resp) => {
        return resp.json()
   }).then((data) => {

    let table = document.querySelectorAll('.table tr');

    for(let i = 0; i < table.length; i++){
        table[i].remove();
    }  

    setTimeout(() => {
        atualizaDepositoLoad();
        atualizaRegistro();
    },300);
 
       saldoUsuario = data.value.saldo;
       nomeUsuario.innerHTML = data.value.nome;

    })
};

const atualizaRegistro = () => {

    fetch('http://localhost:4444/atualizaRegistro',{
        method: "GET",
    }).then((resp) => {
        return resp.json();
    }).then((data) => {
        if(data == null || data.msg[0] == undefined){
          
        }else{
           data.msg.map((value) => {
            
            setTimeout(() => {
                let table = document.querySelector('.table');
            let newTr = document.createElement('tr');
            newTr.innerHTML = `<tr>
            <td>${value.endereco}</td>
            <td><strong>R$ ${value.valor}<strong</td>
            <td>${value.date}</td>
            <td class="testePix"></td>
            </tr>`

            table.appendChild(newTr);
            },300)
        })
    }
})

}

const handleContainerPix = () => {
    
    containerPix.classList.add('containerPixAtivo')
    filtro.style.display = 'block'

    let saldoAtualizaPix = document.querySelector('.saldoAtualizaPix');
    let converteSaldo = Number(saldoUsuario)
    saldoAtualizaPix.innerHTML = `<span class="saldoAtualizaPix">Saldo disponivel em conta <strong style="color:#333">R$ ${converteSaldo.toFixed(2)}</strong></span>
    `
}

let valorTranferenciaPix = 0;
const confirmaPagamnetoPix = () => {

    let valorPix = document.getElementById('valorPix');
    let converte = Number(saldoUsuario)
    saldoAtualizadoPixFinal.innerHTML = `R$ ${saldoUsuario}`
    valorPix = Number(valorPix.value);

    if(valorPix !== '' && valorPix > 0){
        if(valorPix > converte){
            
        }else{
           
            pixEnviar.classList.add('pixEnviarAtivo')
            valorTranferenciaPix = valorPix;
        }
    }else{
        alert("está vazio ")
    }
}

const finalizarPagamentoPix = () => {
 
    let enderecoPix = document.getElementById('enderecoPix').value;
    
    if(enderecoPix !== ''){

        let getLocalStorage = localStorage.getItem('dadosUsuario');
        let converte = JSON.parse(getLocalStorage);
        let descontoPix = saldoUsuario - valorTranferenciaPix;

        fetch('http://localhost:4444/registro',{
            method: "POST",
            headers:{
            Accept: "application/json", "content-Type" : "application/json"
            },
            body: JSON.stringify({
                "email" : converte,
                "valor" : valorTranferenciaPix,
                "saldo" : descontoPix,
                "endereco" : enderecoPix
            })
        }).then((resp) => {
          
             if(resp.status === 204 || resp.status === '204'){
                lodaPagina()
               
             }
        })
        
        containerPix.classList.remove('containerPixAtivo')
        filtro.style.display = 'none';
        let pixEnviar = document.querySelector('.pixEnviar');
        pixEnviar.classList.remove('pixEnviarAtivo')
    }
}

const handleIconeSaldo = () => {

    let escondeSaldo = document.querySelector('.escondeSaldo');
    let converte = Number(saldoUsuario)
    escondeSaldo.innerHTML = converte.toFixed(2);

    setTimeout(() => {
        escondeSaldo.innerHTML = '*****'
    },900);

}

const handleContainerPagamento = () => {

    let containerPagamento = document.querySelector('.container_pagamento');
    containerPagamento.classList.add('containerPagamentoAtivo')
    filtro.style.display = 'block'

}

const handleContainerDeposita = () => {

    let containerDeposita = document.querySelector('.container_deposito');
    containerDeposita.classList.add('containerDepositoAtivo')
    filtro.style.display = 'block'

}

const handleclosedPix = () => {

    containerPix.classList.remove('containerPixAtivo')
    filtro.style.display = 'none'

}

const handleclosedPagamento = () => {


    let containerPagamento = document.querySelector('.container_pagamento');
    containerPagamento.classList.remove('containerPagamentoAtivo')
    filtro.style.display = 'none'

}

const handleclosedDeposito = () => {

    let containerDeposita = document.querySelector('.container_deposito');
    containerDeposita.classList.remove('containerDepositoAtivo')
    filtro.style.display = 'none'

}

const handleclosedFinalizaDeposito = () => {

    containerPix.classList.remove('containerPixAtivo')
    filtro.style.display = 'none'
    let pixEnviar = document.querySelector('.pixEnviar');
    pixEnviar.classList.remove('pixEnviarAtivo')

}

let tempoDeposito = 0;
const clickDeposito = () => {
    
    let deposito = document.getElementById('deposito').value;
    if(deposito !== '' && deposito !== null && deposito !== undefined){

        deposito = deposito.replace(',', '.');
        let converte = Number(deposito);
        
        if(isNaN(converte) ){
            
            msgAlerta.classList.add('msgAlertaAtivo')
            msgAlerta.innerHTML = '<p>Digite apenas numero</p>'
            msgAlerta.style.backgroundColor = '#d84545'

            setTimeout(() => {
                msgAlerta.classList.remove('msgAlertaAtivo')
            },1200);

        }else{
            
            if(tempoDeposito === 0){
                msgAlerta.classList.add('msgAlertaAtivo')
                msgAlerta.innerHTML = '<p>Deposito efetuado com sucesso. Aguarde 3min</p>'
                msgAlerta.style.backgroundColor = '#31a719'

                setTimeout(() => {
                    msgAlerta.classList.remove('msgAlertaAtivo')
                 },300);

            let converteDeposito = Number(deposito);
            let converteSaldo = Number(saldoUsuario);
            let saldoFinal = converteSaldo + converteDeposito;
            let getLocalStorage = localStorage.getItem('dadosUsuario');
            let converte = JSON.parse(getLocalStorage);
            
            fetch('http://localhost:4444/deposito',{
                method: 'POST',
                headers:{
                    Accept: "application/json","content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email" : converte,
                    "saldo" : saldoFinal,
                    "deposito" : converteDeposito
                })
            }).then((resp) => {
                return resp.json();
            }).then((data) => {
                if(data !== null){
                    lodaPagina();

                    let containerDeposita = document.querySelector('.container_deposito');
                    containerDeposita.classList.remove('containerDepositoAtivo')
                    filtro.style.display = 'none'  
    }     
            })
            tempoDeposito++;
            }else{
                msgAlerta.classList.add('msgAlertaAtivo')
                msgAlerta.innerHTML = '<p>Já foi realizado um deposito. aguarde 5min</p>'
                msgAlerta.style.backgroundColor = '#d84545'
    
                setTimeout(() => {
                    msgAlerta.classList.remove('msgAlertaAtivo')
                },1200);

                verificaTempoDeposito();
            }
        }
    }else{
            msgAlerta.classList.add('msgAlertaAtivo')
            msgAlerta.innerHTML = '<p>Preencha o campo para efetuar deposito</p>'
            msgAlerta.style.backgroundColor = '#d84545'

            setTimeout(() => {
                msgAlerta.classList.remove('msgAlertaAtivo')
            },1200);
    }
}

const verificaTempoDeposito = () => {

    setTimeout(() => {
        tempoDeposito = 0;

    },10000)

}
const atualizaDepositoLoad = () => {
    
    fetch('http://localhost:4444/atualizaRegistroDeposito',{
        method: "GET"
    }).then((resp) => {
        return resp.json()
    }).then((data) => {
        if(data == null || data.msg[0] == undefined){
     
        }else{
        data.msg.map((value) => {
            
            let table = document.querySelector('.table');
            let newTr = document.createElement('tr');
            newTr.innerHTML = `
            <tr>
            <td>${value.nome}</td>
            <td><strong>R$ ${value.valor}<strong</td>
            <td>${value.date}</td>
            <td class="DepositoPix"></td>
            </tr>`

            table.appendChild(newTr);
        })
    }
    })
}

let containerCadastroChave = document.querySelector('.containerCadastroChave');
const handleCadastroChavePix = () => {

    containerCadastroChave.classList.add('cadastroPixAtivo');
    filtro.style.display = 'block'
}

let btnClosedCadastro = document.getElementById('btnClosedCadastro')
btnClosedCadastro.addEventListener('click', () => {
    containerCadastroChave.classList.remove('cadastroPixAtivo');
    filtro.style.display = 'none'
})
let containerRegistroChave = document.querySelector('.containerRegistroChave');
let cadastroChave = document.querySelectorAll('.containerCadastroChave p');
for(let i = 0; i < cadastroChave.length; i++ ){
    cadastroChave[i].addEventListener('click', () => {
        if(i === 0){

            containerRegistroChave.classList.add('containerRegistroChaveAtivo')
            containerCadastroChave.classList.remove('cadastroPixAtivo');
            containerRegistroChave.innerHTML = ` <h2>Registrar CPF</h2><img src="./img/icons8-x-48 (3).png" onclick="btnClosedChavePix()">
            <p>Contatos poderão fazer trasferência pelo Pix usando apenas seu CPF</p>
            <input type="text">
            <button onclick="handleFinalizarRegistroCpf(${i})">Registrar CPF</button>`
            
        }else if(i === 1){

            containerRegistroChave.classList.add('containerRegistroChaveAtivo')
            containerCadastroChave.classList.remove('cadastroPixAtivo');
            containerRegistroChave.innerHTML = ` <h2>Registrar Celular</h2><img src="./img/icons8-x-48 (3).png" onclick="btnClosedChavePix()">
            <p>Contatos poderão fazer trasferência pelo Pix usando apenas seu Celular</p>
            <input type="text">
            <button onclick="handleFinalizarRegistroCpf(${i})">Registrar Celular</button>`
       
        }else{

            containerRegistroChave.classList.add('containerRegistroChaveAtivo')
            containerCadastroChave.classList.remove('cadastroPixAtivo');
            containerRegistroChave.innerHTML = ` <h2>Registrar E-mail</h2><img src="./img/icons8-x-48 (3).png" onclick="btnClosedChavePix()">
            <p>Contatos poderão fazer trasferência pelo Pix usando apenas seu E-mail</p>
            <input type="text">
            <button onclick="handleFinalizarRegistroCpf(${i})">Registrar E-mail</button>`
        }
    })
}

const btnClosedChavePix = () => {

    containerRegistroChave.classList.remove('containerRegistroChaveAtivo')
    filtro.style.display = "none";

}

const handleFinalizarRegistroCpf = (value) => {

    let registroMeio = '';
    if(value === 0){
        registroMeio = 'CPF'
    }else if(value === 1){
        registroMeio = 'Celular'
    }else{
        registroMeio = 'E-mail'
    }

    let cadastroChave = document.querySelector('.containerRegistroChave input').value;
    let getLocalStorage = localStorage.getItem('dadosUsuario');
    let converte = JSON.parse(getLocalStorage);
    let idChavePix = Math.floor(Math.random() * 100000);

    fetch('http://localhost:4444/registroChavePix',{
        method: 'POST',
        headers:{
            Accept: "application/json", "content-Type" : "application/json"
        },
        body: JSON.stringify({
            "endereco" : cadastroChave,
            "email" : converte,
            "enderecoForma" : registroMeio,
            "idChavePix" : idChavePix
        })
    }).then((resp => {
        if(resp.status === 200 || resp.status === '200'){
            containerRegistroChave.classList.remove('containerRegistroChaveAtivo')
            filtro.style.display = "none";
        }
    }))
}

const handleMinhaChavePix = () => {
    
    let listaChavePix = document.querySelector('.listaChavePix');
    listaChavePix.classList.add('listaChavePixAtivo');
    filtro.style.display = "block";

    fetch('http://localhost:4444/listaRegistroPix',{
        method: "GET"
    }).then((resp) => {
        return resp.json()
    }).then((data) => {
        data.msg.map((value) => {
           
            let tableChave = document.querySelector('.tableChave');
            let newSpan = document.createElement('tr');
            let newAtrrPix = document.createAttribute('id');
            newAtrrPix.value = value.idChave;
            newSpan.setAttributeNode(newAtrrPix);
            newSpan.innerHTML = `<td>${value.enderecoPix}</td>
            <td>${value.enderecoTipo}</td>
            <td>${value.date}</td>
            <td><img onclick="removeChavePix(${value.idChave})" src="./img/icons8-excluir-32.png"></td>`;

            tableChave.appendChild(newSpan);
            removeChavePix()
        })
    })
}

const handleClosedListaPix = () => {

    let listaChavePix = document.querySelector('.listaChavePix');
    listaChavePix.classList.remove('listaChavePixAtivo');
    filtro.style.display = "none";

    let tableChave = document.querySelectorAll('.tableChave tr');
    for(let i = 0; i < tableChave.length; i++){
       
        tableChave[i].remove();
    }
}

const removeChavePix = (value) => {
    
    fetch('http://localhost:4444/removeChavePix',{
        method: "POST",
        headers:{
            Accept: "application/json", "content-Type":"application/json"
        },
        body: JSON.stringify({
            value
        })
    }).then((resp) => {
        resp.json();
        if(resp.status === 204 || resp.status === '204'){
            let deleteTr = document.getElementById(value)
            deleteTr.remove();
        }
    })
}

deposita.addEventListener('click', handleContainerDeposita)
pagamento.addEventListener('click', handleContainerPagamento)
iconeSaldo.addEventListener('click', handleIconeSaldo)
pix.addEventListener('click', handleContainerPix)