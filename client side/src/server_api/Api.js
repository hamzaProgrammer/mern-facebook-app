const axios = require('axios');

const API = axios.create({
    baseURL: 'http://localhost:5000'
});

// this is for using local storage in headers, otherwise it will not work
/* API.interceptors.request.use((req) => {
    if (localStorage.getItem('Profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`;
    }

    return req;

}); */


// Posts Requests
const getTimeLinePostsData = (id) => API.get(`/posts/timeline/${id}`)
const getUserPosts = (userId) => API.get(`/posts/user/${userId}`)
const uploadPost = (id,data ) => API.post(`/posts/addNew/post/${id}`, data);
const like = (userId, postId) => API.put(`/posts/like/${userId}/${postId}`);
const deletePosts = (id) => API.delete(`/posts/${id}`)
const getVideos = (id) => API.get(`/posts/videos/${id}`)
const getMyPost = (postId) => API.get(`/posts/FindPost/${postId}`)




// users Requests
const getUserName = (id) => API.get(`/users/${id}`)
const uploadUser = (data) => API.post(`/register`, data);
const SignInUser = (data) => API.post(`/signin`, data);
const getUserFriendList = (userId) => API.get(`/users/userFriends/${userId}`)
const follow = (loggedId , userId) => API.get(`/users/follow/${loggedId}/${userId}`);
const checkFollowed = (loggedId, userId) => API.get(`/users/checkFollow/${loggedId}/${userId}`);
const updateUser = (userId, data) => API.put(`/users/update/${userId}`, data);
const getFollowers = (loggedId) => API.get(`/users/followers/${loggedId}`);
const getLiked = (userId, postId) => API.get(`/user/findPost/${userId}/${postId}`)
const getSaved = (userId, postId) => API.get(`/user/findSaved/${userId}/${postId}`)
const Save = (userId, postId) => API.put(`/users/save/${userId}/${postId}`);
const getNew = (id) => API.get(`/users/newUsers/${id}`) // for getting new Users
const getUsers = (loggedId) => API.get(`/users/findFriends/${loggedId}`);


module.exports = {
    getTimeLinePostsData,
    getUserName,
    getUserPosts,
    uploadUser,
    SignInUser,
    uploadPost,
    like,
    getLiked,
    getUserFriendList,
    deletePosts,
    follow,
    checkFollowed,
    updateUser,
    getVideos,
    getFollowers,
    getMyPost,
    Save,
    getSaved,
    getNew,
    getUsers
}