// siteController.js
const api = require('../config/api');
const path = require('path');
// Método para buscar todos os sites
exports.getAllDatas = async (req, res) => {
  try {
    // Faz uma solicitação GET para a API que fornece os banners
    let response = await api.get(`/banners`);
    const banners = response.data;

    // Adiciona o atributo active ao primeiro elemento com valor true
    let cont = 0;
    banners.forEach(function (element) {
      if (cont === 0) {
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
      if (cont === 0) {
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
    response = await api.get(`/trabalhos`);
    const trabalhos = response.data;
   
    // Renderiza a página site/index.handlebars e passa os sites como contexto
    res.render('site/', { banners, produtos, depoimentos, publicacoes, trabalhos, layout: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar sites' });
  }
};
exports.getPublicacoesPage = async (req, res) => {
  try {
    console.log('Acessando a página de publicações...');
    console.log('Caminho do arquivo site_publicacao.handlebars:', path.join(__dirname, '../views/site/site_publicacao.handlebars'));

    // Faz uma solicitação GET para a API que fornece as publicacoes
    const response = await api.get(`/publicacoes`);

    // Obtenha os dados JSON da resposta
    const publicacoes = response.data;

    // Renderiza a página site/site_publicacao.handlebars e passa as publicacoes como contexto
    res.render('site/site_publicacao', { publicacoes, layout: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar publicacoes' });
  }
};

exports.getPublicacoesPage = async (req, res) => {
  try {
    console.log('Acessando a página de publicações...');
    console.log('Caminho do arquivo site_publicacao.handlebars:', path.join(__dirname, '../views/site/site_publicacao.handlebars'));

    // Faz uma solicitação GET para a API que fornece as publicacoes
    const response = await api.get(`/publicacoes`);

    // Obtenha os dados JSON da resposta
    const publicacoes = response.data;

    // Renderiza a página site/site_publicacao.handlebars e passa as publicacoes como contexto
    res.render('site/site_publicacao', { publicacoes, layout: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar publicacoes' });
  }
};
exports.getTrabalhosPage = async (req, res) => {
  try {
    console.log('Acessando a página de trabalhos...');
    console.log('Caminho do arquivo site_trabalho.handlebars:', path.join(__dirname, '../views/site/site_trabalho.handlebars'));

    // Faz uma solicitação GET para a API que fornece as publicacoes
    const response = await api.get(`/trabalhos`);

    // Obtenha os dados JSON da resposta
    const trabalhos = response.data;

    // Renderiza a página site/site_publicacao.handlebars e passa as publicacoes como contexto
    res.render('site/site_trabalho', { trabalhos, layout: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar trabalhos' });
  }
};

exports.getFaqsPage = async (req, res) => {
  try {
    console.log('Acessando a página de FAQs...');
    console.log('Caminho do arquivo site_faq.handlebars:', path.join(__dirname, '../views/site/site_faq.handlebars'));

    // Faz uma solicitação GET para a API que fornece as FAQs
    const response = await api.get(`/faqs`);
    const faqs = response.data;

    // Renderiza a página site/site_faq.handlebars e passa as FAQs como contexto
    res.render('site/site_faq', { faqs, layout: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar FAQs' });
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
    res.status(500).json({ error: 'Erro ao buscar dados dos tests' });
  }
}; */
