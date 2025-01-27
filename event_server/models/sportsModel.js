const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Sports = sequelize.define('Sports', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: true,
    tableName: 'Sports',
});

module.exports = Sports;
