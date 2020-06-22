const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// profile displaying posts created by logged in users 
router.get('/', withAuth,(req, res) => {
    Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.body.user_id
      },
      attributes: [
        'id',
        'post_text',
        // 'title',
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
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('profile', { posts, loggedIn: true }); 
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/:id', withAuth, (req, res) => {
    Post.findOne({
    where: {
    id: req.params.id
    },
    attributes: ['id', 
                'post_text', 
                // 'title',
                'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)'), 'like_count']
            ],
    include: [
    {
        model: User,
        attributes: ['username']
    },
    {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
        model: User,
        attributes: ['username']
        }
    }
    ]
    })
    .then(dbPostData => {
      const post = dbPostData.get({ plain: true });
      res.render('profile', { post , loggedIn: true }); 
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;