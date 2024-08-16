const Publicacao = require('../models/Publicacao');
const { Op } = require('sequelize');

// Método para criar uma nova publicação
exports.createPublicacao = async (req, res) => {
  try {
    const { titulo, conteudo } = req.body;  // New text field 'conteudo'
    const imagem_principal = req.files['imagem_principal'][0].filename;
    let imagens_internas = '';

    if (req.files['imagens_internas']) {
      imagens_internas = req.files['imagens_internas'].map((file) => file.filename);
    }

    const publicacao = await Publicacao.create({
      titulo,
      conteudo,  // Save content text
      imagem_principal,
      imagens_internas: JSON.stringify(imagens_internas) // Store images as JSON string
    });

    res.status(201).json(publicacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a publicação' });
  }
};

// Método para listar todas as publicações
exports.getAllPublicacoes = async (req, res) => {
  try {
    const publicacoes = await Publicacao.findAll();
    res.status(200).json(publicacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar as publicações' });
  }
};

// Método para buscar uma publicação por ID
exports.getPublicacaoById = async (req, res) => {
  const { id } = req.params;
  try {
    const publicacao = await Publicacao.findByPk(id);
    if (!publicacao) {
      res.status(404).json({ error: 'Publicação não encontrada' });
      return;
    }
    res.status(200).json(publicacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar a publicação' });
  }
};

// Método para buscar publicações por título
exports.searchPublicacoesByTitle = async (req, res) => {
  try {
    const { titulo } = req.query;

    const publicacoes = await Publicacao.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`,
        },
      },
    });

    res.status(200).json(publicacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar publicações por título' });
  }
};

// Método para atualizar uma publicação por ID
// Método para atualizar uma publicação por ID
exports.updatePublicacao = async (req, res) => {
  const { id } = req.params;
  try {
    const { titulo, conteudo } = req.body;
    
    // Handle imagem_principal upload
    let imagem_principal = null;
    if (req.files && req.files['imagem_principal'] && req.files['imagem_principal'][0]) {
      imagem_principal = req.files['imagem_principal'][0].filename;
    }

    // Handle imagens_internas upload
    let imagens_internas = [];
    if (req.files && req.files['imagens_internas']) {
      imagens_internas = req.files['imagens_internas'].map(file => file.filename);
    }

    const updateData = { titulo, conteudo };
    if (imagem_principal) {
      updateData.imagem_principal = imagem_principal;
    }
    if (imagens_internas.length > 0) {
      updateData.imagens_internas = JSON.stringify(imagens_internas);
    }

    const [updated] = await Publicacao.update(updateData, {
      where: { id },
    });

    if (updated) {
      const updatedPublicacao = await Publicacao.findByPk(id);
      res.status(200).json(updatedPublicacao);
    } else {
      res.status(404).json({ error: 'Publicação não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao atualizar a publicação:', error);
    res.status(500).json({ error: 'Erro ao atualizar a publicação. Verifique os dados enviados e tente novamente.' });
  }
};


// Método para excluir uma publicação por ID
exports.deletePublicacao = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Publicacao.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Publicação excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'Publicação não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a publicação' });
  }
};
