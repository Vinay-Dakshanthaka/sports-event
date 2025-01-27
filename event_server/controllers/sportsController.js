const SportsService = require('../services/sportsService');

const SportsController = {
    async addSport(req, res) {
        const { name } = req.body;

        try {
            const sport = await SportsService.createSport(name);
            res.status(201).json({ message: 'Sport added successfully', sport });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = SportsController;
