// holds routes that will work with the User model to perform CRUD operations
// crud = create, read, update, delete
// these are RESTful api's (Representational State Transfer)
    // - a pattern that developers use when building API
    // - name your endpoints in a way that describes the data your interfacing with
    // - Use HTTP methods like Get, Post, etc to describe the action you're performing
    // - Use proper order of status codes, 400, 404, 500

// using express.js router to help keep the routes organized
const router = require('express').Router()
const { User } = require('../../models')

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
        }
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

// Put /api/users/1 - for updating existing data
router.put('/:id', (req, res) => {
    // user req.body to provide new data we want to use and update with req.params.id
    User.update(req.body, {
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