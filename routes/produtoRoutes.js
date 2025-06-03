const router = require('express').Router();
const Produto = require('../models/Produto');
const {format_date} = require('../utils/format_date');

router.post('/', async (req, res) => {
    const {id, nome, descricao, cor, peso, tipo, preco, dt_cadastro} = req.body;

    if(!id, !nome, !descricao, !cor, !peso, !tipo, !preco, !dt_cadastro){
        res.status(422).json({error: 'Informar todos os campos'});
    }

    const convertDate = format_date(dt_cadastro);
    if (!convertDate){
        return res.status(400).json({error: 'Formato de data inválido. Use dd/mm/aaaa ou dd-mm-aaaa'})
    }

    const produto = {
        id,
        nome,
        descricao,
        cor,
        peso,
        tipo,
        preco,
        dt_cadastro: convertDate,
    };

    try{
        const newProduct = await Produto.create(produto);

        const mask = {
            ...newProduct._doc,
            dt_cadastro: newProduct.dt_cadastro.toLocaleDateString('pt-BR')
        };

        res.status(201).json({
            message: 'Produto cadastrado com sucesso!'
        });

    }catch(error){
        if (error.code === 11000 && error.keyPattern && error.keyPattern.id){
            return res.status(400).json({ error: 'ID já cadastrado. Utilize outro'});
        }
        
        res.status(500).json({error: error});
    }
});

module.exports = router;