const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/perguntasController');
const checkToken = require('../helpers/check-token')

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Pergunta = require('../models/perguntas');

// Configuração do multer para lidar com uploads de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/img/banners')); // Define a pasta de destino
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname); // Gera um nome de arquivo único
    cb(null, fileName);
  },
});

const upload = multer({ storage });

//Rotas para perguntas
router.get('/perguntas',perguntaController.getAllPerguntas);
router.get('/perguntas/search',perguntaController.searchPerguntaByTitle);
router.get('/perguntas/:id',perguntaController.getPerguntaById);
router.put('/pergunta/:id',checkToken,perguntaController.updatePergunta);
router.delete('/pergunta/:id',checkToken,perguntaController.deletePergunta);

module.exports =  router;