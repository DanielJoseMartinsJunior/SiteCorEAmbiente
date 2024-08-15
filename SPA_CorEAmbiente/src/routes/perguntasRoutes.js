// routes/publicacaoRoutes.js


const express = require('express');
const router = express.Router();
const perguntasController = require('../controllers/perguntasController');

// importa o método para verificar a sessão do usuário
const checkSession = require("../helpers/sessao").checkSession;

// Rota para a página de publicacoes
router.get('/perguntas/',checkSession, perguntasController.getAllPerguntas);
router.get('/perguntasCreate/',checkSession, perguntasController.createPergunta);
router.post('/perguntasSearch/',checkSession, perguntasController.searchPerguntasByTitle);
router.get('/perguntas/:id',checkSession, perguntasController.editPergunta);

module.exports = router;