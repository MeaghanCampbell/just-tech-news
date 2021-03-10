// import Model class and DataTypes from Sequelize
// Model class is what we create our own models from using extends keyword
// Model class lets us inherit a number of methods for creating reading updating and deleting data from database
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

// import bcrypt
const bcrypt = require('bcrypt')

// create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}

// define table columns and configuration, initialize models data
User.init(
    {
        // define id column
        id: {
            type: DataTypes.INTEGER,
            // this is the equivalent of SQL's NOT NULL option
            allowNull: false,
            // instruct that this is the Primary Key
            primaryKey: true,
            // turn on the auto increment
            autoIncrement: true
        },
        // define username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there can't be any duplicate email values
            unique: true,
            // if allowNull is false, we can run our data through validators before creating table data
            validate: {
                isEmail: true
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the password must be at least 4 chars
                len: [4]
            }
        }
    },
    {
        hooks: {
            // for creating new password "hook"
            // async keyword for asynchronous function - so you don't have to use two variables for the inputed and returned password
            // await is prefix of async function which will assign value from the response to the output
            async beforeCreate(newUserData) {
                // newuserdata object contains password and pass in a salt round of 10
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // for updating password "hook"
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
                return updatedUserData
            }
        },
        // Table configuration options
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)

module.exports = User;