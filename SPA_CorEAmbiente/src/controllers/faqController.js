// noticiaController.js

const api = require('../config/api');

// Método para buscar todas as publicacoes
exports.getAllFaqs = async (req, res) => {
  try {
    // Faz uma solicitação GET para a API que fornece as publicacoes
    const response = await api.get(`/faqs`);

    // Obtenha os dados JSON da resposta
    const faqs = response.data;

    // Renderiza a página publicacao/index.handlebars e passa as publicacoes como contexto
    res.render('faq/', { faqs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar faqs' });
  }
};

// Método para buscar publicacao para edição
exports.editFaq= async (req, res) => {
  try {
    const { id } = req.params;
    // Faz uma solicitação GET para a API que fornece a publicacao
    const response = await api.get(`/faqs/${id}`);

    // Obtenha os dados JSON da resposta
    const faq = response.data;

    // Renderiza a página publicacao/edit.handlebars e passa a publicacao como contexto
    res.render('faq/edit', { faq });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar faq' });
  }
};

// Método para apresentar formulário de criação da publicacao
exports.createFaq = async (req, res) => {
  try {
    // Renderiza a página publicacao/create.handlebars
    res.render('faq/create');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao mostrar formulário de criação de faqs' });
  }
};


// Método para buscar todas as publicacoes
exports.searchFaqsByTitle = async (req, res) => {
  try {
    // Obter o valor inserido no campo de pesquisa trabalho
    const valorPesquisa = req.body.valorPesquisa

    // Fazer uma solicitação GET para buscar banners com base no título
    const response = await api.get(`/faqs/search?titulo=${valorPesquisa}`)

    // Obtenha os dados JSON da resposta
    const faqs = response.data;

    // Renderiza a página publicacao/index.handlebars e passa as publicacoes como contexto
    res.render('faq/', { faqs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar faqs' });
  }
};