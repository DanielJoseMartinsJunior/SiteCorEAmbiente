// routes/produtoRoutes.js

const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Importa o método para verificar a sessão do usuário
const checkSession = require("../helpers/sessao").checkSession;

// Rota para a página de produtos
router.get('/produtos/', checkSession, produtoController.getAllProdutos);
router.get('/produtosCreate/', checkSession, produtoController.createProduto);
router.post('/produtosSearch/', checkSession, produtoController.searchProdutosByTitle);
router.get('/produtos/:id', checkSession, produtoController.editProduto);

module.exports = router;
