const Publicacao = require('../models/publicacoes');
const { Op } = require('sequelize');

//metodo para criar nova publicação
exports.createPublicacao = async(req,res) =>{
    try{
     const{titulo,conteudo} = req.body;
     const imagem = req.file.filename;
     const publicacao = await Publicacao.create({titulo,conteudo,imagem});
     res.status(201).json(publicacao)
    }catch(error){
        console.error(error)
        res.status(500).json({error: ' Erro ao criar publicação'}); 
    }
};

//metodo para listar todos as publicaçoes
exports.getAllpublicacoes = async (req, res) => {
    try {
      const banners = await Banner.findAll({
        order: [['ordem', 'ASC']],
    });
      res.status(200).json(publicacoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar as publicações' });
    }
  };
  
//Metodo para buscar publicação por id 
exports.getPublicacaosById = async(req,res) =>{
    const{id} = req.params;
    try{
      const publicacao = await Publicacao.findByPk(id);
      if(!publicacao){
        res.status(404).json({error:'publicacao nao encontrada'})
        return;
      } 
      res.status(200).json(publicacao)

    }catch(error){
        console.error(error);
        res.status(500).json({error:'erro ao buscar o banner'})
    }
}

// Método para buscar banners por título
exports.searchPublicacaosByTitle = async (req, res) => {
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
      res.status(500).json({ error: 'Erro ao buscar publicacoes por título' })     ;  
    }
  };
  
  // Método para atualizar um banner por ID
exports.updatePublicacao = async (req, res) => {
    const { id } = req.params;
    try {
      const { titulo,conteudo } = req.body;
      const imagem = req.file.filename; // Obtém o nome do arquivo enviado
  
      const [updated] = await Publicacao.update({ titulo, conteudo, imagem }, {
        where: { id },
      });
      if (updated) {
        const updatedPublicacao = await Publicacao.findByPk(id);
        res.status(200).json(updatedPublicacao);
      } else {
        res.status(404).json({ error: 'Publicação não encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar a Publicação' });
    }
  };

 // Método para excluir um banner por ID
exports.deletePublicacao = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Publicacao.destroy({
        where: { id },
      });
      if (deleted) {
        res.status(200).json({message : 'Publicação excluída com sucesso'});
      } else {
        res.status(404).json({ error: 'Publicação não encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir a Publicação' });
    }
  };
  
  