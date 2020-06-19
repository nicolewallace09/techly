// import
const router = require('express').Router();
const apiRoutes = require('./api');
// define URL endpoint, as /api/... collecting the packaged group of API endpoints and prefixing them with the path /api.
router.use('/api', apiRoutes);

// front-end
const homeRoutes = require('./home-routes.js');
router.use('/', homeRoutes);

// back-end
  // produces error if endpoint does not exist
router.use((req, res) => {
  res.status(404).end();
});

// export
module.exports = router;