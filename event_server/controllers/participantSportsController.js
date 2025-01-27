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
    }
};

module.exports = ParticipantSportsController;
