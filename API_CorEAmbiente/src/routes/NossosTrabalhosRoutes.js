// routes/bannerRoutes.js

const express = require('express');
const router = express.Router();
const trabalhosController = require('../controllers/NossosTrabalhosCotroler');
const checkToken = require('../helpers/check-token')

const fs = require('fs');
const path = require('path');
const multer = require('multer');

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

// Rotas para trabalhos
router.post('/NossosTrabalhos',checkToken,upload.single('imagem'), trabalhosController.createTrabalhos);
router.get('/NossosTrabslhos', trabalhosController.getAllTrabalhos);
router.get('/NossosTrabalhos/search', trabalhosController.searchTrabalhosByTitle);
router.get('/NossosTrabalhos/:id', trabalhosController.getTrabalhoById);
router.put('/Nossostrabalhos/:id',checkToken, upload.single('imagem'), trabalhosController.updateTrabalho);
router.delete('/NossosTrabalhos/:id',checkToken, trabalhosController.deleteTrabalho);


module.exports = router;
