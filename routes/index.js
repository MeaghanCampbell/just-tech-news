// this file collects the packaged api routes to help us stay organized when we scale the app

const router = require('express').Router();

const apiRoutes = require('./api');

// prefixes endpoints with path /api
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;