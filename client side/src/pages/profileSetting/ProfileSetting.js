import React , {useEffect , useState} from 'react';
import Navbar from '../../components/navbar/Navbar'
import { Grid  , Box , TextField , IconButton , Button , Typography } from '@mui/material'
import Sidebar from '../../components/sidebar/Sidebar'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ProfileSec from '../../components/profileComp/ProfImage'
import { getUserName , updateUser } from '../../server_api/Api'
import { useParams , useHistory } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import {storage}  from '../../Firebase'

const useStyles = makeStyles((theme) => ({
  input : {
    width: '300px',
    marginBottom : '55px'
  }
}))
const Profile = () => {
  const history = useHistory()
  const classes = useStyles();
  const { id  } = useParams();
  const [ user , setuser ] = useState()
  const [ progress , setProgress ] = useState(0)

    // for getting user info
    useEffect(() => {
        const getUser = async () => {
          const { data } = await getUserName(id)
          setuser(data.gotUser[0])
        }
        getUser();
    }, [id])

    // uploading images to firebase
    const upload =  (image , type) => {
        const fileName = new Date().getTime() + "facebookUserImage"
        const uploadedTask = storage.ref(`/facebook_Profile_Images/${fileName}`).put(image)

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
                  if(type === "profileImage"){
                      setuser((prev) => { return { ...prev , profilePic: url } })
                  }else{
                      setuser((prev) => { return { ...prev , coverPic: url } })
                  }
                })
            }
        )
    }

      // for updating User Details
    const updateProfile = async () => {
      const { data } = await updateUser(id, user)
      console.log(data)
      history.push('/')
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
                    userName= { user?.username ||  "Hamza Maqsooood" } work= { user?.status ||  "Coding is Life !!!" }
                />
                <Typography style={{fontSize: '31px' , fontWeight: 700 ,  color: '#ED4C67' , cursor: 'pointer' , marginLeft: '400px' , marginTop: '50px'}} >Edit Details</Typography>
                <Grid container style = {
                  {
                    marginTop: '10px',
                    marginLeft: '100px',
                    width: '800px',
                    overFlowX: 'none',
                    paddingLeft: '100px',
                    marginBottom: '20px',
                    padding: '30px',
                    paddingTop: '50px',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px'
                  }
                } >
                  <Grid item xs={6}>
                      <Box style={{display: 'flex' , flexDirection: 'column' , paddingLeft: '30px' }}>
                            <TextField id="standard-basic" label={ !user?.username && ("UserName")}  variant="outlined" className={classes.input}  style={{marginBottom: '20px'}}  name="username" value={user?.username} onChange={(e) => setuser({...user, [e.target.name]: e.target.value}) }  />
                            <TextField id="standard-basic" label={ !user?.password && ("Password")}  variant="outlined" className={classes.input}  style={{marginBottom: '20px'}} type="password"  name="password" value={user?.password } onChange={(e) => setuser({...user, [e.target.name]: e.target.value}) }  />
                            <TextField id="standard-basic" label={ !user?.from && ("Hometown")}  variant="outlined" className={classes.input}  style={{marginBottom: '20px'}}  name="from" value={user?.from} onChange={(e) => setuser({...user, [e.target.name]: e.target.value}) }  />
                            <IconButton
                                size="small"
                                aria-label="show 17 new notifications"
                                color="inherit"
                                style={{ marginLeft: '-00px' , fontSize: '30px' , maxWidth: '250px' , marginTop: '30px' , cursor:'pointer' }}
                                >
                                    <CloudUploadIcon  style={{color: '#ff7675' , fontSize: '50px'}}   />
                                <label for="exampleFormControlFile1" style={{fontSize: '17px' , fontWeight: 500 , marginLeft: '5px' , color: '#2d3436' , cursor: 'pointer'}} >Change Profile Photo</label>
                                <input type="file" class="form-control-file" id="exampleFormControlFile1" style={{display:'none'}}
                                    onChange={(e) => upload(e.target.files[0] , "profileImage") }  accept="image/*"
                                />
                            </IconButton>
                      </Box>
                  </Grid>
                  <Grid item xs={6} >
                      <Box style={{display: 'flex' , flexDirection: 'column'}}>
                            <TextField id="outlined-basic" label={ !user?.status && ("Status")} variant="outlined"  className={classes.input}  style={{marginBottom: '20px'}}  name="status"  value={user?.status} onChange={(e) => setuser({...user, [e.target.name]: e.target.value}) }  />
                            <TextField id="outlined-basic" label={ !user?.city && ("City")} variant="outlined"  className={classes.input}  style={{marginBottom: '20px'}}  name="city" value={user?.city} onChange={(e) => setuser({...user, [e.target.name]: e.target.value}) }  />
                            <TextField id="outlined-basic" label={ !user?.relationship && ("Relationship")} variant="outlined"  className={classes.input}  style={{marginBottom: '20px'}}  name="relationship" value={user?.relationship} onChange={(e) => setuser({...user, [e.target.name]: e.target.value}) }  />
                            <IconButton
                                size="small"
                                aria-label="show 17 new notifications"
                                color="inherit"
                                style={{ marginLeft: '-00px' , fontSize: '30px' , maxWidth: '250px' , marginTop: '30px' , cursor:'pointer' }}
                                >
                                    <CloudUploadIcon  style={{color: '#e67e22' , fontSize: '50px'}}   />
                                <label for="exampleFormControlFile2" style={{fontSize: '17px' , fontWeight: 500 , marginLeft: '5px' , color: '#2d3436' , cursor: 'pointer'}} >Change Cover Photo</label>
                                <input type="file" class="form-control-file" id="exampleFormControlFile2" style={{display:'none'}}
                                    onChange={(e) => upload(e.target.files[0] , "coverImage") } accept="image/*"
                                />
                            </IconButton>
                      </Box>
                  </Grid>
                  {
                         ( progress === 0  || progress === 100 ) ? (
                            <Button variant="contained" className={classes.shareBtn} onClick={updateProfile} style={{marginTop: '50px' , marginLeft: '300px'}} >Update Now</Button>
                        ) : (
                            <Typography variant="body2" style={{color: 'red' , marginTop: '50px' , marginLeft: '300px'}}>{progress}% Uploaded</Typography>
                        )
                    }
                </Grid>
            </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
