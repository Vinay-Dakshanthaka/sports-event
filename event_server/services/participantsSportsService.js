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
    },
     // Method to store the participant's selected sports
  async addParticipantSports(participantId, sportIds) {
    try {
      // Check if sportIds is an array, if not, make it an array
      if (!Array.isArray(sportIds)) {
        sportIds = [sportIds];
      }

      // Prepare the data to be inserted
      const participantSportsData = sportIds.map((sportId) => ({
        participantId,
        sportId,
      }));
      console.log(participantSportsData,"-----------------participantSportsData")
      // Insert all the records for the participant and sports
      const createdRecords = await ParticipantSports.bulkCreate(participantSportsData);

      return createdRecords;
    } catch (error) {
      throw new Error(`Error adding participant sports: ${error.message}`);
    }
  },
};

module.exports = ParticipantSportsService;
