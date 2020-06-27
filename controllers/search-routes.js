const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const { Op } = require('sequelize');

// const withAuth = require('../utils/auth');   // -- search doesn't require login.

// -- initial test route
// GET http://localhost:3001/search   // ok, works.
    // router.get('/', (req, res) => {
    //     res.render('search');
    // });

// // -- get all posts; GET "/api/posts"
// router.get('/', (req, res) => {
//     Promise.all ([

//       Post.findAll({
//         // where: {
//         //   post_text: req.params.post_text
//         // },
//           attributes: [
//               'id', 
//               'post_text', 
//               // [sequelize.literal('(SELECT * FROM post WHERE post_text LIKE `%?%`)'), 'post_text'],
//               'created_at'
//           ],
//       })   
//     ])  
//     .then(arrSearchData => {
//       if (!arrSearchData) {
//         res.status(404).json({ message: 'No post found with this search criteria' });
//         return;
//       }
//       const posts = arrSearchData[1].map(post => post.get({ plain: true }));
//       res.render('search', { posts }); 
//       // res.render('search');
//       // res.json(dbSearchData);
//       })
//         .catch(err => {
//           console.log(err);
//           res.status(500).json(err);
//           });
//  });


// // // -- get all posts; GET "/api/posts"
router.get('/:post_text', (req, res) => {
    Post.findOne({
      limit: 10,
      where: {
        post_text: {
          [Op.like]: '%' + req.params.post_text + '%'
        }
      },
        attributes: [
            'id', 
            'post_text',
            // [sequelize.literal('(SELECT * FROM post WHERE post_text LIKE `Heroku`)'), 'post_text'],
            'created_at'
        ],        
      })    
      .then(dbSearchData => {
          console.log('search data', dbSearchData);
        if (!dbSearchData) {
          res.status(404).json({ message: 'No post found with this search criteria' });
          return;
        }
        // res.json(dbSearchData);
        const posts = dbSearchData;
        res.render('search', { posts }); 
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// // // -- get all posts; GET "/api/posts"
// router.get('/', (req, res) => {
//   Promise.all ([

//     Post.findAll({
//       // where: {
//       //   post_text: req.session.post_text
//       // },
//         attributes: [
//             'id', 
//             // 'title', 
//             // 'post_text', 
//             // [sequelize.literal('(SELECT * FROM post WHERE post_text LIKE `%Heroku%`)'), 'post_text'],
//             [sequelize.literal('(SELECT * FROM post WHERE)'), 'post_text'],
//             'created_at',
//             // 'updated_at',
//             [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
//         ],
//         order: [['created_at', 'DESC']],
//         include: [
//             {
//                 model: User,
//                 attributes: ['id','username', 'email', 'linkedin', 'github', 'bio']
//             },
//             {
//                 model: Comment,
//                 attributes: [
//                     'id',
//                     'comment_text',
//                     'post_id',
//                     'user_id',
//                     'created_at'
//                 ]
//             }
//         ]
//       })
//     ])
    
//     .then(searchResult => {
//       res.json(searchResult);
//     });

//       // .then(arrPostData => {
//       //   console.log(arrPostData);
//       //   const posts = arrPostData[1].map(post => post.get({ plain: true }));
//       //   res.render('search', { posts }); 
//       // })
//       // .catch(err => {
//       //   console.log(err);
//       //   res.status(500).json(err);
//       // })


// });


module.exports = router; 




