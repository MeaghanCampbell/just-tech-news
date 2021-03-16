// holds routes that will work with the User model to perform CRUD operations
// crud = create, read, update, delete
// these are RESTful api's (Representational State Transfer)
    // - a pattern that developers use when building API
    // - name your endpoints in a way that describes the data your interfacing with
    // - Use HTTP methods like Get, Post, etc to describe the action you're performing
    // - Use proper order of status codes, 400, 404, 500

// using express.js router to help keep the routes organized
const router = require('express').Router()
const { User, Post, Vote, Comment } = require('../../models')

// Get /api/users
router.get('/', (req, res) => {
    // access User model and run findAll (a model class method)
    // findAll lets us query all of the users from user table in database, like SQL query 'SELECT * FROM users'
    User.findAll({
      // protect user password
      attributes: { exculde: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// Get /api/users/1
router.get('/:id', (req, res) => {
    // identical to this sql query: 'SELECT * FROM users WHERE id = 1'
    User.findOne({
        attributes: { exculde: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
          {
            model: Post,
            attributes: ['id', 'title', 'post_url', 'created_at']
          },
          // include the Comment model here:
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            include: {
              model: Post,
              attributes: ['title']
            }
          },
          {
            model: Post,
            attributes: ['title'],
            through: Vote,
            as: 'voted_posts'
          }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' })
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// Post /api/users - for adding new data
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
});

// login route
router.post('/login', (req, res) => {
  // query user table for email entered by the user
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(dbUserData => {
    // if user email not found, send message
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' })
      return
    }
    // if user email found, next we verify user password matches with the checkPassword function created in the user modal, passing in req.body.password
    const  validPassword = dbUserData.checkPassword(req.body.password)
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect Password!' })
      return
    }
    res.json({ user: dbUserData, message: 'You are now logged in!'})
  })
})

// Put /api/users/1 - for updating existing data
router.put('/:id', (req, res) => {
    // user req.body to provide new data we want to use and update with req.params.id
    User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Delete /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;