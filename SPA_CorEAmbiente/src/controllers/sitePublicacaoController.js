// src/controllers/sitePublicacaoController.js

const api = require('../config/api');

// Method to display all publications
exports.getAllPublicacoes = async (req, res) => {
  try {
    const response = await api.get('/publicacoes');
    const publicacoes = response.data;

    // Converta o campo `imagens_internas` de JSON para array, se necessário
    publicacoes.forEach(publicacao => {
      if (publicacao.imagens_internas) {
        publicacao.imagens_internas = JSON.parse(publicacao.imagens_internas);
        console.log(publicacao.imagens_internas);
      }
    });

    res.render('site/site_publicacoes', { publicacoes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar publicações' });
  }
  
};

// Method to display a single publication by ID
exports.getPublicacaoById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await api.get(`/publicacoes/${id}`);
    const publicacao = response.data;
    console.log(publicacao.imagens_internas);

    // Se imagens_internas for uma string JSON, convertê-la em array
    if (publicacao.imagens_internas) {
      publicacao.imagens_internas = JSON.parse(publicacao.imagens_internas);
    }

    console.log(publicacao.imagens_internas);  // Log para verificar o conteúdo das imagens

    res.render('site_publicacoes_detalhe', { publicacao });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar publicação' });
  }
};




