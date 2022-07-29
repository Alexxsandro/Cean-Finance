const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userDados = require('./db/dbUser')
const movimentacao = require('./db/dbMovimentacao')
const dbDeposito = require('./db/dbDeposito');
const enderecoPix = require('./db/dbRegistroChavePix');
const cors = require('cors');
const bodyParser = require("body-parser");
let emailUser = '';

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:EHP3y8jL6e-C-N3@ocean.fonktks.mongodb.net/?retryWrites=true&w=majority')

const User = mongoose.model('User', userDados);
const UserLista = mongoose.model('UserLista', movimentacao);
const UserDeposito = mongoose.model('UserDeposito', dbDeposito);
const EnderecoPix = mongoose.model('EnderecoPix', enderecoPix);

app.post('/cadastro', (req,res) => {
    let dados = req.body;
    emailUser = dados.email;
   
    User.findOne( { email: dados.email })
      .then((value) => {
             if(value == null){
                const cadastro = new User({
                    nome: dados.nome,
                    email: dados.email,
                    senha: dados.senha,
                    cpf: dados.cpf,
                    saldo: 0
                })

                res.status(201).json( { msg: dados.email } );
                cadastro.save();

             }else{
                res.status(400).json( { msg: null} );
             }
      })
})

app.post('/login', (req,res) => {

    let userLogin = req.body;
    emailUser = userLogin.email;
  
    User.findOne( { email: userLogin.email })
    .then((value) => {
        if(value == null){
            res.status(402).json( { msg : 'teste' } );
        }else{
            res.status(200).json( { value, msg: '200' } )
        }
    })
})

app.post('/deposito', (req,res) => {

    let userLogin = req.body;
   
    User.findOneAndUpdate( { email : userLogin.email }, {
        saldo: userLogin.saldo
    }).then((value) => {
        if(value !== null){
            res.status(200).json({ msg: true });
        }else{
            res.status(200).json({ msg: null });
        }
    })
    const cadastroDeposito = new UserDeposito({
        email: userLogin.email,
        nome: 'Deposito',
        valor: userLogin.deposito,
        date: new Date().toLocaleDateString("pt-BR")
    })

    cadastroDeposito.save();

})

app.post('/registro', (req,res) => {

    let dadosUser = req.body;
    
    User.findOneAndUpdate( { email : dadosUser.email }, {
        saldo: dadosUser.saldo
    }).then((value) => {
         res.status(204).json( { msg: true } )
    })

    setTimeout(() => {
        const registroUser = new UserLista({
            endereco: dadosUser.endereco,
            email: dadosUser.email,
            valor: dadosUser.valor,
            date: new Date().toLocaleDateString("pt-BR")
        });
    
        registroUser.save();

    }, 300)
})

app.post('/registroChavePix', (req,res) => {
    let dadosUser = req.body;
        const registroChavePix = new EnderecoPix({
            enderecoPix: dadosUser.endereco,
            enderecoTipo: dadosUser.enderecoForma,
            email: dadosUser.email,
            idChave: dadosUser.idChavePix,
            date: new Date().toLocaleDateString("pt-BR")
        })

        registroChavePix.save();
        res.status(200).json(  { msg: true } );
})

app.get('/listaRegistroPix', (req,res) => {
    EnderecoPix.find( {email : emailUser })
    .then((value) => {
        if(value){
            res.json({ msg : value });
        }
    })
})

app.post('/removeChavePix', (req,res) => {

    let idUser = req.body

    EnderecoPix.findOneAndDelete( {idChave : idUser.value })
    .then((value) => {
        if(value){
            res.status(204).json({ msg : true});
        }
    })
})

app.get('/atualizaRegistro', (req,res) => {
    
    UserLista.find( {email : emailUser })
    .then((value) => {
        if(value){
            res.json({ msg : value });
        }
    })
})

app.get('/atualizaRegistroDeposito', (req,res) => {
    
    UserDeposito.find( {email : emailUser })
    .then((value) => {
        if(value){
            res.json({ msg : value });
        }
    })
})

app.listen(4444);