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

// Edit a post
router.get('/editPost/:postId', isAuthenticated, authenticate, async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id; // Get the current user's ID

  // Find the specific post that matches the provided postId and belongs to the current user
  const post = await Post.findOne({
    where: { id: postId, author_id: userId },
    include: {
      model: User,
      as: 'author'
    }
  });

  if (post) {
    res.render('editPost', {
      user: req.user,
      post: post.get({ plain: true })
    });
  } else {
    // Handle the case where the post doesn't exist or doesn't belong to the user
    res.status(404).send("Post not found or unauthorized to edit.");
  }
});

// Update a post (POST)
router.post('/updatePost/:postId', isAuthenticated, authenticate, async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;
  const { title, content } = req.body;

  // Verify that the post belongs to the user before updating
  const post = await Post.findOne({
    where: { id: postId, author_id: userId }
  });

  if (post) {
    // Update the post
    await post.update({ title, content });

    // Redirect to a different page or send a response as needed
    res.redirect('/dashboard');
  } else {
    res.status(404).send("Post not found or unauthorized to edit.");
  }
});

router.delete('/deletePost/:postId', isAuthenticated, authenticate, async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;

  // Verify that the post belongs to the user before deleting
  const post = await Post.findOne({
    where: { id: postId, author_id: userId }
  });

  if (post) {
    // Delete the post
    await post.destroy();

    // Redirect to a different page or send a response as needed
    res.redirect('/dashboard');
  } else {
    res.status(404).send("Post not found or unauthorized to delete.");
  }
});





module.exports = router;