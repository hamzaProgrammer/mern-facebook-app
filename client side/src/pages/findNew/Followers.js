import React , { useEffect , useState } from 'react';
import { Grid  , Box , Typography } from '@mui/material'
import Sidebar from '../../components/sidebar/Sidebar'
import RightSide from '../../components/rightside/RightSide'
import Navbar from '../../components/navbar/Navbar'
import { getUsers  } from '../../server_api/Api'
import { useLocation }from 'react-router-dom'
import Follower from './Follower'


const Home = () => {
  console.log("This is find New")
  const location = useLocation();
  const [ myPosts , setPosts ] = useState({})
  const LoggedId = JSON.parse(localStorage.getItem('profile'))?.myResult;


  // for fetching followers
   useEffect(() => {
     const getPosts = async () => {
          const {data} = await getUsers(LoggedId?._id)
          console.log("Data : ",data?.allFriends)
          setPosts(data?.allFriends)
     }
     getPosts();
   },[location])


  return (
    <>
    <Navbar/>
      <Grid container style={{marginTop: '15px'}}>
        <Grid item xs={2.7}>
            <Sidebar/>
        </Grid>
        <Grid item xs={6.5}>
            <Box style={{display: 'flex' , flexDirection: 'column' , marginLeft: '50px' , marginRight: '50px'}}>
                <Grid container style={{display: 'flex', marginTop: '30px'  }} >
                    <Grid item xs={10}>
                        <Typography style={{fontWeight: 700, fontSize: '28px'}}>People to Follow</Typography>
                    </Grid>
                </Grid>

                <Box style={{display: 'flex',  flexDirection: 'column' }}>
                      <Box style={{marginTop: '20px'}} >
                      {
                        myPosts?.length > 0 ? (
                          Object.values(myPosts).map((item) => (
                              <Follower loggedId={LoggedId?._id} userId={item?._id}  />
                            ))
                        ) : (
                          <Typography style={{fontWeight: 700, fontSize: '22px' , color: 'red' }}>You must have followed All users, Signed Up till Now</Typography>
                        )
                      }
                      </Box>
                </Box>
            </Box>
        </Grid>
        <Grid item xs={2.8}>
          <RightSide LoggedId={LoggedId} />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
