const Posts = require('../models/PostsSchema')
const Users = require('../models/UserSchema')


// create Post
const addPost = async(req,res) => {
    const { id } = req.params;
    const newPost = new Posts( { ...req.body , userId: id })

    try {
        const addedPost = await newPost.save();

        const allPosts = await Posts.find({img: 0})
        res.status(201).json({
            posts: allPosts.reverse()
        })
    } catch (error) {
        console.log("Error in addPost and error is : ", error)
    }
}

// update Post
const updatePost = async (req, res) => {
    const { id } = req.params;

    //if (req.userId){
        try {
            const updatedPost = await Posts.findByIdAndUpdate(id ,{ $set: req.body } , {new: true} )

            res.status(201).json({updatedPost})
            }catch (error) {
                    console.log("Error in updatePost and error is : ", error)
            }
        //}else{
            //res.status(403).json({message: "You Are Not Allowed to Update Post!!!" })
        //}

}


// Delete Post
const deletePost = async (req, res) => {
    const { id } = req.params;

    //if (req.userId){

        try {
            await Posts.findByIdAndDelete(id)

            res.status(201).json({message: "Post has been DELETED"})
        } catch (error) {
            console.log("Error in deletePost and error is : ", error)
        }
    //}else{
        //res.status(404).json({message: "You Are Not Allowed to Delete Your Movie" })
    //}

}


// Like a post
const LikePost = async(req,res) => {
    const { userId , postId } = req.params

    try {
        const post = await Posts.findById(postId) // post which is being Liked
        const user = await Users.findById(userId) // user who is going to like post

        if(!post.likes.includes(userId)){
            await post.updateOne({$push: {likes: userId}})
            await user.updateOne({$push : {likedPosts: postId}})
            likes = await post?.likes?.length

            res.json({message: 'liked' , totLikes: post?.likes?.length})
        }else{
            await post.updateOne({$pull: {likes: userId}})
            await user.updateOne({$pull : {likedPosts: postId}})
            likes = await post?.likes?.length

            res.json({message: 'Unliked' , totLikes: post?.likes?.length})
        }
    } catch (error) {
        console.log("Error in LikePost and error is : ", error)
    }
}

// get a post
const getSinglePostInfo = async (req ,res) => {
    const { id } = req.params

    try {
        const gotPost = await Posts.findById(id)

        res.status(201).json({gotPost})
    } catch (error) {
        console.log("Error in getSinglePostInfo and error is : ", error)
    }
}


// get timeline posts
const getTimeLinePosts = async(req,res) => {
    const { id } = req.params;
    try {
        const currentUser = await Users.findById(id)
        const userPosts = await Posts.find().limit(5)
        const friendsPosts = await Promise.all(
            currentUser.following.map(friendId => {
                Posts.find({userId: friendId})
            })
        )
        res.json({ AlltimelInePosts: userPosts.concat(...friendsPosts) })
    } catch (error) {
        console.log("Error in getTimeLinePosts and error is :", error)
    }
}


// get timeline posts
const getVideos = async(req,res) => {
    const { id } = req.params;

    try {
        const currentUser = await Users.findById(id)
        const userPosts = await Posts.find({type : "video"}).limit(5)

        const friendsPosts = await Promise.all(
            currentUser.following.map(friendId => {
                Posts.find({userId: friendId} , { img: 0})
            })
        )
        res.json({ AlltimelInePosts: userPosts.concat(...friendsPosts) })
    } catch (error) {
        console.log("Error in getVideos and error is :", error)
    }
}


// get User posts
const getAllUserPosts = async (req, res) => {
    const { userId  } = req.params

    try {
        const gotPost = await Posts.find({userId: userId})

        res.status(201).json(gotPost.reverse())
    } catch (error) {
        console.log("Error in getAllUserPosts and error is : ", error)
    }
}




module.exports = {
    addPost,
    updatePost,
    deletePost,
    LikePost,
    getSinglePostInfo,
    getTimeLinePosts,
    getAllUserPosts,
    getVideos
}