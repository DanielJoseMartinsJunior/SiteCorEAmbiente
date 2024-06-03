// routes/publicacaoRoutes.js

const express = require('express');
const router = express.Router();
const publicacaoController = require('../controllers/publicacaoController');

// importa o método para verificar a sessão do usuário
const checkSession = require("../helpers/sessao").checkSession;

// Rota para a página de publicacoes
router.get('/publicacoes/',checkSession, publicacaoController.getAllPublicacoes);
router.get('/publicacoesCreate/',checkSession, publicacaoController.createPublicacao);
router.post('/publicacoesSearch/',checkSession, publicacaoController.searchPublicacoesByTitle);
router.get('/publicacoes/:id',checkSession, publicacaoController.editPublicacao);

module.exports = router;