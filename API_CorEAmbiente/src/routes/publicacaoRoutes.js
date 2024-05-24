const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/publicacoesController');
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

//rotas para publicações
router.post('/publicacoes',checkToken,upload.single('imagem'),publicacaoConrtroller.createPublicacao);
router.get('/publicacoes',publicacaoConrtroller.getAllPublicacoes);
router.get('/publicacoes/search',publicacaoConrtroller.searchPublicacaoByTitle);
router.get('/publicacoes/:id',publicacaoConrtroller.getPublicacaoById);
router.put('/publicacaoes/:id',checkToken,upload.single('imagem'),publicacaoConrtroller.updatePublicacao);
router.delete('/publicacoes:id',checkToken,publicacaoConrtroller.deletePublicacao);

module.exports = router;