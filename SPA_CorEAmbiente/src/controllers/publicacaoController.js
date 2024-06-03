// noticiaController.js

const api = require('../config/api');

// Método para buscar todas as publicacoes
exports.getAllPublicacoes = async (req, res) => {
  try {
    // Faz uma solicitação GET para a API que fornece as publicacoes
    const response = await api.get(`/publicacoes`);

    // Obtenha os dados JSON da resposta
    const publicacoes = response.data;

    // Renderiza a página publicacao/index.handlebars e passa as publicacoes como contexto
    res.render('publicacao/', { publicacoes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar publicacoes' });
  }
};

// Método para buscar publicacao para edição
exports.editPublicacao = async (req, res) => {
  try {
    const { id } = req.params;
    // Faz uma solicitação GET para a API que fornece a publicacao
    const response = await api.get(`/publicacoes/${id}`);

    // Obtenha os dados JSON da resposta
    const publicacao = response.data;

    // Renderiza a página publicacao/edit.handlebars e passa a publicacao como contexto
    res.render('publicacao/edit', { publicacao });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar publicacao' });
  }
};

// Método para apresentar formulário de criação da publicacao
exports.createPublicacao = async (req, res) => {
  try {
    // Renderiza a página publicacao/create.handlebars
    res.render('publicacao/create');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao mostrar formulário de criação de publicacoes' });
  }
};


// Método para buscar todas as publicacoes
exports.searchPublicacoesByTitle = async (req, res) => {
  try {
    // Obter o valor inserido no campo de pesquisa
    const valorPesquisa = req.body.valorPesquisa

    // Fazer uma solicitação GET para buscar banners com base no título
    const response = await api.get(`/publicacoes/search?titulo=${valorPesquisa}`)

    // Obtenha os dados JSON da resposta
    const publicacoes = response.data;

    // Renderiza a página publicacao/index.handlebars e passa as publicacoes como contexto
    res.render('publicacao/', { publicacoes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar publicacoes' });
  }
};