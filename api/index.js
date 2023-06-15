const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sjdofe0irer3ncd';

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

mongoose.connect(process.env.MONGO_URL);

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

app.listen(4000);