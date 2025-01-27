const ParticipantsService = require("../services/participantsService");
const AdminService = require("../services/adminService");
const { BASE_URL } = require("../config/baseUrl");

const ParticipantsController = {
    async addParticipant(req, res) {
        const { name, phone, email, place, state, registration_time } = req.body;
        console.log("resisteration time : ", registration_time)
        try {
            if (!registration_time) {
                return res.status(400).json({ error: "Registration time is required" });
            }

            const participant = await ParticipantsService.createParticipant({
                name,
                phone,
                email,
                place,
                state,
                registration_time,
            });

            const unique_link = `${BASE_URL}/participant-qr/${participant.id}`;
            await ParticipantsService.updateParticipant(participant.id, { unique_link });

            res.status(201).json({
                message: "Participant added successfully",
                participant: { ...participant.toJSON(), unique_link },
            });
        } catch (error) {
            console.error("Error saving the participant data: ", error);
            res.status(500).json({ error: error.message });
        }
    },

    async fetchParticipantById(req, res) {
        const { id } = req.params;
    
        try {
            const participant = await ParticipantsService.getParticipantById(id);
    
            res.status(200).json({
                message: "Participant fetched successfully",
                participant: participant.toJSON(),
            });
        } catch (error) {
            console.error("Error fetching participant data: ", error);
            res.status(500).json({ error: error.message });
        }
    },
    

    async updateEntryTime(req, res) {

        const admin_id = req.admin_id;
        const admin = AdminService.getAdminById(admin_id);
        if(!admin){
            return res.status(403).json({error : "Access Forbidden"});
        }

        const { id } = req.params;
        const { entry_time } = req.body;

        try {
            if (!entry_time) {
                return res.status(400).json({ error: "Entry time is required" });
            }

            const updatedParticipant = await ParticipantsService.updateParticipant(id, { entry_time });
            console.log("updated participant entry time :::",updatedParticipant)
            if (!updatedParticipant) {
                return res.status(404).json({ error: "Participant not found" });
            }

            res.status(200).json({
                message: "Entry time updated successfully",
                participant: updatedParticipant,
            });
        } catch (error) {
            console.error("Error updating the entry time: ", error);
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = ParticipantsController;
