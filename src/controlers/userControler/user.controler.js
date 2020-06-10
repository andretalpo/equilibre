const User = require('../../models/User');

class UserControler {
  listAll = async (req, res) => {

  };

  listOne = async (req, res) => {
    try {
      console.log('chegou na funcao correta')
      if (!req.query.email) res.status(400).json({ message: 'E-mail obrigatório.'});

      const user = await User.findOne({ email: req.query.email });
      
      if (!user) res.status(404).json({ message: 'Usuário não encontrado '});

      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno' });
    }
  };

  insert = async (req, res) => {

  };

  editOne = async (req, res) => {

  };

  deleteOne = async (req, res) => {

  };
}

module.exports = new UserControler();
