// routes/siteRoutes.js

const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');

router.get('/lista-publicacoes', siteController.getPublicacoesPage);
router.get('/lista-faqs', siteController.getFaqsPage);
router.get('/lista-trabalhos', siteController.getTrabalhosPage);
router.get('/', siteController.getAllDatas);

module.exports = router;