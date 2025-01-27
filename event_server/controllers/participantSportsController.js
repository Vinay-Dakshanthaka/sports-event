const ParticipantSportsService = require('../services/participantsSportsService');

const ParticipantSportsController = {
    async registerParticipant(req, res) {
        const { participantId, sportsIds } = req.body;

        try {
            const registrations = await ParticipantSportsService.registerParticipantForSports(participantId, sportsIds);
            res.status(201).json({ message: 'Participant registered for sports successfully', registrations });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    },


  async addSportsForParticipant(req, res) {
    const { participantId, sportIds } = req.body;  
        // console.log(req.body,"--------------------id's,sportIds")
    try {
      if (!participantId || !sportIds) {
        return res.status(400).json({ message: 'Participant ID and sport IDs are required.' });
      }

      if (!Array.isArray(sportIds) || sportIds.length === 0) {
        return res.status(400).json({ message: 'Sport IDs must be a non-empty array.' });
      }

      const result = await ParticipantSportsService.addParticipantSports(participantId, sportIds);

      return res.status(201).json({
        message: 'Participant sports added successfully',
        data: result,  
      });
    } catch (error) {
      console.error('Error adding sports for participant: ', error);
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = ParticipantSportsController;
