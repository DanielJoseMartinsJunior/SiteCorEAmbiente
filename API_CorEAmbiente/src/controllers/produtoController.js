// controllers/noticiaController.js

const Produto = require('../models/Produto');
const { Op } = require('sequelize');


// Método para criar uma nova notícia
exports.createProduto = async (req, res) => {
  try {
    const { titulo } = req.body;
    const imagem_principal = req.files['imagem_principal'][0].filename;
    let imagens_internas = '';
    
    if (req.files['imagens_internas']){
      imagens_internas = req.files['imagens_internas'].map((file) => file.filename);
    }

    const produto = await Produto.create({ titulo, imagem_principal, imagens_internas: JSON.stringify(imagens_internas) });
    res.status(201).json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a produto' });
  }
};

// Método para listar todas as notícias
exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar as produtos' });
  }
};

// Método para buscar uma notícia por ID
exports.getProdutoById = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      res.status(404).json({ error: 'Produto não encontrada' });
      return;
    }
    res.status(200).json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar a produtos' });
  }
};

// Método para buscar noticias por título
exports.searchProdutosByTitle = async (req, res) => {
  try {
    const { titulo } = req.query; // Recupera o título da consulta da query

    // Realiza a busca no banco de dados com base no título
    const produtos = await Produto.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`, // Pesquisa por títulos que contenham o termo
        },
      },
    });

    res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar produtos por título' });
  }
};

// Método para atualizar uma notícia por ID
exports.updateProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const { titulo } = req.body;
    const imagem_principal = req.files['imagem_principal'][0].filename;
    let imagens_internas = '';
    
    if (req.files['imagens_internas']){
      imagens_internas = req.files['imagens_internas'].map((file) => file.filename);
    }

    const [updated] = await Produto.update({ titulo, imagem_principal, imagens_internas: JSON.stringify(imagens_internas) }, {
      where: { id },
    });
    if (updated) {
      const updatedProduto = await Produto.findByPk(id);
      res.status(200).json(updatedProduto);
    } else {
      res.status(404).json({ error: 'Produto não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a produto' });
  }
};

// Método para excluir uma notícia por ID
exports.deleteProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Produto.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Produto excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'Produto não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a produto' });
  }
};