// collect & export User model data

const User = require('./User')
const Post = require('./Post')
const Vote = require('./Vote')
const Comment = require('./Comment')

// create associations - user can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
})

// This constraint means that a post can belong to one user, but not many users
// User_id is from the post model where we established the relationship
Post.belongsTo(User, {
    foreignKey: 'user_id'
})

// allow user to query post modals in the context of a vote
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
})

// allow post to query user modals in context of vote
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
})

// connect vote and user
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});
  
// connect vote and post
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});
  
// connect user and vote
User.hasMany(Vote, {
    foreignKey: 'user_id'
});
  
// connect post and vote
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});
  
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
  
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment }