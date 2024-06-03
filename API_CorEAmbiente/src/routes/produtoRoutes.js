// routes/noticiaRoutes.js

const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const checkToken = require('../helpers/check-token')

// Configuração do multer para lidar com uploads de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/img/produtos'));
  },
  filename: (req, file, cb) => {
    //cb(null, Date.now() + path.extname(file.originalname));
    cb(null, crypto.randomBytes(24).toString('hex') + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Rota para criar uma nova notícia com upload de arquivo e verificação de token
router.post('/produtos',checkToken, upload.fields([
  { name: 'imagem_principal', maxCount: 1 },
  { name: 'imagens_internas', maxCount: 10 },
]), produtoController.createProduto);

//Rota para listas todas as noticias
router.get('/produtos', produtoController.getAllProdutos);
//Rota para listas as noticias pelo título
router.get('/produtos/search', produtoController.searchProdutosByTitle);
//Rota para listas todas a noticia pelo id
router.get('/produtos/:id', produtoController.getProdutoById);

// Rota para atualizar uma notícia com upload de arquivo e verificação de token
router.put('/produtos/:id',checkToken, upload.fields([
  { name: 'imagem_principal', maxCount: 1 },
  { name: 'imagens_internas', maxCount: 10 },
]), produtoController.updateProduto);

// Rota para excluir uma notícia por ID e verificação de token
router.delete('/produtos/:id',checkToken, produtoController.deleteProduto);

module.exports = router;