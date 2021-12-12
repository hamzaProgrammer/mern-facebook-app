import React , {useState ,useEffect} from 'react'
import { Grid  , Box , Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoadingButton from '@mui/lab/LoadingButton';
import { follow , checkFollowed , getFollowers } from '../../server_api/Api'

const Follower = ({loggedId , userId}) => {
    const [isFollowed, setisFollowed] = useState(false)
    const [ singlePost , setSinglePost ] = useState({})

    // for follwoing or unFollowing
     const handleClick = async () => {
       await follow(loggedId, userId);
       setisFollowed(!isFollowed);
     }


     // for fetching followers
   useEffect(() => {
     const getPosts = async () => {
          const {data} = await getFollowers(userId)
          setSinglePost(data.gotFollowers[0])
     }
     getPosts();
   }, [userId])


    // for checking if followed or not
    useEffect(() => {
        const chcekisFollowed = async () => {
          const { data } = await checkFollowed(loggedId , userId);
            if(data?.message === "Followed"){
                setisFollowed(true)
            }else{
              setisFollowed(false)
            }
        }
      chcekisFollowed();
    }, [loggedId, userId])
    return (
        <>
        {
            singlePost && (
                <Grid container style={{marginLeft: '10px' , paddingTop: '10px'}}>
                <Grid item xs={2}>
                    <img
                        src = { singlePost?.profilePic || "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }
                        alt="LoggedId Cover"
                        width="80%"
                        height="70px"
                        style={{borderRadius: '50%'}}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Box style={{display: 'flex' , flexDirection:'column' , paddingLeft: '20px'}}>
                        <Typography style={{fontSize: '22px', fontWeight: 700 , marginBottom: '10px'}}>{singlePost?.username}</Typography>
                        <Typography style={{fontSize: '12px', fontWeight: 700 , marginBottom: '10px' , color: '#2f3542'}}>{singlePost?.email}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={1}>
                    {
                            isFollowed ? (
                            <LoadingButton
                                onClick={handleClick}
                                endIcon={<CheckCircleIcon />}
                                variant="contained"
                                style={{width: '120px' , backgroundColor: '#0984e3' , marginLeft: '50px' , marginBottom: '50px'}}
                            >
                                Following
                            </LoadingButton>
                        ) : (
                            <LoadingButton
                                onClick={handleClick}
                                endIcon={<AddIcon />}
                                variant="contained"
                                style={{width: '120px' , backgroundColor: '#0984e3' , marginLeft: '50px' , marginBottom: '50px'}}
                            >
                                Follow
                            </LoadingButton>
                        )
                    }
                </Grid>
            </Grid>
            )
        }
        </>
    )
}

export default Follower
