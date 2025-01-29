const Sports = require('../models/sportsModel');
const Participant = require('../models/particpantsModel');
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

  // async getParticipantsBySportId(sportId) {
//     try {
//         // Find the sport by its ID
//         const sport = await Sports.findByPk(sportId);

//         if (!sport) {
//             throw new Error('Sport not found');
//         }

//     //    // Fetch all participants associated with the given sport ID
//     //    const participants = await Participant.findAll({
//     //     include: [{
//     //         model: Sports,  // You want to include the Sports model
//     //         through: ParticipantSports,  // Use the through table
//     //         where: { sportId: sportId },  // Filter by the sportId
//     //         required: true  // Ensure only participants with this sport are included
//     //     }]
//     // });

//     const participants = await ParticipantSports.findAll({
//         where :{
//             sportId : sportId,
//         }
//     })
     
//     console.log(participants,"-------------participants")
//     const participant = await Participant.findAll({
//         where : {
//             id : participants.dataValues.participantId
//         }
//     })
//     console.log(participant,"------------participant")
//         return participants;
//     } catch (error) {
//         throw new Error(`Error fetching participants: ${error.message}`);
//     }
// },
async getParticipantsBySportId(sportId) {
    try {
      // Find the sport by its ID and include the associated participants
      const participants = await Sports.findOne({
        where: { id: sportId },
        include: [
          {
            model: Participant,
            through: { attributes: [] }, // Exclude the intermediate table attributes
          }
        ]
      });
  
      if (!participants) {
        throw new Error('Sport not found');
      }
  
      if (!participants.Participants || participants.Participants.length === 0) {
        throw new Error('No participants found for this sport');
      }
  
      // Return the participants associated with the sportId
      return participants.Participants;
    } catch (error) {
      throw new Error(`Error fetching participants: ${error.message}`);
    }
  }

};


module.exports = SportsService;
