// routes/noticiaRoutes.js

const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

// Rota para criar uma nova pergunta
router.post('/faqs', faqController.createFaq);

// Rota para listar todas as perguntas
router.get('/faqs', faqController.getAllFaqs);

// Rota para buscar perguntas por título
router.get('/faqs/search', faqController.searchFaqsByTitle);

// Rota para atualizar uma pergunta por ID
router.put('/faqs/:id', faqController.updateFaq);

// Rota para excluir uma pergunta por ID
router.delete('/faqs/:id', faqController.deleteFaq);

module.exports = router;