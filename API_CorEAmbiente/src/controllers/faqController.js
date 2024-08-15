const Faq = require('../models/Faq');
const { Op } = require('sequelize');


// Método para criar uma nova notícia trabalho
exports.createFaq= async (req, res) => {
  try {
    const { titulo, resposta, ordem } = req.body;
    

    const faq = await Faq.create({ titulo, resposta, ordem});
    res.status(201).json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a faq' });
  }
};

// Método para listar todas as notícias
exports.getAllFaqs = async (req, res) => {
    try {
      const faqs = await Faq.findAll();
      res.status(200).json(faqs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar as faqs' });
    }
  };


// Método para buscar uma notícia por ID
exports.getFaqById = async (req, res) => {
  const { id } = req.params;
  try {
    const faq = await Faq.findByPk(id);
    if (!faq) {Faq
      res.status(404).json({ error: 'Faq não encontrada' });
      return;
    }
    res.status(200).json(faq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar a faq' });
  }
};

// Método para buscar noticias por título
exports.searchFaqsByTitle = async (req, res) => {
  try {
    const { titulo } = req.query; // Recupera o título da consulta da query

    // Realiza a busca no banco de dados com base no título
    const faqs = await Faq.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`, // Pesquisa por títulos que contenham o termo
        },
      },
    });

    res.status(200).json(faqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar faqs por título' });
  }
};

// Método para atualizar uma notícia por ID trabalho
exports.updateFaq = async (req, res) => {
  const { id } = req.params;
  try {
    const { titulo, resposta, ordem } = req.body;

    const [updated] = await Faq.update({ titulo,resposta }, {
      where: { id },
    });
    if (updated) {
      const updatedFaq = await Faq.findByPk(id);
      res.status(200).json(updatedFaq);
    } else {
      res.status(404).json({ error: 'Faq não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a faq' });
  }
};

// Método para excluir uma notícia por ID
exports.deleteFaq = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Faq.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Faq excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'Faq não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a faqs' });
  }
};