const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const knex = require('../database/db');
const uploadDirectory = 'uploads';
const Jimp = require('jimp');
const fs = require('fs');




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
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await knex('users').where({ email }).first();
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = generateJwtToken({ email: user.email });
        res.status(200).json({ token, message: "User login successful", name: user.name });
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


function sanitizeInput(input) {
    return input;
}


const uploadPost = async (req, res) => {
    try {
        const { title, description } = req.body;


        if (!req.file) {
            return res.status(400).send('No image uploaded.');
        }


        const image = await Jimp.read(req.file.path);
        await image.resize(250, 250).writeAsync(uploadDirectory + `/resized-${req.file.filename}`);


        fs.unlinkSync(req.file.path);

        if (!title || !description) {
            return res.status(400).json({ success: false, message: "Title and description are required" });
        }


        const sanitizedTitle = sanitizeInput(title);
        const sanitizedDescription = sanitizeInput(description);

        await knex('newsFeeds').insert({
            title: sanitizedTitle,
            description: sanitizedDescription,
            imagePath: `/resized-${req.file.filename}`
        });

    } catch (error) {
        console.error('Error uploading post:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


const getUsersNews = async (req, res) => {
    try {
        const userData = await knex.select("*").from("newsFeeds");
        res.status(200).json(userData);
    } catch (error) {
        console.log("Error occurred while fetching newsFeed data:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { userLogin, getUser, checkLoginUser, uploadPost, getUsersNews };
