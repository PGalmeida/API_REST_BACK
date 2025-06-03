const express = require('express');
const mongoose = require('mongoose');
const server = express();
const dotenv = require('dotenv');
dotenv.config();

const produtoRoutesPost = require('./routes/produtoRoutesPost');
const produtoRoutesGet = require('./routes/produtoRoutesGet');
const produtoRoutesGetID = require('./routes/produtoRoutesGetID');
const produtoRoutesPut = require('./routes/produtoRoutesPut');
const produtoRoutesdelete = require('./routes/produtoRoutesdelete');
const produtoRoutes = require('./routes/produtoRoutes');
server.use(
    express.urlencoded({
        extended: true,
    }),
);

server.use(express.json());

server.use('/produto', produtoRoutesPost);
server.use('/produto', produtoRoutesGet);
server.use('/produto', produtoRoutesGetID);
server.use('/produto', produtoRoutesPut);
server.use('/produto', produtoRoutesdelete);
server.use('/produto', produtoRoutes);

const db_user = process.env.DB_USER;
const db_password = encodeURIComponent(process.env.DB_PASSWORD);
const text = process.env.TEXT;

mongoose.connect(
    `mongodb+srv://${db_user}:${db_password}@${text}`
    )
    .then(()=>{
        console.log('Conectado ao MongoDB');
    })
    .catch((err)=>{
        console.log(err);
    })

server.listen(3000);
