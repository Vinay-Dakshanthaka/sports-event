const Sports = require('../models/sportsModel');

const SportsService = {
    async createSport(name) {
        try {
            const sport = await Sports.create({ name });
            return sport;
        } catch (error) {
            throw new Error(`Error creating sport: ${error.message}`);
        }
    },
     
  async getAllSports() {
    try {
      const sports = await Sports.findAll();
      return sports;
    } catch (error) {
      throw new Error(`Error retrieving sports: ${error.message}`);
    }
  },
  
   async deleteSportById(id) {
    try {
        const sport = await Sports.findByPk(id);  
      
        if (!sport) {
            throw new Error('Sport not found');
        }

        await sport.destroy();

        return { message: 'Sport deleted successfully' };
    } catch (error) {
        throw new Error(`Error deleting sport: ${error.message}`);
    }
},

  
};


module.exports = SportsService;
