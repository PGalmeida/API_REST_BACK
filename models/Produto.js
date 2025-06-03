const mongoose = require('mongoose');

const Produto = mongoose.model('Produto',{
    id: {
        type:       Number,
        required:   true,
        unique:     true
    },
    nome:           String,
    descricao:      String,
    cor:            String,
    peso:           String,
    tipo:           String,
    preco:          Number,
    dt_cadastro:    Date,
});

module.exports = Produto;