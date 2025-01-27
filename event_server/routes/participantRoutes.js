const express = require('express');
const router = express.Router();

const SportsController = require('../controllers/sportsController');
const ParticipantsController = require('../controllers/participantController');
const ParticipantSportsController = require('../controllers/participantSportsController');

router.post('/sports', SportsController.addSport);

router.post('/participants', ParticipantsController.addParticipant);

router.get('/participants/:id', ParticipantsController.fetchParticipantById);

router.post('/participant-sports', ParticipantSportsController.registerParticipant);


module.exports = router;