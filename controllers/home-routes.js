const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')

// routes that render views from handleboars - renders homepage
router.get('/', (req, res) => {
  console.log(req.session);
    // mimics what we will get from sequelize
    Post.findAll({
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
    .then(dbPostData => {
    // pass a single post object into the homepage template
    // specifices which template we want to use (homepage.handlebars)
    // handlebars feeds content from the homepage into main.handlebars template, and responds with a complete html file

    // loop over each sequelize object info a serialized version of itself, saving new results in posts array
      const posts = dbPostData.map(post => post.get({ plain: true }))
      // pass the object instead of array to avoid future struggles
      res.render('homepage', { posts });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// render login page - this page doesn't need varibales so we don't need a second argument like above
router.get('/login', (req, res) => {
  // check for a session and redirect to homepage if one exists
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


module.exports = router