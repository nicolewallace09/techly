const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


// turned off by putting :test into the path
// router.get('/:id:test', withAuth,(req, res) => {
//   Promise.all ([
    
//   User.findAll({
//     where: {
//       // using params because the session user_id may not match the requested id
//       //id: req.session.user_id
//       id: req.params.id
//     },
//     attributes: [
//       'username',
//       'email',
//       'github',
//       'linkedin',
//       'bio'
//     ],
//     include: [
//       {
//         model: Post,
//         attributes: ['id', 'post_text', 'user_id', 'created_at', 'updated_at']
//       },
//       {
//         model: Comment,
//         attributes: ['id', 'comment_text', 'created_at', 'updated_at']
//       }
//     ]
//   }),
  
//   Post.findAll({
//         where: {
//           // use the ID from the session
//           user_id: req.params.user_id
//         },
//         attributes: [
//           'id',
//           'post_text',
//           'user_id',
//           // 'title',
//           'created_at',
//           [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
//         ],
//         include: [
//           {
//             model: Comment,
//             attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//             include: {
//               model: User,
//               attributes: ['username']
//             }
//           },
//           {
//             model: User,
//             attributes: ['username']
//           }
//         ]
//       }) ])
//         .then(arrData => {
//           console.log(arrData);
//           console.log(arrData);
//           //serialize data before passing to template
//           const users = arrData[0].map(user => user.get({ plain: true }));
//           const posts = arrData[1].map(post => post.get({ plain: true }));
//           res.render('single-profile/:id', { posts, users, loggedIn: true }); 
//         })
//         .catch(err => {
//           console.log(err);
//           res.status(500).json(err);
//         });
//   });


  router.get('/:id/hold', (req, res) => {
   User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Post,
            attributes: ['id', 'post_text', 'user_id', 'created_at', 'updated_at']
          },
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at', 'updated_at']
          }
        ]
        
      }) 
        .then(dbUserData => {
          console.log(dbUserData);
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            //const user = { username: username, github: github, linkedin: linkedin, email: eamil, bio: bio}
            const user = dbUserData.get({ plain: true });
            
            res.render('single-profile', { user, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// router.get('/:id', (req, res) => {
//   Post.findAll({
//        attributes: { exclude: ['password'] },
//        where: {
//          user_id: req.params.user_id
//        },
//        attributes: [
//          'id',
//          'post_text',
//          'created_at',
//          sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count'
//        ],
//        include: [
//          {
//            model: Comment,
//            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//            include: {
//              model: User,
//              attributes: ['username']
//            }
//          },
//          {
//            model: User,
//            attributes: ['username']
//          }
         
//        ]
       
       
//      }) 
//        .then(dbPostData => {
//          console.log(dbPostData);
//            if (!dbPostData) {
//                res.status(404).json({ message: 'No user found with this post'});
//                return;
//            }
//            //const user = { username: username, github: github, linkedin: linkedin, email: eamil, bio: bio}
//            const post = dbPostData.get({ plain: true });
           
//            res.render('single-profile', { user, loggedIn: true });
//        })
//        .catch(err => {
//            console.log(err);
//            res.status(500).json(err);
//        });
// });


router.get('/:id', withAuth,(req, res) => {
  Promise.all ([
    
  User.findAll({
    where: {
      // use the ID from the session
      id: req.params.id
    },
    attributes: [
      'username',
      'email',
      'github',
      'linkedin',
      'bio'
    ],
  }),
  
  Post.findAll({
        where: {
          // use the ID from the session
          user_id: req.params.id
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
              attributes: ['username','id']
            }
          },
          {
            model: User,
            attributes: ['username', 'email', 'github', 'linkedin', 'bio', 'id']
          }
        ]
      }) ])
        .then(arrData => {
          console.log('here is the data', arrData);
          //serialize data before passing to template
          const users = arrData[0].map(user => user.get({ plain: true }));
          const posts = arrData[1].map(post => post.get({ plain: true }));
          res.render('single-profile', { posts, users, loggedIn: true }); 
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
  });
        
  
  

  module.exports = router;