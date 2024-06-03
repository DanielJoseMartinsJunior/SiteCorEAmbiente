// routes/publicacaoRoutes.js

const express = require('express');
const router = express.Router();
const trabalhoController = require('../controllers/trabalhoController');

// importa o método para verificar a sessão do usuário
const checkSession = require("../helpers/sessao").checkSession;

// Rota para a página de publicacoes
router.get('/trabalhos/',checkSession, trabalhoController.getAllTrabalhos);
router.get('/trabalhosCreate/',checkSession, trabalhoController.createTrabalho);
router.post('/trabalhosSearch/',checkSession, trabalhoController.searchTrabalhosByTitle);
router.get('/trabalhos/:id',checkSession, trabalhoController.editTrabalho);

module.exports = router;