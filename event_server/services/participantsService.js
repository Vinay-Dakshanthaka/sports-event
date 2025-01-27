const Participants = require("../models/particpantsModel");

const ParticipantsService = {
    async createParticipant(participantData) {
        try {
            const participant = await Participants.create(participantData);
            return participant;
        } catch (error) {
            throw new Error(`Error creating participant: ${error.message}`);
        }
    },

    async getParticipantById(participantId) {
        try {
            const participant = await Participants.findByPk(participantId);
            if (!participant) {
                throw new Error("Participant not found");
            }
            return participant;
        } catch (error) {
            throw new Error(`Error fetching participant by ID: ${error.message}`);
        }
    },
    

    async allParticipants() {
        try {
            const participant = await Participants.findAll();
            return participant;
        } catch (error) {
            throw new Error(`Error creating participant: ${error.message}`);
        }
    },

    async updateParticipant(id, updates) {
        try {
            console.log("id : ::::", id)
            const updatedParticipants = await Participants.update(updates, {
                where: { id },
                returning: true, // Returns the updated rows
            });

            return  updatedParticipants;
        } catch (error) {
            throw new Error(`Error updating participant: ${error.message}`);
        }
    },
};

module.exports = ParticipantsService;
