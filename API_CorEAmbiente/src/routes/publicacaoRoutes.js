const express = require('express');
const router = express.Router();
const publicacaoController = require('../controllers/publicacaoController');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const checkToken = require('../helpers/check-token');

// Configuração do multer para lidar com uploads de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/img/publicacoes'));
  },
  filename: (req, file, cb) => {
    // Gera um nome de arquivo único usando um hash criptográfico
    cb(null, crypto.randomBytes(24).toString('hex') + path.extname(file.originalname));
  },
});

// Configuração do multer com o storage definido
const upload = multer({ storage });

// Rota para criar uma nova publicação com upload de arquivo e verificação de token
router.post('/publicacoes', checkToken, upload.fields([
  { name: 'imagem_principal', maxCount: 1 },
  { name: 'imagens_internas', maxCount: 10 },
]), publicacaoController.createPublicacao);

// Rota para listar todas as publicações
router.get('/publicacoes', publicacaoController.getAllPublicacoes);

// Rota para listar as publicações pelo título
router.get('/publicacoes/search', publicacaoController.searchPublicacoesByTitle);

// Rota para listar uma publicação pelo ID
router.get('/publicacoes/:id', publicacaoController.getPublicacaoById);

// Rota para atualizar uma publicação com upload de arquivo e verificação de token
router.put('/publicacoes/:id', checkToken, upload.fields([
  { name: 'imagem_principal', maxCount: 1 },
  { name: 'imagens_internas', maxCount: 10 },
]), publicacaoController.updatePublicacao);

// Rota para excluir uma publicação por ID e verificação de token
router.delete('/publicacoes/:id', checkToken, publicacaoController.deletePublicacao);

module.exports = router;
