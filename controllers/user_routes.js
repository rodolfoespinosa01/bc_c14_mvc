const router = require('express').Router();

const User = require('../models/User.js')

// Post request that retrieves the form data email, password - and creates a new user in the database using our user model.

// The route will respond with a message of "User added successfully"

router.post('/register', async (req, res) => {
  const data = req.body;

  User.create(data)
  .then(newUser => {
    res.json({
      message: 'User added successfully',
      user: newUser
    })
  })
});

module.exports = router;