const Pergunta = require('../models/Perguntas');
const { Op } = require('sequelize');

// Metodo para criar uma nova pergunta e resposta
exports.createPergunta = async (req, res) => {
    try {
        const { titulo, resposta } = req.body;
        const pergunta = await Pergunta.create({ titulo, resposta });
        res.status(201).json(pergunta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar a pergunta' });
    }
}

// Metodo para listar todas as perguntas
exports.getAllPerguntas = async (req, res) => {
    try {
        const perguntas = await Pergunta.findAll({
            order: [['ordem', 'ASC']],
        });
        res.status(200).json(perguntas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar perguntas' });
    }
};

// Metodo para buscar perguntas por título
exports.searchPerguntasByTitle = async (req, res) => {
    try {
        const { titulo } = req.query;
        const perguntas = await Pergunta.findAll({
            where: {
                titulo: {
                    [Op.like]: `%${titulo}%`
                },
            },
        });
        res.status(200).json(perguntas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar perguntas por título' });
    }
};

// Metodo para atualizar pergunta por ID
exports.updatePergunta = async (req, res) => {
    const { id } = req.params;
    try {
        const { titulo, resposta } = req.body;
        const [updated] = await Pergunta.update({ titulo, resposta }, {
            where: { id },
        });
        if (updated) {
            const updatedPergunta = await Pergunta.findByPk(id);
            res.status(200).json(updatedPergunta);
        } else {
            res.status(404).json({ error: 'Pergunta não encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar pergunta' });
    }
};

// Metodo para excluir pergunta por ID
exports.deletePergunta = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Pergunta.destroy({
            where: { id },
        });
        if (deleted) {
            res.status(200).json({ message: 'Pergunta excluída com sucesso' });
        } else {
            res.status(404).json({ error: 'Pergunta não encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir a pergunta' });
    }
}
