const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
        userId: {
            type: String,
            require: true
        },
        desc: {
            type: String,
            max: 500
        },
        img: {
            type: String
        },
        likes: {
            type: Array,
            default: []
        },
        video: {
            type: String,
        },
        type: {
            type: String
        }
    },
    {
        timestamps: true
    }
);



const Posts = mongoose.model('POSTS' , PostsSchema);

module.exports = Posts