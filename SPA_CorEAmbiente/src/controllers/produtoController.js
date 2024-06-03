// noticiaController.js

const api = require('../config/api');

// Método para buscar todos os noticias
exports.getAllProdutos = async (req, res) => {
  try {
    // Faz uma solicitação GET para a API que fornece os noticias
    const response = await api.get(`/produtos`);

    // Obtenha os dados JSON da resposta
    const produtos = response.data;

    // Renderiza a página noticia/index.handlebars e passa os noticias como contexto
    res.render('produto/', { produtos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

// Método para buscar noticia para edição
exports.editProduto = async (req, res) => {
  try {
    const { id } = req.params;
    // Faz uma solicitação GET para a API que fornece o noticia
    const response = await api.get(`/produtos/${id}`);

    // Obtenha os dados JSON da resposta
    const produto = response.data;

    // Renderiza a página noticia/edit.handlebars e passa o noticia como contexto
    res.render('produto/edit', { produto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

// Método para apresentar formulário de criação do noticia
exports.createProduto = async (req, res) => {
  try {
    // Renderiza a página noticia/create.handlebars
    res.render('produto/create');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao mostrar formulário de criação de produtos' });
  }
};


// Método para buscar todos os noticias
exports.searchProdutosByTitle = async (req, res) => {
  try {
    // Obter o valor inserido no campo de pesquisa
    const valorPesquisa = req.body.valorPesquisa

    // Fazer uma solicitação GET para buscar banners com base no título
    const response = await api.get(`/produtos/search?titulo=${valorPesquisa}`)

    // Obtenha os dados JSON da resposta
    const produtos = response.data;

    // Renderiza a página noticia/index.handlebars e passa os noticias como contexto
    res.render('produto/', { produtos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};
