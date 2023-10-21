// Create an express router instance object
const router = require('express').Router();



// landing page
router.get('/', (req, res) => {
  res.render('landing', {
    name: 'Rodolfo',
    fruits: ['maracuya', 'guineo verde', 'mango', 'piña'],
    data: [
      {
        name: 'Bob',
        age: 99
    },
    {
      name: 'Rodolfo',
      age: 32
    }   
  ]
  });
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