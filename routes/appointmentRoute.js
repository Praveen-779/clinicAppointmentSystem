const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointmentController');

router.post('/postAppointment',appointmentController.postAppointment)

router.post('/getAppointments',appointmentController.getAppointments)
module.exports = router;