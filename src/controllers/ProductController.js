const { response } = require('express');
const Product = require('../models/product');
const Client = require('../models/client');

async function create (req, res){
    try {
        const product = await Product.create(req.body);
        return res.status(201).json({message: "Produto cadastrado com sucesso", Product: product});

    } catch (error) {
        return res.status(500).json(error);
    }
};

async function index (req, res){
    try {
        const products = await Product.findAll();
        return res.status(200).json({products});

    } catch (error) {
        return res.status(500).json({error});
    }
};

async function show (req, res) {
    const {id} = req.params;

    try {
        const product = await Product.findByPk(id);
        return res.status(200).json({product});

    } catch (error) {
        return res.status(200).json({error});
    }
};

async function update (req,res){
    const {id} = req.params;
    
    try {
        const [update] = await Product.update(req.body, {where: {id:id}});
        
        if(update) {
            const product = await Product.findByPk(id);
            return res.status(200).send(product);
        }   

        throw new Error();

    } catch (error) {
        return res.status(500).json("Produto não encontrado!");
    }
};

async function destroy (req, res){
    const {id} = req.params;

    try {
        const deleted = await Product.destroy({where: {id: id}});

        if(deleted){
            return res.status(200).json("Produto deletado!");
        }

        throw new Error ();

    } catch (error) {
        return res.status(500).json("Produto não encontrado!");
    }
};

async function addClient (req,res) {
    const {clientId, productId} = req.params;

    try {
        const client = await Client.findByPk(clientId);
        const product = await Product.findByPk(productId);
        await product.setClient(client);
        return res.status(200).json(product);

    } catch (error) {
        return res.status(500).json({error});
    }
};

async function removeClient (req,res) {
    const {clientId, productId} = req.params;

    try {
        const client = await Client.findByPk(clientId);
        const product = await Product.findByPk(productId);
        await product.setClient(null);
        return res.status(200).json(product);

    } catch (error) {
        return res.status(500).json({error});
    }
};


module.exports = {
    create,
    index,
    show,
    update,
    destroy,
    addClient,
    removeClient,
};