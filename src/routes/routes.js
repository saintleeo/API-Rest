const Express = require('express');
const router = Express();
const ClientController = require('../controllers/ClientController');
const ProductController = require('../controllers/ProductController');




//rotas para o cliente
router.post('/client', ClientController.create);
router.get('/client/:id', ClientController.show);
router.get('/client', ClientController.index);
router.put('/client/:id', ClientController.update);
router.delete('/client/:id', ClientController.destroy);

//rotas para o produto
router.post('/product', ProductController.create);
router.get('/product/:id', ProductController.show);
router.get('/product', ProductController.index);
router.put('/product/:id', ProductController.update);
router.delete('/product/:id', ProductController.destroy);

//rotas para a relação cliente-produto
router.put('/client/:clientId/product/:productId', ProductController.addClient);
router.delete('/client/:clientId/product/:productId', ProductController.removeClient);

module.exports = router;