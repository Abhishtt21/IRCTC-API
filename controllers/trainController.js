const Sequelize = require('sequelize');
const Train = require('../models/trainModel');
const {trainSchema} = require('../utils/zodValidator');




const createTrain = async (req,res) => {
    try{
        const parsed = trainSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json(
                {
                    err:"error",
                    message: parsed.error.errors[0].message
                }
            );
        }
        const {train_name,source,destination, totalSeats} = parsed.data;

        const existingTrain = await Train.findOne({
            where:{
                train_name
            }
        });

        if(existingTrain){
            return res.status(400).json(
                {
                    message: 'Train already exists'
                }
            )
        };

        const train = await Train.create({
            train_name,
            source,
            destination,
            totalSeats
        });

        await train.save();
        return res.status(201).json(
            {
                message: 'Train created successfully'
            }
        );

    }
    catch(err){
        console.error(err);
        return res.status(500).json(
            {
                message: 'Internal Server Error'
            }
        );
    }
}

const getTrains = async (req,res) => {

    try{
        const {source,destination} = req.query;
        const trains = await Train.findAll({
            where:{
                source : source.toLowerCase(),
                destination: destination.toLowerCase(),
                availableSeats: {
                    [Sequelize.Op.gt]: 0
                }
            }
        });
        return res.status(200).json(
            {
                trains
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

const updateTrainSeats = async (req,res) => {
    try{
        const {trainId} = req.params;
        const {addSeats} = req.body;
        const train = await Train.findByPk(trainId);
        if(!train){
            return res.status(404).json(
                {
                    message: 'Train not found'
                }
            );
        }

        if(!addSeats || addSeats < 1){
            return res.status(400).json(
                {
                    message: 'Please provide a valid number of seats to add'
                }
            )}
        train.totalSeats += addSeats;
        train.availableSeats += addSeats;
        await train.save();
        return res.status(200).json(
            {
                message: 'Train seats updated successfully',
                train
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

module.exports = {createTrain,getTrains,updateTrainSeats};