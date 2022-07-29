const mongoose = require("mongoose");

const userDados = new mongoose.Schema({
    nome: String,
    email: String,
    cpf: String,
    senha: String,
    date:{ type: Date },
    saldo: String,
})

module.exports = userDados;