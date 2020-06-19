const router = require('express').Router();
const { Post, User, Vote, Comment } = require("../../models");
const sequelize = require('../../config/connection');   // required for upvote

// ========================== get all posts
// Insomnia endpoint GET http://localhost:3001/api/posts
// when first testing, and till the Insert API is complete, only works after seeding the post table (see seed_notes.sql)
router.get('/', (req, res) => {
    Post.findAll({
      // attributes: ['id', 'post_url', 'title', 'created_at', 'updated_at'],
      // -- updated the `.findAll()` method's attributes 
    attributes: [   
    'id',
    'post_url',
    'title',
    'created_at',
    [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
  ],
      order: [['created_at', 'DESC']], 
      include: [
        // adding the Comment model here
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,  // including user name in the comments
            attributes: ['username']
          }
        },
        // -- user name 
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


// ========================== get a single post by ID
// Insomnia endpoint GET http://localhost:3001/api/posts/1
router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // previous
            // router.get('/:id', (req, res) => {
            //     Post.findOne({
            //         where: {
            //         id: req.params.id
            //         },
            //         attributes: ['id', 'post_url', 'title', 'created_at'],
            //         include: [
            //         {
            //             model: User,
            //             attributes: ['username']
            //         }
            //         ]
            //     })
            //         .then(dbPostData => {
            //         if (!dbPostData) {
            //             res.status(404).json({ message: 'No post found with this id' });
            //             return;
            //         }
            //         res.json(dbPostData);
            //         })
            //         .catch(err => {
            //         console.log(err);
            //         res.status(500).json(err);
            //         });
            // });

// ========================== post a single post
// Insomnia endpoint POST  http://localhost:3001/api/posts/
// test JSON in POST 
        // {
        //     "title": "Runbuddy reaches 1 million subscribers",
        //     "post_url": "https://runbuddy.com/press",
        //     "user_id": 1
        //   }
router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.body.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// -- after refactor with Post class

router.put('/upvote', (req, res) => {
    // custom static method created in models/Post.js
    Post.upvote(req.body, { Vote })
      .then(updatedPostData => res.json(updatedPostData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });

// -- previous  before adding above refactored code

            // // ========================== Update VOTING --  PUT /api/posts/upvote
            // // Insomnia endpoint PUT  http://localhost:3001/api/posts/upvote
            // // test JSON in PUT 
            //         // {
            //         //     "user_id": 1,
            //         //     "post_id": 1
            //         //   }
            // router.put('/upvote', (req, res) => {

            //     Vote.create({
            //         user_id: req.body.user_id,
            //         post_id: req.body.post_id
            //     }).then(() => {
            //         // then find the post we just voted on
            //         return Post.findOne({
            //         where: {
            //             id: req.body.post_id
            //         },
            //         attributes: [
            //             'id',
            //             'post_url',
            //             'title',
            //             'created_at',
            //             // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
            //             [
            //             sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
            //             'vote_count'
            //             ]
            //         ]
            //         })
            //         .then(dbPostData => res.json(dbPostData))
            //         .catch(err => {
            //         console.log(err);
            //         res.status(400).json(err);
            //         });
            //     });

        // previous
                // Vote.create({
                //     user_id: req.body.user_id,
                //     post_id: req.body.post_id
                //   })
                //     .then(dbPostData => res.json(dbPostData))
                //     .catch(err => res.json(err));
                // });


// ========================== Update a single post
// Insomnia endpoint PUT  http://localhost:3001/api/posts/2
// test JSON in PUT 
        // {
        //     "title": "Runbuddy reaches 2 million subscribers"
        // }
router.put('/:id', (req, res) => {
    Post.update(
        {
        title: req.body.title
        },
        {
        where: {
            id: req.params.id
        }
        }
    )
        .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
});


// ========================== Delete a single post
// Insomnia endpoint DELETE  http://localhost:3001/api/posts/2
router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // export 
  module.exports = router;