const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const User = require('./userModel');
const Train = require('./trainModel');

const Booking = sequelize.define('Booking',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },

    seatNo:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('booked','cancelled'),
        allowNull: false,
        defaultValue: 'booked'
    },

    userId:{
        type: DataTypes.UUID,
        allowNull: false
    },
    trainId:{
        type: DataTypes.UUID,
        allowNull: false
    }
})

User.hasMany(Booking,{foreignKey: 'userId'});
Booking.belongsTo(User,{foreignKey: 'userId'});
Train.hasMany(Booking,{foreignKey: 'trainId'});
Booking.belongsTo(Train,{foreignKey: 'trainId'});

module.exports = Booking;