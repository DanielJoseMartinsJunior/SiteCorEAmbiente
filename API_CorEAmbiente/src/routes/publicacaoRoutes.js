// routes/noticiaRoutes.js

const express = require('express');
const router = express.Router();
const publicacaoController = require('../controllers/publicacaoController');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const checkToken = require('../helpers/check-token')

// Configuração do multer para lidar com uploads de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/img/publicacoes'));
  },
  filename: (req, file, cb) => {
    //cb(null, Date.now() + path.extname(file.originalname));
    cb(null, crypto.randomBytes(24).toString('hex') + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Rota para criar uma nova notícia com upload de arquivo e verificação de token
router.post('/publicacoes',checkToken, upload.fields([
  { name: 'imagem_principal', maxCount: 1 },
  { name: 'imagens_internas', maxCount: 10 },
]), publicacaoController.createPublicacao);

//Rota para listas todas as noticias
router.get('/publicacoes', publicacaoController.getAllPublicacoes);
//Rota para listas as noticias pelo título
router.get('/publicacoes/search', publicacaoController.searchPublicacoesByTitle);
//Rota para listas todas a noticia pelo id
router.get('/publicacoes/:id', publicacaoController.getPublicacaoById);

// Rota para atualizar uma notícia com upload de arquivo e verificação de token
router.put('/publicacoes/:id',checkToken, upload.fields([
  { name: 'imagem_principal', maxCount: 1 },
  { name: 'imagens_internas', maxCount: 10 },
]), publicacaoController.updatePublicacao);

// Rota para excluir uma notícia por ID e verificação de token
router.delete('/publicacoes/:id',checkToken, publicacaoController.deletePublicacao);

module.exports = router;