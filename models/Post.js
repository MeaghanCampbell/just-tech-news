// import model & datatypes from sequelize database
const { Model, DataTypes } = require('sequelize')

// connection to mysql stored in connection
const sequelize = require('../config/connection')

class Post extends Model {
    // static keyword indicates that the upvote method is one that's based on the post model
    static upvote(body, models) {
      return models.Vote.create({
        user_id: body.user_id,
        post_id: body.post_id
      }).then(() => {
        return Post.findOne({
          where: {
            id: body.post_id
          },
          attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [
              sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
              'vote_count'
            ]
          ]
        });
      });
    }
  }
  

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