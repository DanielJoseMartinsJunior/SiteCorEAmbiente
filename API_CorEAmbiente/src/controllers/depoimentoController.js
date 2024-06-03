// controllers/bannerController.js

const Depoimento = require('../models/Depoimento');
const { Op } = require('sequelize');



// Método para criar um novo banner
exports.createDepoimento =  async (req, res) => {
  try {
    const { titulo, descricao, ordem } = req.body;
    const imagem = req.file.filename; // Obtém o nome do arquivo enviado

    const depoimento = await Depoimento.create({ titulo, descricao, imagem, ordem }); // Defina a ordem conforme necessário
    res.status(201).json(depoimento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o depoimento' });
  }
};


// Método para listar todos os banners
exports.getAllDepoimentos = async (req, res) => {
  try {
    const depoimentos = await Depoimento.findAll({
      order: [['ordem', 'ASC']],
  });
    res.status(200).json(depoimentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os depoimentos' });
  }
};

// Método para buscar um banner por ID
exports.getDepoimentoById = async (req, res) => {
  const { id } = req.params;
  try {
    const depoimento = await Depoimento.findByPk(id);
    if (!depoimento) {
      res.status(404).json({ error: 'Depoimento não encontrado' });
      return;
    }
    res.status(200).json(depoimento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o depoimento' });
  }
};

// Método para buscar banners por título
exports.searchDepoimentosByTitle = async (req, res) => {
  try {
    const { titulo } = req.query; // Recupera o título da consulta da query

    // Realiza a busca no banco de dados com base no título
    const depoimentos = await Depoimento.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`, // Pesquisa por títulos que contenham o termo
        },
      },
    });

    res.status(200).json(depoimentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar depoimentos por título' });
  }
};

// Método para atualizar um banner por ID
exports.updateDepoimento = async (req, res) => {
    const { id } = req.params;
    try {
      const { titulo, descricao, ordem } = req.body;
      const imagem = req.file.filename; // Obtém o nome do arquivo enviado
  
      const [updated] = await Depoimento.update({ titulo, descricao, imagem, ordem }, {
        where: { id },
      });
      if (updated) {
        const updatedDepoimento = await Depoimento.findByPk(id);
        res.status(200).json(updatedDepoimento);
      } else {
        res.status(404).json({ error: 'Depoimento não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar o depoimento' });
    }
  };

// Método para excluir um banner por ID
exports.deleteDepoimento = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Depoimento.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({message : 'Depoimento excluído com sucesso'});
    } else {
      res.status(404).json({ error: 'Depoimento não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o depoimento' });
  }
};