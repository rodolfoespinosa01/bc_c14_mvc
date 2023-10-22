// Create an express router instance object
const router = require('express').Router();
const User = require('../models/User')

// block an auth page if user is already logged in
function isLoggedIn(req, res, next) {
  if (req.session.user_id){
    return res.redirect('/')
  }

  next ();
}

// block a route if a user is not logged in
function isAuthenticated(req, res, next) {
  if(!req.session.user_id){
    return res.redirect('/login')
  }

  next();
}

// attach user data to the request if they are logged in
async function authenticate(req, res, next) {
  const user_id = req.session.user_id;

  if(user_id){
    const user = await User.findByPk(req.session.user_id, {
      attributes: ['id', 'username']
    });

    req.user = user.get({plain: true});

  }

  next();
  
};

// landing page
router.get('/', authenticate, async (req, res) => {
  
  res.render('landing', {user: req.user});
});

// register page
router.get('/register', isLoggedIn, authenticate, (req, res) => {
  res.render('register', {
    errors: req.session.errors,
    user: req.user
  });

  req.session.errors = [];
});

// login page
router.get('/login', isLoggedIn, authenticate, (req, res) => {
  res.render('login', {
    errors: req.session.errors,
    user: req.user
  });

  req.session.errors = [];
});


router.get('/post', isAuthenticated, authenticate, (req, res) => {
  res.render('post', {
    user: req.user
  });

  req.session.errors = [];
});

router.get('/comment', isAuthenticated, authenticate, (req, res) => {
  res.render('comment', {
    user: req.user
  });

  req.session.errors = [];
});

// dashboard
router.get('/dashboard', isAuthenticated, authenticate, (req, res) => {
  res.render('dashboard', {
    errors: req.session.errors,
    user: req.user
  });
});


// Export the router
module.exports = router;