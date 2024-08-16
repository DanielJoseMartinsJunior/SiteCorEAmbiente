const Publicacao = require('../models/Publicacao');
const { Op } = require('sequelize');

// Método para criar uma nova publicação
exports.createPublicacao = async (req, res) => {
  try {
    const { titulo, conteudo } = req.body;
    const files = req.files;

    // Adicione os logs para verificar se os arquivos foram carregados corretamente
    console.log('Imagem Principal:', files['imagem_principal']);
    console.log('Imagens Internas:', files['imagens_internas']);


    if (!files || !files['imagem_principal']) {
      return res.status(400).json({ error: 'Imagem principal é obrigatória.' });
    }

    const imagem_principal = files['imagem_principal'][0].filename;
    let imagens_internas = '';

    if (files['imagens_internas']) {
      imagens_internas = files['imagens_internas'].map((file) => file.filename);
    }

    const publicacao = await Publicacao.create({
      titulo,
      conteudo,
      imagem_principal,
      imagens_internas: JSON.stringify(imagens_internas) // Armazenando como JSON
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

// Método para atualizar uma publicação
// Método para atualizar uma publicação
exports.updatePublicacao = async (req, res) => {
  const { id } = req.params;
  try {
    const { titulo, conteudo } = req.body;
    let imagem_principal = req.files['imagem_principal'] ? req.files['imagem_principal'][0].filename : null;
    let imagens_internas = [];

    // Verificar se os arquivos foram carregados corretamente
    console.log('Imagem Principal (atualização):', req.files['imagem_principal']);
    console.log('Imagens Internas (atualização):', req.files['imagens_internas']);

    if (req.files['imagens_internas']) {
      imagens_internas = req.files['imagens_internas'].map(file => file.filename);
    }

    const publicacao = await Publicacao.findByPk(id);
    if (!publicacao) {
      return res.status(404).json({ error: 'Publicação não encontrada' });
    }

    if (!imagem_principal) {
      imagem_principal = publicacao.imagem_principal;
    }

    const [updated] = await Publicacao.update({
      titulo,
      conteudo,
      imagem_principal,
      imagens_internas: JSON.stringify(imagens_internas.length > 0 ? imagens_internas : JSON.parse(publicacao.imagens_internas))
    }, {
      where: { id }
    });

    if (updated) {
      const updatedPublicacao = await Publicacao.findByPk(id);
      res.status(200).json(updatedPublicacao);
    } else {
      res.status(404).json({ error: 'Publicação não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a publicacao' });
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
