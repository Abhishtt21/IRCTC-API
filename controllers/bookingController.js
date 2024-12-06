const Sequelize = require('sequelize');
const Booking = require('../models/bookingModel');
const Train = require('../models/trainModel');
const User = require('../models/userModel');

const checkSeatAvailability = async (req,res) => {
    try{
        const {trainId} = req.query;
        const train = await Train.findByPk(trainId);
        if(!train){
            return res.status(404).json(
                {
                    message: 'Train not found'
                }
            );
        }
        return res.status(200).json(
            {
                availableSeats: train.availableSeats
            }
        );
    }
    catch(err){
        return res.status(500).json(
            {
                message: 'Internal Server Error'
            }
        );
    }
}


const bookSeat = async (req,res) => {

    const t = await Train.sequelize.transaction();

    try{
        const {trainId} = req.body;
        const userId = req.user.id;

        const train = await Train.findOne({
            where:{
                id: trainId,
                availableSeats: {
                    [Sequelize.Op.gt]: 0
                }
            },
            lock: t.LOCK.UPDATE,
            transaction: t
        });
        if(!train){
            t.rollback();
            return res.status(404).json(
                {
                    message: 'Train not found'
                }
            );
        }

        if(train.availableSeats === 0){
            t.rollback();
            return res.status(400).json(
                {
                    message: 'No seats available'
                }
            );
        }

        const user = await User.findByPk(userId);
        if(!user){
            t.rollback();
            return res.status(404).json(
                {
                    message: 'User not found'
                }
            );
        }

        const [updatedRows] = await Train.update({
            availableSeats: train.availableSeats - 1,
            version: train.version + 1
        },
        {
            where:{
                id: trainId,
                version: train.version,
                availableSeats: {
                    [Sequelize.Op.gt]: 0
                }
            },
            transaction: t
        });

        if(updatedRows === 0){
            t.rollback();
            return res.status(400).json(
                {
                    message: 'Seat booking failed. Please try again'
                }
            );
        }

        const booking = await Booking.create({
            userId: user.id,
            trainId: train.id,
            seatNo: train.totalSeats - train.availableSeats +1,
        },
        {
            transaction: t
        });

        await t.commit();
        return res.status(201).json(
            {
                message: 'Seat booked successfully',
                booking
            }
        );


    }
    catch(err){
        await t.rollback();
        console.error(err);
        return res.status(500).json(
            {
                message: 'Internal Server Error'
            }
        );
    }

}

const getBookingDetails = async (req,res) => {
    try{
        const {bookingId} = req.query;
        const booking = await Booking.findByPk(bookingId);
        if(!booking){
            return res.status(404).json(
                {
                    message: 'Booking not found'
                }
            );
        }
        return res.status(200).json(
            {
                booking
            }
        );


    }
    catch(err){
        return res.status(500).json(
            {
                message: 'Internal Server Error'
            }
        );
    }
}

const getAllBookings = async (req,res) => {
    try{
        const userId = req.user.id;
        const bookings = await Booking.findAll({
            where:{
                userId
            }
        });
        return res.status(200).json(
            {
                bookings
            }
        );

    }
    catch(err){
        return res.status(500).json(
            {
                message: 'Internal Server Error'
            }
        );
    }
}

module.exports = {checkSeatAvailability,bookSeat,getBookingDetails,getAllBookings};