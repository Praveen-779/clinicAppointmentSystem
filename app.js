const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const sequelize = require('./util/database');

const User = require('./models/userModel')
const Appointment = require('./models/appointment')

const userRoute = require('./routes/userRoute')
const appointmentRoute = require('./routes/appointmentRoute');

app.use(express.json());
app.use(cors())

app.use('/user',userRoute);
app.use('/appointment',appointmentRoute);

User.hasMany(Appointment);
Appointment.belongsTo(User);

sequelize
      .sync()
      .then(result => {
        app.listen(7000);
      })
      .catch(err => console.log(err));


