// routes/noticiaRoutes.js

const express = require('express');
const router = express.Router();
const trabalhoController = require('../controllers/trabalhoController');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const checkToken = require('../helpers/check-token')

// Configuração do multer para lidar com uploads de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/img/trabalhos'));
  },
  filename: (req, file, cb) => {
    //cb(null, Date.now() + path.extname(file.originalname));
    cb(null, crypto.randomBytes(24).toString('hex') + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Rota para criar uma nova notícia com upload de arquivo publi e verificação de token
router.post('/trabalhos',checkToken, upload.fields([
  { name: 'imagem_principal', maxCount: 1 },
  { name: 'imagens_internas', maxCount: 10 },
]), trabalhoController.createTrabalho);

//Rota para listas todas as noticias
router.get('/trabalhos', trabalhoController.getAllTrabalhos);
//Rota para listas as noticias pelo título
router.get('/trabalhos/search', trabalhoController.searchTrabalhosByTitle);
//Rota para listas todas a noticia pelo id
router.get('/trabalhos/:id', trabalhoController.getTrabalhoById);

// Rota para atualizar uma notícia com upload de arquivo e verificação de token
router.put('/trabalhos/:id',checkToken, upload.fields([
  { name: 'imagem_principal', maxCount: 1 },
  { name: 'imagens_internas', maxCount: 10 },
]), trabalhoController.updateTrabalho);

// Rota para excluir uma notícia por ID e verificação de token
router.delete('/trabalhos/:id',checkToken, trabalhoController.deleteTrabalho);

module.exports = router;
