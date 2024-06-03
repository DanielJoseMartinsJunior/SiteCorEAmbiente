// noticiaController.js

const api = require('../config/api');

// Método para buscar todas as publicacoes
exports.getAllTrabalhos = async (req, res) => {
  try {
    // Faz uma solicitação GET para a API que fornece as publicacoes
    const response = await api.get(`/trabalhos`);

    // Obtenha os dados JSON da resposta
    const trabalhos = response.data;

    // Renderiza a página publicacao/index.handlebars e passa as publicacoes como contexto
    res.render('trabalho/', { trabalhos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar trabalhos' });
  }
};

// Método para buscar publicacao para edição
exports.editTrabalho= async (req, res) => {
  try {
    const { id } = req.params;
    // Faz uma solicitação GET para a API que fornece a publicacao
    const response = await api.get(`/trabalhos/${id}`);

    // Obtenha os dados JSON da resposta
    const trabalho = response.data;

    // Renderiza a página publicacao/edit.handlebars e passa a publicacao como contexto
    res.render('trabalho/edit', { trabalho });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar trabalho' });
  }
};

// Método para apresentar formulário de criação da publicacao
exports.createTrabalho = async (req, res) => {
  try {
    // Renderiza a página publicacao/create.handlebars
    res.render('trabalho/create');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao mostrar formulário de criação de trabalhos' });
  }
};


// Método para buscar todas as publicacoes
exports.searchTrabalhosByTitle = async (req, res) => {
  try {
    // Obter o valor inserido no campo de pesquisa
    const valorPesquisa = req.body.valorPesquisa

    // Fazer uma solicitação GET para buscar banners com base no título
    const response = await api.get(`/trabalhos/search?titulo=${valorPesquisa}`)

    // Obtenha os dados JSON da resposta
    const trabalhos = response.data;

    // Renderiza a página publicacao/index.handlebars e passa as publicacoes como contexto
    res.render('trabalho/', { trabalhos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar trabalhos' });
  }
};