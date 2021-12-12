import React from 'react'
import { Box  , Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    profSec : {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '190px',
        marginLeft: '400px'
    },
    profileImg: {
        objectFit:'cover',
        borderRadius: '50%',
        border: '4px solid #fff',
        marginTop: '-120px'
    },
}))
const ProfileImage = ({coverImg , profileImage , userName , work}) => {
    const classes = useStyles();
    return (
        <>
            <Box className={classes.root} >
                  <img
                    src = {coverImg}
                    alt="User Cover"
                    width="100%"
                    height= '210px'
                    style={{objectFit:'cover'}}
                  />
                  <Box className={classes.profSec}>
                      <img
                        src = {profileImage}
                        alt="User Cover"
                        width="180px"
                        height= '180px'
                        className={classes.profileImg}
                      />
                      <Typography style={{marginLeft: '15px' , fontWeight: 700, marginTop: '5px',fontSize : '19px', color: '#2f3542'}} >{userName}</Typography>
                      <Typography style={{fontWeight: 600, marginLeft: '45px',marginTop: '5px',fontSize : '14px',color: '#535c68'}} >{work}</Typography>
                  </Box>
                </Box>
        </>
    )
}

export default ProfileImage
