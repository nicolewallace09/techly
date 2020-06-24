const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// profile displaying posts created by logged in users 
router.get('/', withAuth,(req, res) => {
    User.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'username',
        'email',
        'github',
        'linkedin',
        'bio'
      ],
    })
    .then(dbUserData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No user found' });
        return;
      }

      // serialize the data
      const user = dbUserData.get({ plain: true });

      // pass data to template
      res.render('profile', { user, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
      

module.exports = router;