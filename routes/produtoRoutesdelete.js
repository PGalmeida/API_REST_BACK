const router = require('express').Router();
const Produto = require('../models/Produto');

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try{
        const produto = await Produto.findOne({id});

        if(!produto){
            return res.status(404).json({
                error: 'Produto não encontrado'
            });
        }

        await Produto.findOneAndDelete({id});

        res.status(200).json({
            message: 'Produto deletado com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao deletar produto', error: error.message
        });
    }
});

module.exports = router;