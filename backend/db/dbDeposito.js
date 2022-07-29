const mongoose = require("mongoose");

const dbDeposito = new mongoose.Schema({
    email: String,
    nome: String,
    valor: String,
    date:  String,
})

module.exports = dbDeposito;