const ParticipantSports = require('../models/participantsSportsModel');

const ParticipantSportsService = {
    async registerParticipantForSports(participantId, sportsIds) {
        try {
            const participantSports = await Promise.all(
                sportsIds.map(sportId =>
                    ParticipantSports.create({ participantId, sportId })
                )
            );
            return participantSports;
        } catch (error) {
            throw new Error(`Error registering participant for sports: ${error.message}`);
        }
    }
};

module.exports = ParticipantSportsService;
