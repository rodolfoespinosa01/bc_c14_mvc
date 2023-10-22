const router = require('express').Router();

const User = require('../models/User');
const Post = require('../models/Post');

// block a route if a user is not logged in
function isAuthenticated(req, res, next) {
  if(!req.session.user_id){
    return res.redirect('/login')
  }

  next();
};

async function authenticate(req, res, next) {
  const user_id = req.session.user_id;

  if(user_id){
    const user = await User.findByPk(req.session.user_id);

    req.user = user;

  }

  next();
  
};

// Post a post
router.post('/post', isAuthenticated, authenticate, async (req, res, next) => {
try {
const post = await Post.create(req.body);

await req.user.addPost(post);

res.redirect('/');
} catch (err) {
  req.session.errors = error.errors.map(errObj => errObj.message);
  res.redirect('/post');
}
})

module.exports = router;