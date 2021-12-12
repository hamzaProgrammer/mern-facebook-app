const express = require('express');
const router = express.Router();
const { addPost,
        updatePost,
        deletePost,
        LikePost,
        getSinglePostInfo,
        getTimeLinePosts,
        getAllUserPosts,
        getVideos
    } = require('../controller/PostsController')

// create Post
router.post('/posts/addNew/post/:id', addPost)

// update Post
router.put('/posts/:id', updatePost)

// Delete Post
router.delete('/posts/:id', deletePost)

// Like a post
router.put('/posts/like/:userId/:postId', LikePost)


// get timeline posts
router.get('/posts/timeline/:id', getTimeLinePosts)

// get Post
router.get('/posts/FindPost/:id', getSinglePostInfo)



// get timeline posts
router.get('/posts/videos/:id', getVideos)

// get all user post
router.get('/posts/user/:userId', getAllUserPosts)

// get a post
router.get('/posts/:id', getSinglePostInfo)


module.exports = router;