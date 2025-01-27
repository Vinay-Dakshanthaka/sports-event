const express = require('express');
const adminRouter = express.Router();
const authenticateToken = require('../middlewares/authenticateToken')

const adminController = require('../controllers/amdinController');
const participantController = require('../controllers/participantController');

adminRouter.post('/save-admin', adminController.addAdmin);

adminRouter.post('/login', adminController.loginAdmin);

adminRouter.get('/fetch-all-participants', authenticateToken, adminController.fetchAllParticipants);

adminRouter.put('/update-entery-time/:id', authenticateToken, participantController.updateEntryTime);

module.exports = adminRouter;
