const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
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

    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    contactNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: Sequelize.STRING,
    noOfBookings : Sequelize.INTEGER
})

module.exports = User;