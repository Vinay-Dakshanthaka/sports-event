const express = require('express');
const router = express.Router();

const SportsController = require('../controllers/sportsController');
const ParticipantsController = require('../controllers/participantController');
const ParticipantSportsController = require('../controllers/participantSportsController');

router.post('/sports', SportsController.addSport);

router.get('/getsports', SportsController.getAllSports);

router.post('/participants', ParticipantsController.addParticipant);

router.get('/participants/:id', ParticipantsController.fetchParticipantById);

router.post('/participant-sports', ParticipantSportsController.registerParticipant);

router.post('/addSportsForParticipant', ParticipantSportsController.addSportsForParticipant);

router.delete('/sports/:id', SportsController.deleteSport);

router.get('/getparticipantsbysportid', SportsController.getParticipantsBySport);

router.post('/getsportsbyparticipantid',ParticipantSportsController.getsportsbyparticipantid);


module.exports = router;