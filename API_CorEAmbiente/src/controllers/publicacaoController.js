// controllers/noticiaController.js

const Publicacao = require('../models/Publicacao');
const { Op } = require('sequelize');


// Método para criar uma nova notícia
exports.createPublicacao = async (req, res) => {
  try {
    const { titulo } = req.body;
    const imagem_principal = req.files['imagem_principal'][0].filename;
    let imagens_internas = '';
    
    if (req.files['imagens_internas']){
      imagens_internas = req.files['imagens_internas'].map((file) => file.filename);
    }

    const publicacao = await Publicacao.create({ titulo, imagem_principal, imagens_internas: JSON.stringify(imagens_internas) });
    res.status(201).json(publicacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a publicacao' });
  }
};

// Método para listar todas as notícias
exports.getAllPublicacoes = async (req, res) => {
  try {
    const publicacoes = await Publicacao.findAll();
    res.status(200).json(publicacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar as publicacoes' });
  }
};

// Método para buscar uma notícia por ID
exports.getPublicacaoById = async (req, res) => {
  const { id } = req.params;
  try {
    const publicacaoo = await Publicacao.findByPk(id);
    if (!publicacao) {
      res.status(404).json({ error: 'Publicacao não encontrada' });
      return;
    }
    res.status(200).json(publicacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar a ublicacaos' });
  }
};

// Método para buscar noticias por título
exports.searchPublicacoesByTitle = async (req, res) => {
  try {
    const { titulo } = req.query; // Recupera o título da consulta da query

    // Realiza a busca no banco de dados com base no título
    const publicacoes = await Publicacao.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`, // Pesquisa por títulos que contenham o termo
        },
      },
    });

    res.status(200).json(publicacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar publicacoes por título' });
  }
};

// Método para atualizar uma notícia por ID
exports.updatePublicacao = async (req, res) => {
  const { id } = req.params;
  try {
    const { titulo } = req.body;
    const imagem_principal = req.files['imagem_principal'][0].filename;
    let imagens_internas = '';
    
    if (req.files['imagens_internas']){
      imagens_internas = req.files['imagens_internas'].map((file) => file.filename);
    }

    const [updated] = await Publicacao.update({ titulo, imagem_principal, imagens_internas: JSON.stringify(imagens_internas) }, {
      where: { id },
    });
    if (updated) {
      const updatedPublicacao = await Publicacao.findByPk(id);
      res.status(200).json(updatedPublicacao);
    } else {
      res.status(404).json({ error: 'Publicacao não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a publicacao' });
  }
};

// Método para excluir uma notícia por ID
exports.deletePublicacao = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Publicacao.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Publicacao excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'Publicacao não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a publicacao' });
  }
};
  
  