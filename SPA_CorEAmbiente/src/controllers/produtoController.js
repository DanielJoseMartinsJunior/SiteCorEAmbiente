// produtoController.js

const api = require('../config/api');

// Método para buscar todos os produtos
exports.getAllProdutos = async (req, res) => {
  try {
    // Faz uma solicitação GET para a API que fornece os produtos
    const response = await api.get(`/produtos`);

    // Obtenha os dados JSON da resposta
    const produtos = response.data;

    // Renderiza a página produto/index.handlebars e passa os produtos como contexto
    res.render('produto/index', { produtos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

// Método para buscar um produto para edição
exports.editProduto = async (req, res) => {
  try {
    const { id } = req.params;
    // Faz uma solicitação GET para a API que fornece o produto
    const response = await api.get(`/produtos/${id}`);

    // Obtenha os dados JSON da resposta
    const produto = response.data;

    // Renderiza a página produto/edit.handlebars e passa o produto como contexto
    res.render('produto/edit', { produto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

// Método para apresentar formulário de criação do produto
exports.createProduto = async (req, res) => {
  try {
    // Renderiza a página produto/create.handlebars
    res.render('produto/create');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao mostrar formulário de criação de produtos' });
  }
};

// Método para buscar produtos por título
exports.searchProdutosByTitle = async (req, res) => {
  try {
    // Obter o valor inserido no campo de pesquisa
    const { valorPesquisa } = req.body;

    // Fazer uma solicitação GET para buscar produtos com base no título
    const response = await api.get(`/produtos/search?titulo=${valorPesquisa}`);

    // Obtenha os dados JSON da resposta
    const produtos = response.data;

    // Renderiza a página produto/index.handlebars e passa os produtos como contexto
    res.render('produto/index', { produtos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};
