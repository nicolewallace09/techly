const { User } = require('../models');

const userData = [
    {
        "username": "katarinat",
        "email": "kat@gmail.com",
        "password": "pass123",
        "github": "github.com/katarina",
        "linkedin": "linkedin.com/katarina",
        "bio": "UC Berkeley Coding Bootcamp student"
    },
    {
        "username": "davids",
        "email": "daivd@gmail.com",
        "password": "pass456",
        "github": "github.com/david",
        "linkedin": "linkedin.com/david",
        "bio": "UC Berkeley Coding Bootcamp student"
    },
    {
        "username": "nicolew",
        "email": "nicole@gmail.com",
        "password": "pass789",
        "github": "github.com/nicole",
        "linkedin": "linkedin.com/nicole",
        "bio": "UC Berkeley Coding Bootcamp student"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;