const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');
const { format_date } = require('../utils/format_date');

router.put('/id/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const dadosAtualizados = { ...req.body };

    if (dadosAtualizados.dt_cadastro) {
        const dataConvertida = format_date(dadosAtualizados.dt_cadastro);
        if (!dataConvertida) {
            return res.status(400).json({
                error: 'Data inválida. Use o formato dd/mm/yyyy ou dd-mm-yyyy'
            });
        }
        dadosAtualizados.dt_cadastro = dataConvertida;
    }

    try {
        const produtoAtualizado = await Produto.findOneAndUpdate(
            { id: id },
            dadosAtualizados,
            { new: true }
        );

        if (!produtoAtualizado) {
            return res.status(404).json({
                error: 'Produto não encontrado'
            });
        }

        return res.status(200).json(produtoAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        return res.status(500).json({
            error: 'Erro ao atualizar produto'
        });
    }
});

module.exports = router;
