const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const passportAuth = require('../../utils/auth');
const passport = require('../../utils/passport');



// GET /api/users
// http://localhost:3001/api/users
router.get('/',  (req, res) => {
    // access our user model and run .findAll() method -- similar to SELECT * FROM users;
    User.findAll({
        attributes: { exclude: ['[password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
    });
});

// GET /api/users/1
// http://localhost:3001/api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Post,
            attributes: ['id', /*'title',*/ 'post_text', 'created_at']
          },
        //   // include the Comment model here:
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'created_at'],
            //include: {
              /*model: Post,
              attributes: ['title']*/
            //}
          },
          {
            model: Post,
            attributes: ['post_text'],
            through: Vote,
            as: 'voted_posts'
          }
       ]
      })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users
// http://localhost:3001/api/users
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        github: req.body.github,
        linkedin: req.body.linkedin,
        bio: req.body.bio
    })
    // store user data during session 
    .then(dbUserData => {
    req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
        });
    });
});


/*
// comment out for development
// LOGIN
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!'});
            return;
        }
        // verify user with password 
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
      
            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});
*/


router.post('/login', passport.authenticate('local'), function(req, res) {
    res.render('homepage', 
    {loggedIn: req.session.passport.user.id});
});


/*
// LOGOUT  
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
*/


// Logout that works with Passport
router.get('/logout', (req, res) => {

    req.session.destroy((err) => {

        if (req.session.passport.user.id != null) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    });
});


// PUT /api/users/1 - similar to UPDATE 
router.put('/:id', /*withAuth,*/ (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
    });

});

// DELETE /api/users/1
router.delete('/:id', /*withAuth,*/ (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;



