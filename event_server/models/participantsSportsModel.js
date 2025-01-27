const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const ParticipantSports = sequelize.define('ParticipantSports', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    participantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Participants',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    sportId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Sports',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
}, {
    timestamps: true,
    tableName: 'ParticipantSports',
});

module.exports = ParticipantSports;
