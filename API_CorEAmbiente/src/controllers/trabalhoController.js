// controllers/noticiaController.js

const Trabalho = require('../models/Trabalho');
const { Op } = require('sequelize');


// Método para criar uma nova notícia
exports.createTrabalho= async (req, res) => {
  try {
    const { titulo, descricao } = req.body;
    const imagem_principal = req.files['imagem_principal'][0].filename;
    let imagens_internas = '';
    
    if (req.files['imagens_internas']){
      imagens_internas = req.files['imagens_internas'].map((file) => file.filename);
    }

    const trabalho = await Trabalho.create({ titulo, descricao, imagem_principal, imagens_internas: JSON.stringify(imagens_internas) });
    res.status(201).json(trabalho);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a trabalho' });
  }
};

// Método para listar todas as notícias
exports.getAllTrabalhos = async (req, res) => {
  try {
    const trabalhos = await Trabalho.findAll();

    // Logando o resultado antes da deserialização
    console.log('Trabalhos retornados do banco de dados:', trabalhos);

    // Deserializa imagens_internas para um array
    const trabalhosComImagens = trabalhos.map(trabalho => {
      const imagens = trabalho.imagens_internas ? JSON.parse(trabalho.imagens_internas) : [];
      
      // Logando as imagens deserializadas
      console.log('Imagens internas para o trabalho:', imagens);
      
      return {
        ...trabalho.get(),
        imagens_internas: imagens
      };
    });

    res.status(200).json(trabalhosComImagens);
  } catch (error) {
    console.error('Erro ao buscar os trabalhos:', error);
    res.status(500).json({ error: 'Erro ao buscar os trabalhos' });
  }
};


// Método para buscar uma notícia por ID
exports.getTrabalhoById = async (req, res) => {
  const { id } = req.params;
  try {
    const trabalho = await Trabalho.findByPk(id);
    if (!trabalho) {
      res.status(404).json({ error: 'Trabalho não encontrada' });
      return;
    }
    res.status(200).json(trabalho);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar a trabalho' });
  }
};

// Método para buscar noticias por título
exports.searchTrabalhosByTitle = async (req, res) => {
  try {
    const { titulo } = req.query; // Recupera o título da consulta da query

    // Realiza a busca no banco de dados com base no título
    const trabalhos = await Trabalho.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`, // Pesquisa por títulos que contenham o termo
        },
      },
    });

    res.status(200).json(trabalhos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar trarabalho por título' });
  }
};

// Método para atualizar uma notícia por ID
exports.updateTrabalho = async (req, res) => {
  const { id } = req.params;
  try {
    const { titulo, descricao } = req.body;
    const imagem_principal = req.files['imagem_principal'][0].filename;
    let imagens_internas = '';
    
    if (req.files['imagens_internas']){
      imagens_internas = req.files['imagens_internas'].map((file) => file.filename);
    }

    const [updated] = await Trabalho.update({ titulo,descricao, imagem_principal, imagens_internas: JSON.stringify(imagens_internas) }, {
      where: { id },
    });
    if (updated) {
      const updatedTrabalho = await Trabalho.findByPk(id);
      res.status(200).json(updatedTrabalho);
    } else {
      res.status(404).json({ error: 'Trabalho não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a trabalho' });
  }
};

// Método para excluir uma notícia por ID
exports.deleteTrabalho = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Trabalho.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Trabalho excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'Trabalho não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a trabalhos' });
  }
};
  
  
  