const Expense = require('../../models/Expense');
const paramsSchema = require('../../utils/validation');
const joi = require('joi');
const Card = require('../../models/Card');
const Category = require('../../models/Category');

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

            }).sort({ 'date': -1 });

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

    getTotalValue = async (req, res) => {
        try {
            const { startDate, endDate, userId, cardId } = req.query;

            let cards = [];
            if (!cardId) {
                cards = await Card.find({ user: userId }, { _id: 1 });
            } else {
                cards.push({ _id: cardId })
            }

            const results = await Promise.all(cards.map(async card => {
                const expenses = await Expense.find(
                    {
                        card: card._id,
                        date: {
                            $gte: startDate,
                            $lte: endDate
                        }
                    },
                    {
                        value: 1
                    }
                );

                return expenses.reduce((previous, current) => previous + current.value, 0);
            }));

            const result = results.reduce((previous, current) => previous + current, 0);
            return res.status(200).json({ result: result });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Falha ao consultar valores.' });
        }
    }

    getValueByCategory = async (req, res) => {
        try {
            const { startDate, endDate, userId, cardId } = req.query;

            const categories = await Category.find({ user: userId });
            const results = await Promise.all(
                categories.map(async category => {
                    let expenses = [];
                    if (cardId) {
                        expenses = await Expense.find(
                            {
                                card: cardId ? cardId : '',
                                category: category._id,
                                date: {
                                    $gte: startDate,
                                    $lte: endDate
                                }
                            },
                            {
                                value: 1
                            }
                        );
                    } else {
                        expenses = await Expense.find(
                            {
                                category: category._id,
                                date: {
                                    $gte: startDate,
                                    $lte: endDate
                                }
                            },
                            {
                                value: 1
                            }
                        );
                    }

                    const valueByCategory = { id: category._id, name: category.name }
                    valueByCategory.value = expenses.reduce((previous, current) => previous + current.value, 0);
                    return valueByCategory;
                })
            );

            results.sort((r1, r2) => r2.value - r1.value);

            return res.status(200).json({ results: results });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Falha ao consultar valores.' });
        }
    }


    getTopTenExpenses = async (req, res) => {
        try {
            const { startDate, endDate, userId, cardId } = req.query;

            let results = [];
            if (cardId) {
                results = await Expense.find(
                    {
                        card: cardId ? cardId : '',
                        date: {
                            $gte: startDate,
                            $lte: endDate
                        }
                    }
                ).sort({ value: -1 }).limit(10);
            } else {
                const cards = await Card.find({ user: userId }, { _id: 1 });
                results = await Expense.find(
                    {
                        card: {
                            $in: cards,
                        },
                        date: {
                            $gte: startDate,
                            $lte: endDate
                        }
                    }
                ).sort({ value: -1 }).limit(10);
            }

            return res.status(200).json({ results: results });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Falha ao consultar valores.' });
        }
    }

    listExpensesByCategory = async (categoryId) => {

        const expenses = await Expense.find({ category: categoryId});
        return expenses;
    }


    listExpensesByCard = async (cardId) => {

        const expenses = await Expense.find({ card: cardId});
        return expenses;
}

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
