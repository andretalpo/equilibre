const Card = require('../../models/Card');
const paramsSchema = require('../../utils/validation');
const joi = require('joi');
const ExpenseControler = require('../expenseControler/expense.controler');

class CardControler {
    listAll = async (req, res) => {
        try {
            if (!req.params.user) return res.status(400).json({ message: 'Usuário obrigatório.' });
            
            const cards = await Card.find({ user: req.params.user });
            
            return res.status(200).json({ cards });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Falha ao consultar cartão.' });
        }
    };

    listOne = async (req, res) => {

    };

    insert = async (req, res) => {
        try {
            const errors = this.validate(req.body);
            if (errors.length > 0) return res.status(400).json(errors);

            await Card.create(req.body);
            return res.status(200).json({ message: 'Cartão cadastrado com sucessso.' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Falha ao cadastrar cartão.' });
        }
    };

    editOne = async (req, res) => {
        try {
            const errors = this.validate({ user: req.params.id, ...req.body });
            if (errors.length > 0) return res.status(400).json(errors);

            const { name, provider, expiration_date } = req.body;
            const found = await Card.findByIdAndUpdate(req.params.id, { name, provider, expiration_date });

            if (!found) return res.status(400).json({ message: 'Cartão não encontrado.' });

            return res.status(200).json({ message: 'Cartão atualizado com sucessso.' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Falha ao editar cartão.' });
        }
    };

    deleteOne = async (req, res) => {
        try {
            if (!req.params.id) return res.status(400).json({ message: 'Id obrigatório.' });

            const expenses = await ExpenseControler.listExpensesByCard(req.params.id);
            
            if(expenses.length > 0){
                return res.status(400).json({ message: 'Cartão a ser deletado já possue compras'});
              }

            const found = await Card.findOneAndRemove({ _id: req.params.id });
            if (!found) return res.status(400).json({ message: 'Cartão não encontrado.' });

            return res.status(200).json({ message: 'Cartão removido com sucessso.' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Falha ao remover cartão.' });
        }
    };

    validate = (body) => {
        const { name, provider, expiration_date, id } = paramsSchema;

        const cardSchema = joi.object()
            .options({ abortEarly: false })
            .keys({
                name, provider, expiration_date, user: id,
            },
            );

        const validation = joi.validate(body, cardSchema);

        if (validation.error) {
            const errors = validation.error.details.map(error => ({
                error: error.message.split('" ')[1],
                field: error.context.key,
            }));

            return errors;
        }

        return [];
    }
}

module.exports = new CardControler();
