import React , { useEffect , useState } from 'react';
import { Grid  , Box , CircularProgress } from '@mui/material'
import Sidebar from '../../components/sidebar/Sidebar'
import RightSide from '../../components/rightside/RightSide'
import ShareVideos from '../../components/shareVideo/ShareVideo'
import Posts from '../../components/videoComp/Videos'
import Navbar from '../../components/navbar/Navbar'
import { getVideos } from '../../server_api/Api'
import { useLocation }from 'react-router-dom'


const Home = () => {
  const [ posts , setPosts ] = useState({})
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('profile'))?.myResult;


  // for fetching timeline posts
   useEffect(() => {
     const getPosts = async () => {
          const {data} = await getVideos(user?._id)
          setPosts(data.AlltimelInePosts)
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
                <ShareVideos setPosts={setPosts} user={user} />
                {
                  posts ? (
                    Object.values(posts).map((item) => (
                      <>
                        <Posts key={item?._id} post={item} user={user} />
                        </>
                    ))
                  ) : (
                    <CircularProgress style={{color: 'red' , backgroundColor: 'red' , marginTop: '500px'}} size="4rem"  />
                  )
                }
            </Box>
        </Grid>
        <Grid item xs={2.8}>
          <RightSide user={user} />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
