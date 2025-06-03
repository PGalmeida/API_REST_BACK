const router = require('express').Router();
const Produto = require('../models/Produto');
const {format_date} = require('../utils/format_date');


router.post('/', async (req, res) => {
    const {id, nome, descricao, cor, peso, tipo, preco, dt_cadastro} = req.body;

    if(!id, !nome, !descricao, !cor, !peso, !tipo, !preco, !dt_cadastro){
        res.status(422).json({
            error: 'Informar todos os campos'
        });
    }

    const convertDate = format_date(dt_cadastro);
    if (!convertDate){
        return res.status(400).json({
            error: 'Formato de data inválido. Use dd/mm/aaaa ou dd-mm-aaaa'
        })
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
        await Produto.create(produto);

        res.status(201).json({
            message: 'Produto cadastrado com sucesso!'
        });

    }catch(error){
        if (error.code === 11000 && error.keyPattern && error.keyPattern.id){
            return res.status(400).json({
                error: 'ID já cadastrado. Utilize outro'
            });
        }
        
        res.status(500).json({
            error: error
        });
    }
});

router.get('/', async (req, res) => {
    try{
        const produtos = await Produto.find();

        res.status(200).json(produtos);

    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
});

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

router.put('/:id', async (req, res) => {
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