// routes/bannerRoutes.js

const express = require('express');
const router = express.Router();
const depoimentoController = require('../controllers/depoimentoController');

// importa o método para verificar a sessão do usuário
const checkSession = require("../helpers/sessao").checkSession;

// Rota para a página de banners, verifica a sessão do usuário antes
router.get('/depoimentos/',checkSession, depoimentoController.getAllDepoimentos);


module.exports = router;