const Sports = require('../models/sportsModel');

const SportsService = {
    async createSport(name) {
        try {
            const sport = await Sports.create({ name });
            return sport;
        } catch (error) {
            throw new Error(`Error creating sport: ${error.message}`);
        }
    }
};

module.exports = SportsService;
