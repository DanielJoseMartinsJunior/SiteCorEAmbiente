// siteController.js
const api = require('../config/api');

// Método para buscar todos os sites
exports.getAllDatas = async (req, res) => {
  try {
    // Faz uma solicitação GET para a API que fornece os banners
    let response = await api.get(`/banners`);
    const banners = response.data;

    // Adiciona o atributo active ao primeiro elemento com valor true
    let cont = 0;
    banners.forEach(function (element) {
      if (cont == 0) {
        element.active = true;
        cont++;
      } else {
        element.active = false;
      }
    });

    console.log(banners);

    // Faz uma solicitação GET para a API que fornece os depoimentos
    response = await api.get(`/depoimentos`);
    const depoimentos = response.data;

    // Adiciona o atributo active ao primeiro elemento com valor true
    cont = 0;
    depoimentos.forEach(function (element) {
      if (cont == 0) {
        element.active = true;
        cont++;
      } else {
        element.active = false;
      }
    });

    console.log(depoimentos);

    // Faz uma solicitação GET para a API que fornece os produtos
    response = await api.get(`/produtos`);
    const produtos = response.data;
    response = await api.get(`/publicacoes`);
    const publicacoes = response.data;

    // Renderiza a página site/index.handlebars e passa os sites como contexto
    res.render('site/', { banners, produtos, depoimentos, publicacoes, layout: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar sites' });
  }
};

/*exports.getTestesPage = async (req, res) => {
  try {
    // Faz a requisição para a API e obtém os dados dos testes
    const testesData = await api.get('/testes');

    // Renderiza o novo handlebars passando os dados dos testes
    res.render('site/testes', { testesData: testesData.data, layout: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados dos testes' });
  }
}; */