const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
        username : {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true
        },
        email: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true
        },
        password: {
            type: String,
            require: true,
            min: 6,
        },
        profilePic: {
            type: String,
            default: ''
        },
        coverPic: {
            type: String,
            default: ''
        },
        followers: {
            type: Array,
            default: []
        },
        following: {
            type: Array,
            default: []
        },
        isAdmin: {
            type: Boolean,
            deafault: false
        },
        city: {
            type: String,
            max: 50
        },
        from: {
            type: String,
            max: 50
        },
        relationship: {
            type: String,
        },
        likedPosts: {
            type: Array,
            default: []
        },
        status: {
            type: String,
            default: ''
        },
        savedPosts : {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    }
);



const Users = mongoose.model('USERS' , UserSchema);

module.exports = Users