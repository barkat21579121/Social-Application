const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const knex = require('../database/db');
require("dotenv").config();


const generateJwtToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const userLogin = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await knex('users')
            .insert({ name, password: hashedPassword, email })
            .then(() => {
                return knex.select().from('users');
            })
            .then((users) => {
                const token = generateJwtToken({ name });
                res.status(201).json({ users, token });
            });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};


const checkLoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(email, password, "<<<<<<<<<>>>>>>>>>>>>>")
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await knex('users').where({ email }).first();
        // const userName = await knex('users').where({ name }).first();

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = generateJwtToken({ email: user.email });
        res.status(200).json({ token, message: "user Login sucessFully", name: user.name });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getUser = async (req, res) => {
    try {
        const users = await knex.select().from('users');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { userLogin, getUser, checkLoginUser };
