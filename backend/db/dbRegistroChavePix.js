const mongoose = require("mongoose");

const enderecoPix = new mongoose.Schema({
    email: String,
    enderecoPix: String,
    enderecoTipo: String,
    idChave: String,
    date:  String,
})

module.exports = enderecoPix;