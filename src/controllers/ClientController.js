const { response } = require('express');
const Client = require('../models/client');

async function create (req, res){
    try {
        const client = await Client.create(req.body);
        return res.status(201).json({message: "Usuário cadastrado com sucesso", Client: client});

    } catch (error) {
        return res.status(500).json(error);
    }
};

async function index (req, res){
    try {
        const clients = await Client.findAll();
        return res.status(200).json({clients});

    } catch (error) {
        return res.status(500).json({error});
    }
};

async function show (req, res) {
    const {id} = req.params;

    try {
        const client = await Client.findByPk(id);
        return res.status(200).json({client});

    } catch (error) {
        return res.status(200).json({error});
    }
};

async function update (req,res){
    const {id} = req.params;
    
    try {
        const [update] = await Client.update(req.body, {where: {id:id}});
        
        if(update) {
            const client = await Client.findByPk(id);
            return res.status(200).send(client);
        }   

        throw new Error();

    } catch (error) {
        return res.status(500).json("Usuário não encontrado!");
    }
};

async function destroy (req, res){
    const {id} = req.params;

    try {
        const deleted = await Client.destroy({where: {id: id}});

        if(deleted){
            return res.status(200).json("Usuário deletado!");
        }

        throw new Error ();

    } catch (error) {
        return res.status(500).json("Usuário não encontrado!");
    }
};


module.exports = {
    create,
    index,
    show,
    update,
    destroy,
};