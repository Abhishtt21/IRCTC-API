const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Train = sequelize.define('Train',{
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    train_name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    source:{
        type: DataTypes.STRING,
        allowNull: false
    },
    destination:{
        type: DataTypes.STRING,
        allowNull: false
    },

    totalSeats:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    availableSeats:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

module.exports = Train;