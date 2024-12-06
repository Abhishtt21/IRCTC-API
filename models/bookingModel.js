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
    }
})

User.hasMany(Booking);
Booking.belongsTo(User);
Train.hasMany(Booking);
Booking.belongsTo(Train);