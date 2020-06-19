// imports
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
// class User extends Model {}

// create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }


// // define table columns and configuration
User.init(
    {
      id: {
        // Sequelize DataTypes object 
        type: DataTypes.INTEGER,
        // this is the equivalent of SQL's `NOT NULL` option
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // there cannot be any duplicate email values in this table
        unique: true,
        // w/ allowNull is set to false, we can run our data through validators before creating the table data
        validate: {
          isEmail: true
        }
      },
      // define a password column
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // this means the password must be at least four characters long
          len: [4]
        }
      }
    },
    {
        // hash the password before saved to the db using async/await pair
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
            },
            // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
              updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
              return updatedUserData;
            }
          },
        // hooks: {
        //     // set up beforeCreate lifecycle "hook" functionality
        //     beforeCreate(userData) {
        //       return bcrypt.hash(userData.password, 10).then(newUserData => {
        //         return newUserData
        //       });
        //     }
        //   }
        
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user'
    }
  );

// export
module.exports = User;