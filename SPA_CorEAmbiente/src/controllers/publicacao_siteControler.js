const api = require('../config/api');

// Helper function to set 'active' property on the first element
const setActiveElement = (items) => {
  if (items.length > 0) {
    items.forEach((element, index) => {
      element.active = (index === 0);
    });
  }
};

// Método para buscar todos os dados necessários para a home page
exports.getAllDatas = async (req, res) => {
  try {
    // Fetch banners
    let response = await api.get(`/banners`);
    const banners = response.data;
    setActiveElement(banners);

    // Fetch depoimentos
    response = await api.get(`/depoimentos`);
    const depoimentos = response.data;
    setActiveElement(depoimentos);

    // Fetch produtos and publicacoes
    const produtos = (await api.get(`/produtos`)).data;
    const publicacoes = (await api.get(`/publicacoes`)).data;

    // Render the home page (site/index.handlebars)
    res.render('site/index', { banners, produtos, depoimentos, publicacoes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados para o site' });
  }
};

/* Método para buscar a página de testes (comentado para possível uso futuro)
exports.getTestesPage = async (req, res) => {
  try {
    const testesData = await api.get('/testes');
    res.render('site/testes', { testesData: testesData.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados dos testes' });
  }
}; */
