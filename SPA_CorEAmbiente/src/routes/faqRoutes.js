// routes/publicacaoRoutes.js

const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

// importa o método para verificar a sessão do usuário
const checkSession = require("../helpers/sessao").checkSession;

// Rota para a página de publicacoes
router.get('/faqs/',checkSession, faqController.getAllFaqs);
router.get('/faqsCreate/',checkSession, faqController.createFaq);
router.post('/faqsSearch/',checkSession, faqController.searchFaqsByTitle);
router.get('/faqs/:id',checkSession, faqController.editFaq);

module.exports = router;