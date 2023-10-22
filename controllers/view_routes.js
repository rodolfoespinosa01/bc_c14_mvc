// Create an express router instance object
const router = require('express').Router();
const User =require('../models/User')



// landing page
router.get('/', async (req, res) => {
  const user = await User.findByPk(req.session.user_id)
  
  console.log(req.session.user_id);
  if(user) {
  res.render('landing', {
    user: {
      id: user.id,
      email: user.email
    }
  });
} else {
  res.render('landing');
}
});


// login page
router.get('/login', (req, res) => {
  res.render('login');
});

// register page
router.get('/register', (req, res) => {
  res.render('register');
});

// dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});


// Export the router
module.exports = router;