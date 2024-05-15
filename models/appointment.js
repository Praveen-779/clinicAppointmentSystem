const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Appointment = sequelize.define('appointment', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    gender : {
        type: Sequelize.STRING,
        allowNull: false
    },

    dateOfBirth : {
        type: Sequelize.DATE,
        allowNull: false
    },

    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    appointmentDate : {
        type: Sequelize.DATE,
        allowNull : false
    },
    appointmentTime: {
        type: Sequelize.TIME,
        allowNull : false
    },
    doctorName: Sequelize.STRING,
        
    purpose: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
})

module.exports = Appointment;