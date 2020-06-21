const router = require('express').Router();
const { Search, Post, User, Vote, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// get a single post by ID; GET /api/search/1
router.get('/:id', (req,res)=>{
  Search.findOne({
      where: {
          id: req.params.id
      },
      model: Post,
      attributes: [
          'id', 
          'title', 
          'post_text', 
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM post WHERE post.text LIKE post.id)')]
      ],
      include: [
          {
              model: User,
              attributes: ['username']

          },
          {
              model: Comment,
              attributes: [
                  'id',
                  'comment_text',
                  'post_id',
                  'user_id',
                  'created_at'
              ]
          },
          {
            model: Vote,
            attributes: ['username']

          }
      ]
      
  })
  .then(dbSearchData => {
      if(!dbSearchData){
          res.status(404).json({ message: 'No post found with this id'});
          return;
      }
      res.json(dbSearchData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// // get a single post by ID; GET /api/post/1
// router.get('/:id', (req,res)=>{
//     Post.findOne({
//         where: {
//             id: req.params.id
//         },
//         attributes: [
//             'id', 
//             'title', 
//             'post_text', 
//             'created_at',
//             [
//               sequelize.literal('(SELECT COUNT(*) FROM post WHERE post.text LIKE ?)')
//             ]
//             // ,
//             // [
//             //   sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
//             // 'vote_count'
//             // ]
//         ],
//         include: [
//             {
//                 model: User,
//                 attributes: ['username']

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
//             },
//             // include: [
//               {
//                   model: Vote,
//                   attributes: ['username']
  
//               }
//         ]
        
//     })
//     .then(dbPostData => {
//         if(!dbSearchData){
//             res.status(404).json({ message: 'No post found with this search criteria'});
//             return;
//         }
//         res.json(dbPostData);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });


module.exports = router;