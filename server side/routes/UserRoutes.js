const express = require('express');
const router = express.Router();
const { getAll,
        updateUser,
        deleteUser,
        getSingleUserInfo,
        getLikedPost,
        getUserFreinds,
        followUser,
        isFollowing,
        getFollowers,
        getSavedPost,
        SavePost,
        getNewUsers,
        getAllUser
    } = require('../controller/UserController')


// Get Single Freinds
router.get('/users/userFriends/:userId', getUserFreinds)


// Get All Users
router.get('/users/findFriends/:userId', getAllUser)

//router.get('/users', getUsers);
router.get('/users', getAll)

//router.get('/users', getUsers);
router.get('/users/newUsers/:id', getNewUsers)

//getting liked Posts
router.get('/user/findPost/:userId/:postId', getLikedPost)

// Save a post
router.put('/users/save/:userId/:postId', SavePost)

//getting saved Posts
router.get('/user/findSaved/:userId/:postId', getSavedPost)

// Delete user
router.delete('/users/:id', deleteUser)

// Update User
router.put('/users/update/:userId', updateUser)

// Get Single User
router.get('/users/:id' , getSingleUserInfo)


// Get Single User
router.get('/users/:id', getSingleUserInfo)

// Follow User
router.get('/users/follow/:loggedId/:userId', followUser)

// Getting Followers
router.get('/users/followers/:loggedId', getFollowers)


// Checking if follwoing or not
router.get('/users/checkFollow/:loggedId/:userId', isFollowing)



module.exports = router