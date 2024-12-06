const express = require('express');
const router = express.Router();
const {createTrain, updateTrainSeats, getTrains} = require('../controllers/trainController');
const {bookSeat, checkSeatAvailability, getAllBookings,getBookingDetails} = require('../controllers/bookingController');
const {authenticateUser} = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/admin/create',authenticateUser,adminMiddleware,createTrain);
router.put('/admin/update/:trainId',authenticateUser,adminMiddleware,updateTrainSeats);
router.get('/trains',authenticateUser,getTrains);

router.post('/book',authenticateUser,bookSeat);
router.get('/bookings',authenticateUser,getAllBookings);
router.get('/booking',authenticateUser,getBookingDetails);

module.exports = router;