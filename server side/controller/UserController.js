const Users = require('../models/UserSchema')
 const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken');


// Updating User Info
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const {password  } = req.body

    //if (req.userId){
        try {
            if(password){
                req.body.password = await bcrypt.hash(password, 12); // hashing password
            }

            const updatedUser = await Users.findByIdAndUpdate(userId ,{ $set: req.body } , {new: true} )

            res.status(201).json({updatedUser , message: ''})
        } catch (error) {
            res.status(201).json({ message: '!!! Opps An Error Occured !!!'})
            console.log("Error in updateUser and error is : ", error)
        }
    //}else{
        //res.status(403).json({message: "You Are Not Allowed to Update Admin!!!" })
    //}

} 

const getAll = async (req,res) => {
    res.send("This is New Users page")
}


// Deleteing Movie
const deleteUser = async (req, res) => {
    const { id } = req.params;

    //if (req.userId){

        try {
            await Users.findByIdAndDelete(id)

            res.status(201).json({message: "User has been DELETED"})
        } catch (error) {
            console.log("Error in deleteUser and error is : ", error)
        }
    //}else{
        //res.status(404).json({message: "You Are Not Allowed to Delete Your Admin" })
    //}

}


// Follow Users
const followUser = async (req,res) => {
    const { loggedId , userId } = req.params
    //if(req.userId){
        try {
            const user = await Users.findById(userId);
            const SenderUser = await Users.findById(loggedId)

            if(!user.followers.includes(loggedId)){
                await user.updateOne({$push: { followers: loggedId}})
                await SenderUser.updateOne({$push: {following : userId}})

                res.json({message: "You Followed This Account"})
            }else{
                await user.updateOne({$pull: { followers: loggedId}})
                await SenderUser.updateOne({$pull: {following : userId}})

                res.json({message: "You UnFollowed This Account"})
            }
        } catch (error) {
            console.log("Error in followUser and error is : ", error)
        }
    //}else{
        //res.json("*** You are not Authenticated ***")
    //}
}


// for checking if following or not
const isFollowing = async (req,res) => {
    const { loggedId , userId } = req.params
    //if(req.userId){
        try {
            const user = await Users.findById(userId);

            if(!user.followers.includes(loggedId)){
                res.json({message: "Not Follwed"})
            }else{
                res.json({message: "Followed"})
            }
        } catch (error) {
            console.log("Error in isFollowing and error is : ", error)
        }
    //}else{
        //res.json("*** You are not Authenticated ***")
    //}
}


// Getting Single  User Account
const getSingleUserInfo = async (req ,res) => {
    const { id } = req.params;

    //if (req.userId === id || req.isAdmin){

        try {
            const gotUser = await Users.find({_id: id} , {password: 0 })

            res.status(201).json({gotUser})
        } catch (error) {
            console.log("Error in getSingleUserInfo and error is : ", error)
        }
    //}else{
        //res.status(403).json({message: "You Are Not Allowed to Delete Your Account" })
    //}

}

// Getting Single  User Account
const getFollowers = async (req ,res) => {
    const { loggedId } = req.params;

    //if (req.userId === id || req.isAdmin){

        try {
            const gotFollowers = await Users.find({_id: loggedId} , {password: 0  })

            res.status(201).json({gotFollowers})
        } catch (error) {
            console.log("Error in getFollowers and error is : ", error)
        }
    //}else{
        //res.status(403).json({message: "You Are Not Allowed to Delete Your Account" })
    //}

}


// Getting Single  User Friends
const getUserFreinds = async (req, res) => {
    const { userId } = req.params;
    //if (req.userId === id || req.isAdmin){

        try {
            const gotFreinds = await Users.find({_id: userId} , {followers: 1 , _id: 0})

            res.status(201).json({gotFreinds})
        } catch (error) {
            console.log("Error in getUserFreinds and error is : ", error)
        }
    //}else{
        //res.status(403).json({message: "You Are Not Allowed to Delete Your Account" })
    //}

}

// for showoing liked posts on home page
const getLikedPost = async (req,res) => {
    const { userId , postId } = req.params

    try {
        const user = await Users.findById(userId)
        if(user){
            if(user.likedPosts.includes(postId)) {
                res.json({message: 'Founded'})
            }else{
                res.json({message: ''})
            }
        }
    }catch (error) {
        console.log("Error in getLikedPost and error is : ", error)
    }
}

// Savig a post
const SavePost = async(req,res) => {
    const { userId , postId } = req.params

    try {
        const user = await Users.findById(userId) // user who is going to like post

        if(!user.savedPosts.includes(postId)){
            await user.updateOne({$push : {savedPosts: postId}})

            res.json({message: 'Saved'})
        }else{
            await user.updateOne({$pull : {savedPosts: postId}})

            res.json({message: 'UnSaved' })
        }
    } catch (error) {
        console.log("Error in SavePost and error is : ", error)
    }
}


// for showoing liked posts on home page
const getSavedPost = async (req,res) => {
    const { userId , postId } = req.params

    try {
        const user = await Users.findById(userId)
        if(user){
            if(user.savedPosts.includes(postId)) {
                res.json({message: 'Founded'})
            }else{
                res.json({message: ''})
            }
        }
    }catch (error) {
        console.log("Error in getSavedPost and error is : ", error)
    }
}


// Getting Single  User Account
const getNewUsers = async (req, res) => {
    const { id } = req.params;
    var friendsArr = []
    var FinalArr = []
    var NewFinalArr = []
    var myFollowers = []
    var myFollowings = []
    //if (req.userId === id || req.isAdmin){

        try {
            const gotFreinds = await Users.find({_id: id})
            myFollowers = gotFreinds[0]?.followers
            myFollowings = gotFreinds[0]?.following

            const folOne = gotFreinds[0]?.following[0]
            const folTwo = gotFreinds[0]?.following[1]

            const folThree = gotFreinds[0]?.followers[0]
            const folFour = gotFreinds[0]?.followers[1]

            const followerOne = await Users.find({_id: folOne})
            const followerTwo = await Users.find({_id: folTwo})

            const followerThree = await Users.find({_id: folThree})
            const followerFour = await Users.find({_id: folFour})

            friendsArr.push(followerOne[0]?.followers[0] , followerOne[0]?.followers[1] , followerTwo[0]?.followers[0] , followerTwo[0]?.followers[1] , followerThree[0]?.followers[0] , followerThree[0]?.followers[1] , followerFour[0]?.followers[0] , followerFour[0]?.followers[1]  , followerOne[0]?.following[0] , followerOne[0]?.following[1] ,  followerTwo[0]?.following[0] , followerTwo[0]?.following[1]  , followerFour[0]?.following[0] , followerFour[0]?.following[1]   )


            friendsArr.map((item) => {
                const check = myFollowers.includes(item)
                if (!check) {
                    FinalArr.push(item)
                }
            })

            friendsArr.map((item) => {
                const check = myFollowings.includes(item)
                if (!check) {
                    FinalArr.push(item)
                }
            })

            // final array
            FinalArr.map((item) => {
                if (item !== undefined && item !== id) {
                    NewFinalArr.push(item)
                }
            })

            const AllUsers = await Users.find({ _id: { $ne: id } }).limit(5)
            AllUsers.reverse()

            res.status(201).json({allFriends : NewFinalArr.concat(...AllUsers) })
        } catch (error) {
            console.log("Error in getNewUsers and error is : ", error)
        }
    //}else{
        //res.status(403).json({message: "You Are Not Allowed to Delete Your Account" })
    //}

}



// Getting Single  User Account
const getAllUser = async (req, res) => {
    const { userId } = req.params;
    var FinalArr = []
    var myFollowers = []
    var myFollowings = []
    //if (req.userId === id || req.isAdmin){

        try {
            const gotFreinds = await Users.find({_id: userId})
            myFollowers = gotFreinds[0]?.followers
            myFollowings = gotFreinds[0]?.following

            const allUsers = await Users.find({ _id: { $ne: userId } }).limit(20)

            allUsers.map((item) => {
                const check = myFollowings.includes(item?._id)
                if (!check) {
                    FinalArr.push(item)
                }
            })

            allUsers.reverse()

            res.status(201).json({allFriends : FinalArr })
        } catch (error) {
            console.log("Error in getAllUser and error is : ", error)
        }
    //}else{
        //res.status(403).json({message: "You Are Not Allowed to Delete Your Account" })
    //}

}


module.exports = {
    getAll,
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
}