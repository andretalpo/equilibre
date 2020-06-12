const Expense = require('../../models/Expense');
const paramsSchema = require('../../utils/validation');
const joi = require('joi');

class ExpenseControler {
    listAll = async (req, res) => {
        try {
            const errors = this.validateDate(req.query.startDate, req.query.endDate);
            if (errors.length > 0) return res.status(400).json(errors);

            const expenses = await Expense.find({
                card: req.params.card,
                date: {
                    $gte: req.query.startDate,
                    $lte: req.query.endDate
                }
            });

            return res.status(200).json({ expenses });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Falha ao consultar compras.' });
        }
    };

    listOne = async (req, res) => {

    };

    insert = async (req, res) => {
        try {
            const errors = this.validate(req.body);
            if (errors.length > 0) return res.status(400).json(errors);

            await Expense.create(req.body);
            return res.status(200).json({ message: 'Compra cadastrada com sucessso.' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Falha ao cadastrar compra.' });
        }
    };

    editOne = async (req, res) => {
        try {
            if (!req.params.id) return res.status(400).json({ message: 'Id obrigatório.' });

            const errors = this.validate(req.body);
            if (errors.length > 0) return res.status(400).json(errors);

            await Expense.findByIdAndUpdate(req.params.id, req.body);
            return res.status(200).json({ message: 'Compra atualizada com sucessso.' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Falha ao atualizar compra.' });
        }
    };

    deleteOne = async (req, res) => {
        try {
            if (!req.params.id) return res.status(400).json({ message: 'Id obrigatório.' });

            const found = await Expense.findOneAndRemove({ _id: req.params.id });
            if (!found) return res.status(400).json({ message: 'Compra não encontrada.' });

            return res.status(200).json({ message: 'Compra removida com sucessso.' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Falha ao remover compra.' });
        }
    };

    validateDate = (startDate, endDate) => {
        const { date } = paramsSchema;

        const dateSchema = joi.object()
            .options({ abortEarly: false })
            .keys({
                startDate: date, endDate: date
            },
            );

        const validation = joi.validate({ startDate, endDate }, dateSchema);

        if (validation.error) {
            const errors = validation.error.details.map(error => ({
                error: error.message.split('" ')[1],
                field: error.context.key,
            }));

            return errors;
        }

        return [];

    }

    validate = (body) => {
        const { name, stablishment, value, date, categoryId, cardId } = paramsSchema;

        const expenseSchema = joi.object()
            .options({ abortEarly: false })
            .keys({
                name, stablishment, value, date, category: categoryId, card: cardId
            },
            );

        const validation = joi.validate(body, expenseSchema);

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

module.exports = new ExpenseControler();
