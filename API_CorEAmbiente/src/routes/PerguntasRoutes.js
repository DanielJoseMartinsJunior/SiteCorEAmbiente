const express = require('express');
const router = express.Router();
const perguntasController = require('../controllers/perguntasController');

// Rota para criar uma nova pergunta
router.post('/perguntas', perguntasController.createPergunta);

// Rota para listar todas as perguntas
router.get('/perguntas', perguntasController.getAllPerguntas);

// Rota para buscar perguntas por título
router.get('/perguntas/search', perguntasController.searchPerguntasByTitle);

// Rota para atualizar uma pergunta por ID
router.put('/perguntas/:id', perguntasController.updatePergunta);

// Rota para excluir uma pergunta por ID
router.delete('/perguntas/:id', perguntasController.deletePergunta);

module.exports = router;
