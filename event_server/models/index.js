const { sequelize, createDatabaseIfNotExists } = require('../config/db');

const Participants = require('./particpantsModel')
const Sports = require('./sportsModel')
const ParticipantSports = require('./participantsSportsModel')
const Admin = require('./adminModel')

Participants.belongsToMany(Sports, { through: ParticipantSports, foreignKey: 'participantId' });
Sports.belongsToMany(Participants, { through: ParticipantSports, foreignKey: 'sportId' });

const initDatabase = async () => {
    try {
      // Creates the database if it doesn't exist
      await createDatabaseIfNotExists();
  
      // Sync all models  with the database and the models present in the code 
      await sequelize.sync({ alter: false });  //this {alter : true} will add newly added column to the table without dropping them 
  
      console.log('Database and tables created successfully!');
    } catch (error) {
      console.error('Error initializing the database:', error);
      throw error;
    }
  };

  module.exports = {
    sequelize,
    initDatabase,
    Participants,
    Sports,
    ParticipantSports,
    Admin
  }