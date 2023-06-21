const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Booking = require('./models/Booking');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sjdofe0irer3ncd';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

mongoose.connect(process.env.MONGO_URL);

const getUserDataFromToken = (req) => {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async(err, userData) => {
            if(err) throw err;
            resolve(userData)
        });
    });
};

app.get('/test', (req, res) => {
    res.json("all good");
});

app.post('/register', async(req, res) => {
    const { name, email, password } = req.body;

    try {
        const userCreated = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(userCreated);
    } catch(err) {
        res.status(422).json(err);
    }
});

app.post('/login', async(req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({email});

    if(existingUser) {
        const passwordOk = bcrypt.compareSync(password, existingUser.password);
        if(passwordOk) {
            jwt.sign({email: existingUser.email, id: existingUser._id}, jwtSecret, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(existingUser)
            });
        } else {
            res.status(422).json("password not ok");
        }
    } else {
        res.json("user not found");
    }
});

app.get('/profile', async(req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { token } = req.cookies;
    if(token) {
        jwt.verify(token, jwtSecret, {}, async(err, user) => {
            if(err) throw err;
            const {name, email, _id} = await User.findById(user.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.post('/bookings', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    try {
        const userData = await getUserDataFromToken(req);
        const { checkIn, checkOut, name, phone, numberOfDays, totalPrice, carMake, carModel} = req.body;
        const bookingCreated = await Booking.create({
            user: userData.id, carMake, carModel, checkIn, checkOut, name, phone, numberOfDays, totalPrice
        });
        res.json(bookingCreated);
    } catch(err) {
        res.status(422).json(err);
    }
});

app.get('/bookings', async(req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromToken(req);
    res.json( await Booking.find({user: userData.id}));
})

app.listen(4000);