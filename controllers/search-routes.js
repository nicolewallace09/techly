const sequelize = require('../config/connection');
const { Search, Post, User, Comment } = require('../models');
const router = require('express').Router();

// GET all posts from search
router.get('/search', (req, res) => {
    console.log(req.session);
    Search.findAll({
      model: Post,
        attributes: [
          'id',
          // 'post_text',
          [sequelize.literal('(SELECT * FROM post WHERE post_text LIKE ?'), 'post_text'],
          // 'title',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        order: [['created_at', 'DESC']],
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
        .then(dbSearchData => {
          // pass a single post object into the homepage template
          const posts = dbSearchData.map(post => post.get({ plain: true }));
          res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router; 





