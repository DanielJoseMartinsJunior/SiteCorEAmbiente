const Pergunta = require('../models/perguntas');
const Banner = require('../models/perguntas');
const { Op } = require('sequelize');


//Metodo para criar uma nova pergunta e resposta
exports.cratePergunta = async   (req,res)=>{
    try{
        const{titulo,resposta} = req.body;
        const pergunta = await Pergunta.create({titulo,resposta});
        req.status(201).json(pergunta);
    }catch(error){
        console.error(error);
        res.status(500).json({error:'erro ao criar a pergunta'});
    }
}

//Metodo para listar todas as perguntas
exports.getAllPerguntas = async (req,res)=>{
    try{
     const perguntas = await Pergunta.findAll({
        order:[['ordem','ASC']],
     });
     res.status(200).json(perguntas)
    }catch(error){
        res.status(500).json({error: 'Erro ao buscar perguntas'});
    }
};

//metodo para buscar pergunats por titulo
exports.searchPeguntasByTitle = async(req,res)=>{
    try{
        const {titulo} = req.query;
        const perguntas = await Pergunta.findAll({
            where:{
                titulo:{
                    [Op.like]: `%${titulo}%`
                },
            },
        });
        req.status(200).json(banners)
    }catch(error){
        console.error(error)
        res.status(500).json({error:'erro ao buscar perguntas por titulo'})
    }    
}