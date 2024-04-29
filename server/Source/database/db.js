const knex = require('knex');
const knexFile = require('./knexfile');

const db = knex(knexFile.development);


db.raw('SELECT 1')
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

module.exports = db;
