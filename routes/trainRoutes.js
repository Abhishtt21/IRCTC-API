const express = require('express');
const router = express.Router();
const {createTrain, updateTrainSeats, getTrains} = require('../controllers/trainController');
const {bookSeat, checkSeatAvailability, getAllBookings,getBookingDetails} = require('../controllers/bookingController');
const {authenticateUser} = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/train/create',authenticateUser,adminMiddleware,createTrain);
router.put('/train/update/:trainId',authenticateUser,adminMiddleware,updateTrainSeats);
router.get('/train/trains',authenticateUser,getTrains);

router.post('/train/book',authenticateUser,bookSeat);
router.get('/train/bookings',authenticateUser,getAllBookings);
router.get('/train/booking',authenticateUser,getBookingDetails);
router.get('/train/check',authenticateUser,checkSeatAvailability);

module.exports = router;
