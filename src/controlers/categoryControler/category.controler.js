const Category = require('../../models/Category');

class CategoryControler {
  listAll = async (req, res) => {
    try {
      if (!req.body) res.status(400).json({ message: 'ID de usuário obrigatório obrigatório.'});

      const categories = await Category.findAll({ user: req.body.user });
      
      if (!categories) res.status(404).json({ message: 'Categorias não encontrado'});

      return res.status(200).json(categories);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno' });
    }
  };

  listOne = async (req, res) => {
    try {
      if (!req.body) res.status(400).json({ message: 'Nome da categoria não informado'});

      const category = await Category.findAll({ user: req.body.name });
      
      if (!categories) res.status(404).json({ message: 'Categoria não encontrado'});

      return res.status(200).json(category);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno' });
    }
  };

  insert = async (req, res) => {
    try {
      if (!req.body) res.status(400).json({ message: 'Fornecer Nome para categoria e ID de usuário'});

      const category = await Category.create({ name: req.body.name, user: req.body.user });
      
      return res.status(200).json(categories);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno' });
    }
  };

  editOne = async (req, res) => {
    try {
      if (!req.body) res.status(400).json({ message: 'Fornecer Nome para categoria e ID de usuário'});

      const category = await Category.findOneAndUpdate({ name: req.body.currentName, user: req.body.user }, { name: req.body.newName });

      if (!category) res.status(404).json({ message: 'Categoria não encontrado'});
    
      return res.status(200).json(category);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno' });
    }
  };

  deleteOne = async (req, res) => {
    try {
      if (!req.body) res.status(400).json({ message: 'Fornecer Nome para categoria e ID de usuário'});

      const category = await Category.findOneAndRemove({ name: req.body.name, user: req.body.user });

      if (!category) res.status(404).json({ message: 'Categoria não encontrado'});
    
      return res.status(200).json(category);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno' });
    }
  };
}

module.exports = new CategoryControler();