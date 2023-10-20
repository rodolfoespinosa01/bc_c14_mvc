// Create an express router instance object
const router = require('express').Router();
const path = require('path')


// landing page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/landing.html'));
});


// login page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// register page
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/register.html'));
});

// dashboard
router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});


// Export the router
module.exports = router;