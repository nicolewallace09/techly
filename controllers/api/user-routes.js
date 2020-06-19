// Express.js router
const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');

// ========================== GET all /api/users
// test route in browser:  http://localhost:3001/api/users
// router.get('/', (req, res) => {});
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    //.findAll Model class method is equal to this SQL query: SELECT * FROM users;
    User.findAll({
        attributes: { exclude: ['password'] }
      })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
    });
});


// ========================== GET /api/users/1
// router.get('/:id', (req, res) => {});
// .findOne Model class is similar to this SQL query: SELECT * FROM users WHERE id = 1
// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_url', 'created_at']
        },
              // include the Comment model here
              {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                  model: Post,
                  attributes: ['title']
                }
              },
        {
          model: Post,
          attributes: ['title'],
          through: Vote,
          as: 'voted_posts'
        }
      ]
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

//  ========================== POST /api/users -- create a new user
// router.post('/', (req, res) => {});
// equivalent to this SQL query:
        // INSERT INTO users
        //   (username, email, password)
        // VALUES
        //   ("Lernantino", "lernantino@gmail.com", "password1234");
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    // session info in routes
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
    
        res.json(dbUserData);
      });
    })
        // .then(dbUserData => res.json(dbUserData))
        // .catch(err => {
        // console.log(err);
        // res.status(500).json(err);
        // });
});

// route found at http://localhost:3001/api/users/login
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    router.post('/login', (req, res) => {
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(dbUserData => {
        if (!dbUserData) {
          res.status(400).json({ message: 'No user with that email address!' });
          return;
        }
    
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

// test in Insomnia POST http://localhost:3001/api/users
        // {
        //     "username": "",
        //     "email": "",
        //     "password": ""
        // }

// --- logout
router.post('/logout', (req, res) => {
    // User.findOne({
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });
// });


// ========================== PUT /api/users/1 -- update a user's info
// router.put('/:id', (req, res) => {});
// equiv to this SQL query: 
        // UPDATE users
        // SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234"
        // WHERE id = 1;
// PUT /api/users/1
router.put('/:id', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,      // hook set to true afer user.js model bcrypt added to hash the user password
    where: {
      id: req.params.id
    }
  })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

// ========================== DELETE /api/users/1    --- delete a user  
// router.delete('/:id', (req, res) => {});
// equiv to this SQL query:
    //   DELETE FROM users where ID = 1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
        id: req.params.id
        }
    })
        .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
    });



// export
module.exports = router;