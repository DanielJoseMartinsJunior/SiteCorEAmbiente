// routes/siteRoutes.js

const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');
const sitePublicacaoController = require('../controllers/sitePublicacaoController');

//router.get('/lista-faqs', siteController.getFaqsPage);
router.get('/lista-trabalhos', siteController.getTrabalhosPage);
router.get('/lista-publicacoes', siteController.getPublicacoesPage);
router.get('/lista-produtos', siteController.getProdutosPage);
router.get('/', siteController.getAllDatas);

// Route to display all publications


// Route to display a single publication by ID
router.get('/publicacao/:id', sitePublicacaoController.getPublicacaoById);

module.exports = router;