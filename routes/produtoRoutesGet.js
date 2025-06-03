const router = require('express').Router();
const Produto = require('../models/Produto');

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

module.exports = router;