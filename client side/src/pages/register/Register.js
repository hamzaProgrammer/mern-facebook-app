import React , { useState } from 'react'
import { Grid , Box , Typography , Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { uploadUser } from '../../server_api/Api'
import { useHistory ,Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    root:{
        padding: '200px',
        paddingTop: '100px',
        height: '100vh'
    },
    leftSide : {
        display: 'flex',
        flexDirection:'column',
        paddingRight: '20px'
    },
    leftHead: {
        color: '#1B9CFC'
    },
    rightSec : {
        padding: '20px',
        display: 'flex',
        flexDirection:'column',
        marginTop: '-50px',
        marginleft: '20px',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
    }
}))
const Register = () => {
    const classes = useStyles()
    const [ msg , setMsg ] = useState('')
    const history = useHistory();

    const [ userData , setUserData ] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    // signUp Up User
    const signUp = async () => {
        if(!userData.email || !userData.username || !userData.password || !userData.confirmPassword ){
            alert("Please Fill all Fields")
        }else{
            if(userData.password !== userData.confirmPassword){
                setMsg('*** Passwords Do not Match ***')
            }else{
                const { data } = await uploadUser(userData)
                if(data?.message !== ''){
                    setMsg(data?.message)
                }else{
                    console.log("Done Finally")
                    history.push('/signin')
                }
            }
        }
    }

    return (
        <>
            <Grid container className={classes.root}>
                <Grid item xs={6}>
                    <Box className={classes.leftSide} >
                        <Typography style={{fontSize: '80px',fontWeight: 700, paddingLeft: '50px'}} className={classes.leftHead}>facebook</Typography>
                        <Typography style={{fontSize: '27px',fontWeight: 700, textAlign: 'center' , color: '#0fbcf9'}} className={classes.leftHead}>We connect you with your loved ones in just few seconds </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box className={classes.rightSec}>
                    <Typography variant="h5" style={{fontWeight: 700 , marginLeft: '120px' , marginBottom: '10px'  }} >Registration Form</Typography>
                    {
                        msg && (
                            <Typography variant="body" style={{fontWeight: 700 , marginLeft: '100px' , marginBottom: '10px' , color: 'red'  }} >{msg}</Typography>
                        )
                    }
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx" label="Email" type="email" variant="standard" style={{width:'350px'}} value={userData.email} name="email"  onChange={(e) => setUserData({...userData , [e.target.name] : e.target.value })} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx" label="Username" type="text" variant="standard" style={{width:'350px' , marginTop: '20px'}} value={userData.username} name="username"  onChange={(e) => setUserData({...userData , [e.target.name] : e.target.value })} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx" label="Password" type="password" variant="standard" style={{width:'350px' , marginTop: '20px'}} value={userData.password} name="password"  onChange={(e) => setUserData({...userData , [e.target.name] : e.target.value })} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx" label="Confirm Password" type="password" variant="standard" style={{width:'350px' , marginTop: '20px'}} value={userData.confirmPassword} name="confirmPassword"  onChange={(e) => setUserData({...userData , [e.target.name] : e.target.value })} />
                        </Box>

                        <Button variant="contained" size="medium" style={{maxWidth: '150px' , marginLeft: '150px' , marginTop: '45px'}} onClick={signUp} >Sign Up </Button>

                        <Button style={{color:'#fff' , fontWeight: 600, fontSize: '17px' , backgroundColor: '#1B1464' , marginTop: '65px'}} component={Link} to='/signin' > Already have an Account?  Sign In Now</Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Register
