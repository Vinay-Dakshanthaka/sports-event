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
    },

    
    async getAllSports(req, res) {
        try {
            
            const sports = await SportsService.getAllSports();

            if (sports.length === 0) {
                return res.status(404).json({ message: 'No sports available.' });
            }

            return res.status(200).json(sports);
        } catch (error) {
            console.error('Error fetching sports: ', error);
            return res.status(500).json({ message: error.message });
        }
    },
     
      async deleteSport(req, res) {
        const { id } = req.params;  
        //  console.log(req.params,"------------------------sportsid")
        try {
            const result = await SportsService.deleteSportById(id);  

            return res.status(200).json(result);
        } catch (error) {
           
            return res.status(500).json({ error: error.message });
        }
    },
   
};

module.exports = SportsController;
