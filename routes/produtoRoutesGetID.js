const router = require('express').Router();
const Produto = require('../models/Produto');

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try{
        const produto = await Produto.findOne({id});

        if(!produto){
            return res.status(404).json({
                error: 'Produto não encontrado'
            });
        }

        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({
            error: 'ID inválido ou erro ao buscar produto'
        });
    }
});

router.get('/nome/:nome', async (req, res) => {
    const { nome } = req.params;

    try {
        const produtos = await Produto.findOne({ nome });

        if (!produtos || produtos.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produto por nome' });
    }
});

module.exports = router;