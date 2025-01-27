const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Participants = sequelize.define('Participants', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    place: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    entry_time: {
        type: DataTypes.STRING, // Store as a string
        allowNull: true,
        defaultValue: null,
    },
    exit_time: {
        type: DataTypes.STRING, // Store as a string
        allowNull: true,
        defaultValue: null,
    },
    registration_time: {
        type: DataTypes.STRING, // Store as a string
        allowNull: false,
        defaultValue: () => {
            const now = new Date();
            return now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        },
    },
    unique_link: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
}, {
    timestamps: true,
    tableName: 'Participants',
});

module.exports = Participants;
