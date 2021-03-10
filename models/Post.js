// import model & datatypes from sequelize database
const { Model, DataTypes } = require('sequelize')

// connection to mysql stored in connection
const sequelize = require('../config/connection')

// create post model
class Post extends Model {}

// create fields and columns for post model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this property verifies that it is a link
                isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            // uses references property to establish a relationship to user model
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
)

module.exports = Post;