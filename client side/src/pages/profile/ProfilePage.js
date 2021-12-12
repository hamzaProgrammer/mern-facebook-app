import React , {useEffect , useState} from 'react';
import { Grid  , Box , Typography } from '@mui/material'
import Sidebar from '../../components/sidebar/Sidebar'
import ProfileSec from '../../components/profileComp/ProfImage'
import ShareSection from '../../components/share/Share'
import UsersPosts from '../../components/profileComp/Posts'
import UserInfo from '../../components/profileComp/UserInfo'
import MutualFreinds from '../../components/profileComp/Freinds'
import Navbar from '../../components/navbar/Navbar'
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoadingButton from '@mui/lab/LoadingButton';
import { getUserPosts , getUserName , getUserFriendList , follow , checkFollowed } from '../../server_api/Api'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const { LoggedId , userId } = useParams();
  const [ friendList , setFriendList ] = useState({})
  const [ user , setuser ] = useState()
  const [ myPosts , setPosts ] = useState({})
  const [isFollowed, setisFollowed] = useState(false)
  const LoggedUser = JSON.parse(localStorage.getItem('profile'))?.myResult;

  
  // for getting user Freinds List
  useEffect(() => {
      const getUserFriends = async () => {
        const { data } = await getUserFriendList(userId);
          setFriendList(data?.gotFreinds[0])
      }
    getUserFriends();
  }, [userId])


    // for getting user posts
    useEffect(() => {
      const getmyPosts = async () => {
        const { data } = await getUserPosts(userId);
        setPosts(data)
      }
      getmyPosts();
    }, [userId])


    // for getting user info
    useEffect(() => {
    const getUser = async () => {
      const { data } = await getUserName(userId)
      setuser(data.gotUser[0])
    }
    getUser();
  }, [userId, setuser])


    // for checking if followed or not
    useEffect(() => {
        const chcekisFollowed = async () => {
          const { data } = await checkFollowed(LoggedUser?._id , userId);
            if(data?.message === "Followed"){
                setisFollowed(true)
            }else{
              setisFollowed(false)
            }
        }
      chcekisFollowed();
    }, [LoggedUser?._id , userId])


  // for follwoing or unFollowing
  const handleClick = async () => {
    await follow(LoggedUser?._id , userId);
    setisFollowed(!isFollowed);
  }

  return (
    <>
    <Navbar/>
      <Grid container  style={{marginTop: '15px'}}>
        <Grid item xs={2.7}>
            <Sidebar/>
        </Grid>
        <Grid item xs={9.25}>
            <Box style={{display: 'flex' , flexDirection: 'column' , marginTop: '-16px'}}>
                <ProfileSec
                    coverImg={ user?.coverPic ||  "https://images.unsplash.com/photo-1549813069-f95e44d7f498?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZWJvb2slMjBjb3ZlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" }
                    profileImage ={ user?.profilePic ||  "https://img.favpng.com/17/3/18/computer-icons-user-profile-male-png-favpng-ZmC9dDrp9x27KFnnge0jKWKBs.jpg" }
                    userName= { user?.username ||  "Hamza Maqsooood" } work={user?.status ||  "Coding is Life !!!" }
                />
                <Grid container  style={{marginLeft: '10px' , marginTop: '20px' , width: '1020px' , overFlowX: 'none'}}>
                  <Grid item xs={7}>
                      <ShareSection user={LoggedUser} setPosts={setPosts} />
                      {
                        myPosts && (
                          Object.values(myPosts).map((item) => (
                                <UsersPosts post={item} key={item._id}  style={{marginTop: '25px'}}   myUser={item?.userId}  />
                          ))
                        )
                      }
                  </Grid>
                  <Grid item xs={5} >
                      <Box style={{display: 'flex' ,flexDirection: 'column' ,}}>
                        {
                          LoggedId !== userId && (
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
                          )
                        }
                        <UserInfo city={ user?.city || "New York City" } from={ user?.from || "Islamabad" } relation={ user?.relationship || "single"} />
                           <Typography style={{fontSize: '18px' , fontWeight: 600 , marginLeft: '30px' , marginBottom : '0px' , marginTop: '20px' , color: '#82589F'}} > Freinds ({friendList?.followers?.length})</Typography>
                        <Box style={{display: 'flex'}}>
                        {
                          friendList?.followers?.length > 0 && (
                              friendList && (
                              Object.values(friendList).map((item) => (
                                    <MutualFreinds followerId={item} LoggedId={LoggedId} />
                              ))
                            )
                          )
                        }
                        </Box>
                      </Box>
                  </Grid>
                </Grid>
            </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
