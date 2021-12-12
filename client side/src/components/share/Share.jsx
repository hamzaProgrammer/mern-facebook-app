import React , { useState } from 'react'
import { Box ,FormControl  , TextField , IconButton , Typography , Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PanoramaIcon from '@mui/icons-material/Panorama';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import {storage}  from '../../Firebase'
import { uploadPost } from '../../server_api/Api'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection:'column',
        padding: '20px',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
    },
    firstPort: {
        display: 'flex',
    },
    Userimg: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginBottom: '20px'
    },
    postIcons : {
        display: 'flex',
        marginTop: '15px',
    },
    shareBtn: {
        color: '#fff',
        backgroundColor: '#0984e3',
        textTransform: 'none',
        fontSize: '15px',
        fontWeight: 500,
        borderRadius: '10px',
    }
}))
const Share = ({setPosts , user}) => {
    const classes = useStyles();

    const [ postData , setPostData ] = useState({
        desc: '',
        img: '',
        type: 'img'
    })
    const [ progress , setProgress ] = useState(0)

    // uploading images to firebase
    const upload =  (image) => {
        const fileName = new Date().getTime() + "facebookUser"
        const uploadedTask = storage.ref(`/facebook_Post_Images/${fileName}`).put(image)

        uploadedTask.on
        ("state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(parseInt(progress))
                console.log(`file is ${progress} % done`)
        },
            (err) => {console.log(err)},
            () => {
                uploadedTask.snapshot.ref.getDownloadURL().then((url) => {
                    setPostData((prev) => { return { ...prev , img: url } })
                    setPostData((prev) => { return { ...prev , type: 'img' } })
                })
            }
        )
    }

    // uploading post
    const sharePost = async() => {
        if(!user?._id){
            alert("User id not Found ...")
        }else{
            try {
                const { data } = await uploadPost(user?._id , postData)
                setPostData({
                    desc: '',
                    img: ''
                })
                setPosts(data.posts)
            } catch (error) {
                console.log("Erroe while uploading new post and error is : ", error)
            }
        }
    }

    return (
        <>
            <Box className={classes.root} >
                <Box className={classes.firstPort} >
                    <img
                        src={ user?.profilePic ||  "https://img.favpng.com/17/3/18/computer-icons-user-profile-male-png-favpng-ZmC9dDrp9x27KFnnge0jKWKBs.jpg" }
                        alt="User Cover"
                        className={classes.Userimg}
                    />
                    <FormControl sx={{ m: 1 }} variant="standard" style={{maxWidth: '520px'}} >
                        <TextField
                            id="standard-password-input"
                            label="What is in your mind ..."
                            autoComplete="current-password"
                            variant="standard"
                            name="desc"
                            value={postData.desc}
                            style={{width: '500px'}}
                            onChange={(e) => setPostData({ ...postData , [e.target.name] : e.target.value })}
                        />
                    </FormControl>
                </Box>
                {
                        postData.img && (
                            <img
                                src={postData.img}
                                alt="user Cover"
                                width='100%'
                                height="230px"
                                style={{borderRadius: '20px' , padding: '10px' }}
                            />
                        )
                    }
                <Box className={classes.postIcons} >
                    <IconButton
                        size="small"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        style={{ marginLeft: '-0px' }}
                        >
                            <PanoramaIcon  style={{color: '#ff7675'}}   />
                        <label for="exampleFormControlFile1" style={{fontSize: '14px' , fontWeight: 500 , marginLeft: '5px' , color: '#2d3436'}} >Photos or Videos</label>
                        <input type="file" class="form-control-file" id="exampleFormControlFile1" style={{display:'none'}}  
                            onChange={(e) => upload(e.target.files[0]) }
                        />
                    </IconButton>
                    <IconButton
                        size="small"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        style={{ marginLeft: '-0px' }}
                        >
                            <LocalOfferIcon  style={{color: '#6c5ce7'}} />
                        <Typography style={{fontSize: '14px' , fontWeight: 500 , marginLeft: '5px' , color: '#2d3436'}} >Tag</Typography>
                    </IconButton>
                    <IconButton
                        size="small"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        style={{ marginLeft: '-0px' }}
                        >
                            <RoomIcon  style={{color: '#00b894'}} />
                        <Typography style={{fontSize: '14px' , fontWeight: 500 , marginLeft: '5px' , color: '#2d3436'}} >Location</Typography>
                    </IconButton>
                    <IconButton
                        size="small"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        style={{ marginLeft: '-0px' , marginRight: '110px' }}
                        >
                            <EmojiEmotionsIcon  style={{color: '#fdcb6e'}} />
                        <Typography style={{fontSize: '14px' , fontWeight: 500 , marginLeft: '5px' , color: '#2d3436'}} >Feeling</Typography>
                    </IconButton>

                    {
                         ( progress === 0  || progress === 100 ) ? (
                            <Button variant="contained" className={classes.shareBtn} onClick={sharePost} >Share</Button>
                        ) : (
                            <Typography variant="body2" style={{color: 'red'}}>{progress}% Uploaded</Typography>
                        )
                    }

                </Box>
            </Box>
        </>
    )
}

export default Share
