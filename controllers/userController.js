const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

exports.signup =  async (req,res,next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const dateOfBirth = req.body.dateOfBirth;
    const age = req.body.age;
    const address = req.body.address;
    const contactNumber = req.body.contactNumber;
    const email = req.body.email;

    try {
        if(!email) {
            return res.status(400).json({sucess: false, message: 'email is required'});
        }
        const response = await User.create({
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            age: age,
            address: address,
            contactNumber: contactNumber,
            email: email,
            dateOfBirth: dateOfBirth,
            password: 'Change@123',
            noOfBookings: 0
        })
        console.log(response)
        await signupMail(email);
    
        return res.status(200).json({success : true, message: 'signup success'});
    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false,message: 'signup failed'})
    }
}

exports.login = async (req,res,next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email,password)
        const user = await User.findOne({where: {email: email}})
        if(!user) {
            console.log('inside login',user)
            return res.status(404).json({message: 'user not found'});
        }
        if(user.email === email) {
            if(password === user.password) {
                res.status(200).json({message: 'login success', token: generateToken(user.id)})
            } else {
                res.status(401).json({message: 'password incorrect'});
            }
        }
    } catch(err) {
        console.log(err);
    }
}

exports.getUser = async (req,res,next) => {
    const userId = req.body.userId;
    try {
        const user = await User.findOne({where : {id : userId}})
        return res.status(200).json({user})
    } catch(err) {
        console.log(err);
    }

    
}

async function signupMail(email) {
    try {
        if(email) {
            const transporter = nodemailer.createTransport({
                service : 'gmail',
                auth: {
                    user: 'bbab1910430@skdc.edu.in',
                    pass: 'cudl cmdq vafi gbxg'
                }
            });

            const mailOptions = {
                from: 'bbab1910430@skdc.edu.in',
                to: email,
                subject: 'signup successfull for clinic appointment system',
                html: `<p>your mail id is <b>${email}</b> and your password is <b>Change@123</b></p>`
            };

            const info = await transporter.sendMail(mailOptions)
            console.log(info)
        }
    }
    catch(err) {
        console.log(err);
    }
} 

function generateToken(id) {
    console.log('inside generate token',id)
    return jwt.sign({userId : id}, 'secretKey');
}

