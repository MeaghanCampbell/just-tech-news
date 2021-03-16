// this file collects the packaged api routes to help us stay organized when we scale the app

const router = require('express').Router();

const apiRoutes = require('./api');

//connect front end
const homeRoutes = require('./home-routes.js')

// prefixes endpoints with path /api
router.use('/api', apiRoutes);

//connect front end
router.use('/', homeRoutes)

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;