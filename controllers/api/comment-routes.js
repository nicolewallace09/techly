const router = require('express').Router();
const { Comment } = require('../../models');


// ----------------- GET all /api/comments
// Insomnia GET http://localhost:3001/api/comments
router.get('/', (req, res) => {
        Comment.findAll({
            attributes: { exclude: ['password'] }
        })
          .then(dbCommentData => res.json(dbCommentData))
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
      }); 
});

// ========================== get a single comment by ID
// Insomnia endpoint GET http://localhost:3001/api/comments/1
router.get('/:id', (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id' });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// ----------------- Insert to POST /api/comments
// sample Insomnia insert POST http://localhost:3001/api/comments
        // {
        //     "comment_text": "Testing comments kt June 2020",
        //     "user_id": 1,
        //     "post_id": 2
        // }


router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
      })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
});

// ----------------- DELETE /api/comments
// sample Insomnia DELETE http://localhost:3001/api/comments/2
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
        id: req.params.id
        }
    })
        .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbCommentData);
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
});

module.exports = router;