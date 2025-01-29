const ParticipantSports = require('../models/participantsSportsModel');
const Sports = require('../models/sportsModel')

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
    

  async addParticipantSports(participantId, sportIds) {
    try {
      
      if (!Array.isArray(sportIds)) {
        sportIds = [sportIds];
      } 
      const participantSportsData = sportIds.map((sportId) => ({
        participantId,
        sportId,
      }));
      // console.log(participantSportsData,"-----------------participantSportsData")
    
      const createdRecords = await ParticipantSports.bulkCreate(participantSportsData);

      return createdRecords;
    } catch (error) {
      throw new Error(`Error adding participant sports: ${error.message}`);
    }
  },

  async getSportsByParticipantId(participantId) {
    try {
     
      const participantSports = await ParticipantSports.findAll({
        where: {
          participantId: participantId,
        },
        attributes: ['sportId'], 
      });
  
      // console.log(participantSports, "-------------------participantservice");
  
      if (!participantSports || participantSports.length === 0) {
        throw new Error('No sports found for the participant');
      }
  
      const sportIds = participantSports.map((ps) => ps.sportId);
  
      const sports = await Sports.findAll({
        where: {
          id: sportIds,
        },
        attributes: ['id', 'name'], 
      });
  
      // console.log(sports, "---------sports");
      return sports;
    } catch (error) {
      console.error(error.message);
      throw new Error('Error fetching sports for the participant');
    }
  }
  
};

module.exports = ParticipantSportsService;
