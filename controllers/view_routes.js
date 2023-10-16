// Create an express router instance object
const router = require('express').Router();
const path = require('path');

// Add one test GET route at root
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/landing.html'));
});

// GET route Show the register form

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/register-form.html'));
})


// Export the router
module.exports = router;