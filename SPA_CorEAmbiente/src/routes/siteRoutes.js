// routes/siteRoutes.js

const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const sitePublicacaoController = require('../controllers/sitePublicacaoController');

<<<<<<< HEAD
router.get('/lista-publicacoes', siteController.getPublicacoesPage);
router.get('/lista-produtos', siteController.getProdutosPage);
router.get('/lista-sobre_nos', siteController.getSobreNosPage);
router.get('/lista-faqs', siteController.getFaqsPage);
=======
//router.get('/lista-faqs', siteController.getFaqsPage);
>>>>>>> 88bdc3dfbf524ac657372571dad503fac4a1ba87
router.get('/lista-trabalhos', siteController.getTrabalhosPage);
router.get('/lista-publicacoes', siteController.getPublicacoesPage);
router.get('/lista-produtos', siteController.getProdutosPage);
router.get('/', siteController.getAllDatas);

// Route to display all publications


// Route to display a single publication by ID
router.get('/publicacao/:id', sitePublicacaoController.getPublicacaoById);

module.exports = router;