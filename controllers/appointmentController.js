const Appointment = require('../models/appointment');
const User = require('../models/userModel');
exports.postAppointment = async (req,res,next) => {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const gender = req.body.gender;
        const dateOfBirth = req.body.dateOfBirth;
        const age = req.body.age;
        const appointmentDate = req.body.appointmentDate;
        const appointmentTime = req.body.appointmentTime;
        const doctorName = req.body.doctorName;
        const purpose = req.body.purpose;
        const userId = req.body.userId

        const response = await Appointment.create({
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            dateOfBirth: dateOfBirth,
            age: age,
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime,
            doctorName : doctorName,
            purpose: purpose,
            userId: userId,
        })
        const user = await User.findOne({
            where: { id: userId },
        });

        if (user) {
            user.noOfBookings = (user.noOfBookings || 0) + 1; // Increment noOfBookings by 1
            await user.save(); // Save the updated user record
        } else {
            console.log('User not found.');
        }

        return res.status(200).json({message: 'appointment successfully scheduled'});

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message: 'Failed to schedule appointment. Please try again later.'
        });
    }
}

exports.getAppointments = async (req,res,next) => {
    try {
        const userId = req.body.userId;
    const appointments = await Appointment.findAll({where : {userId : userId}});
    return res.status(200).json({appointments});
    } catch(err) {
        console.log(err)
    }
    
}