const router = require('express').Router();
const User = require('../models/User.js');

// Post request that retrieves the form data username, password - and creates a new user in the database using our user model.
// The route will respond with a message of "User added successfully"

router.post('/register', async (req, res) => {
 
  try {
    const user = await User.create(req.body);


    req.session.user_id = user.id;
    
    res.redirect('/');
  } catch (error) {
    //Set our session errors array, to an array of just Sequelize error message strings
    req.session.errors = error.errors.map(errorObj => errorObj.message);
    res.redirect('/register')

  }
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  });

  // User not found with the username provided
  if(!user) {
    req.session.errors = ['No user found with that username'];

    return res.redirect('/login');
  }

  const passIsValid = await user.validatePass(req.body.password);

  //  Check if pw is invalid
  if(!passIsValid) {
    req.session.errors = ['Password is incorrerect.'];

    return res.redirect('/login');
  }

  // Log the user in
  req.session.user_id = user.id;

  res.redirect('/')
});

router.get('/logout', (req, res) => {
  req.session.destroy();

  res.redirect('/');
})

module.exports = router;
