const trabalho = require('../models/NossosTrabalhos');
const { Op } = require('sequelize');

exports.createTrabalhos = async(req,res) =>{
    try{
        const{titulo, descricao} = req.body;
        const imagem = req.file.filename;
        const trabalho = await Trabalho.create({titulo,descricao,imagem});
        res.status(201).json(trabalho)
    }catch(error){
        console.error(error)
        res.status(500).json({error:'erro ao cadastrar trabalho'});
    }
};

exports.getAllTrabalhos = async(req,res) =>{
    try{
        const trabalho = await Trabalho.findAll({
            order:[['ordem','ASC']],
        });
    res.status(200).json(trabalho);
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Erro ao buscar os trabalhos'});
    }
};

// Método para buscar um Trabalho por ID
exports.getTrabalhoById = async (req, res) => {
    const { id } = req.params;
    try {
      const trabalho = await Trabalho.findByPk(id);
      if (!trabalho) {
        res.status(404).json({ error: 'Trabalho não encontrado' });
        return;
      }
      res.status(200).json(trabalho);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o trabalho' });
    }
  };

  // Método para buscar trabalhos por título
exports.searchTrabalhosByTitle = async (req, res) => {
    try {
      const { titulo } = req.query; // Recupera o título da consulta da query
  
      // Realiza a busca no banco de dados com base no título
      const trabalho = await Trabalho.findAll({
        where: {
          titulo: {
            [Op.like]: `%${titulo}%`, // Pesquisa por títulos que contenham o termo
          },
        },
      });
  
      res.status(200).json(trabalho);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar trabalhos por título' })     ;  
    }
  };

  // Método para atualizar um trablho por ID
exports.updateTrabalho = async (req, res) => {
    const { id } = req.params;
    try {
      const { titulo, descricao } = req.body;
      const imagem = req.file.filename; // Obtém o nome do arquivo enviado
  
      const [updated] = await trabalho.update({ titulo, descricao, imagem }, {
        where: { id },
      });
      if (updated) {
        const updatedTrabalho = await Trabalho.findByPk(id);
        res.status(200).json(updatedTrabalho);
      } else {
        res.status(404).json({ error: 'trabalho não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar o trabalho' });
    }
  };  


// Método para excluir um trabalho por ID
exports.deleteTrabalho = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Trabalho.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({message : 'Trabalho excluído com sucesso'});
    } else {
      res.status(404).json({ error: 'Trabalho não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o Trabalho' });
  }
};

  
  