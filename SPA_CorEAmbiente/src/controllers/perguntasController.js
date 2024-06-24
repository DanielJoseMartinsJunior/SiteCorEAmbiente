const api = require('../config/api');

// Método para buscar todas as perguntas
exports.getAllPerguntas = async (req, res) => {
  try {
    // Faz uma solicitação GET para a API que fornece as perguntas
    const response = await api.get(`/perguntas`);

    // Obtenha os dados JSON da resposta
    const perguntas = response.data;

    // Renderiza a página pergunta/index.handlebars e passa as perguntas como contexto
    res.render('pergunta/index', { perguntas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar perguntas' });
  }
};

// Método para buscar pergunta para edição
exports.editPergunta = async (req, res) => {
  try {
    const { id } = req.params;
    // Faz uma solicitação GET para a API que fornece a pergunta
    const response = await api.get(`/perguntas/${id}`);

    // Obtenha os dados JSON da resposta
    const pergunta = response.data;

    // Renderiza a página pergunta/edit.handlebars e passa a pergunta como contexto
    res.render('pergunta/edit', { pergunta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pergunta' });
  }
};

// Método para apresentar formulário de criação da pergunta
exports.createPergunta = async (req, res) => {
  try {
    // Renderiza a página pergunta/create.handlebars
    res.render('pergunta/create');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao mostrar formulário de criação de perguntas' });
  }
};

// Método para buscar perguntas por título
exports.searchPerguntasByTitle = async (req, res) => {
  try {
    // Obter o valor inserido no campo de pesquisa
    const valorPesquisa = req.body.valorPesquisa;

    // Fazer uma solicitação GET para buscar perguntas com base no título
    const response = await api.get(`/perguntas/search?titulo=${valorPesquisa}`);

    // Obtenha os dados JSON da resposta
    const perguntas = response.data;

    // Renderiza a página pergunta/index.handlebars e passa as perguntas como contexto
    res.render('pergunta/index', { perguntas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar perguntas' });
  }
};
