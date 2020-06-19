// import the Sequelize constructor from the library
const Sequelize = require('sequelize');
// dotenv 
require('dotenv').config();

// -- create connection to the mysql db -- (through the process.env variable, used by Heroku's JawsDB)
    const sequelize = process.env.JAWSDB_URL
      ? new Sequelize(process.env.JAWSDB_URL)
        : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW,
          { dialect: "mysql" } )

// export
module.exports = sequelize;