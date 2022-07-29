const mongoose = require("mongoose");

const movimentacao = new mongoose.Schema({
    endereco: String,
    email: String,
    valor: String,
    date:  String,
})

module.exports = movimentacao;