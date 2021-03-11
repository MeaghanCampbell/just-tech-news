// collect & export User model data

const User = require('./User')
const Post = require('./Post')

// create associations - user can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
})

// This constraint means that a post can belong to one user, but not many users
// User_id is from the post model where we established the relationship
Post.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Post }