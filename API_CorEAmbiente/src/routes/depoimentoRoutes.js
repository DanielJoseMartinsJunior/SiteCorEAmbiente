// routes/bannerRoutes.js

const express = require('express');
const router = express.Router();
const depoimentoController = require('../controllers/depoimentoController');
const checkToken = require('../helpers/check-token')

const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configuração do multer para lidar com uploads de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/img/depoimentos')); // Define a pasta de destino
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname); // Gera um nome de arquivo único
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Rotas para banners
router.post('/depoimentos',checkToken,upload.single('imagem'), depoimentoController.createDepoimento);
router.get('/depoimentos', depoimentoController.getAllDepoimentos);
router.get('/depoimentos/search', depoimentoController.searchDepoimentosByTitle);
router.get('/depoimentos/:id', depoimentoController.getDepoimentoById);
router.put('/depoimentos/:id',checkToken, upload.single('imagem'), depoimentoController.updateDepoimento);
router.delete('/depoimentos/:id',checkToken, depoimentoController.deleteDepoimento);


module.exports = router;