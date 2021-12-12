import React from 'react'
import { Box , Typography  } from '@mui/material'
import { makeStyles } from '@mui/styles'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: '20px',
        position: 'sticky',
        height: '86vh',
        overflowY: 'scroll',
        left: 0,
        top: '80px'
    },
    bday:{
        display: 'flex',
    },
    bdayText: {
        fontSize: '15px',
        color: '#2c3e50',
        paddingLeft: '10px',
        paddingTop: '5px'
    },
    online: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '25px'
    },
    friend: {
        display: 'flex',
    },
    onlineIcon : {
        color: 'green',
        marginLeft: '-15px'
    },
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': '#808080'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#fff',
        },
    }
}))

const RightSide = () => {
    const classes = useStyles();
    return (
        <>
            <Box className={classes.root}>
                <Box className={classes.bday}>
                    <img
                        src = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmlydGhkYXklMjBjYWtlc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        alt="Bday Cover"
                        style={{width: '60px', height: '60px' , borderRadius: '10px'}}
                    />
                    <Typography className={classes.bdayText} > <span style={{color: 'black' , fontWeight:700}}>Abdul Haseeb</span> and <span style={{color: 'black' , fontWeight:700}}>1+ others </span> have birthday today</Typography>
                </Box>
                <img
                        src = "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/digital-marketing-agency-ad-design-template-621704135fcb1058225c67bbb0332418_screen.jpg?ts=1599403754"
                        alt="Bday Cover"
                        style={{width: '100%', height: '200px' , borderRadius: '10px' , marginTop: '10px' , objectFit: 'cover'}}
                    />
                <Box className={classes.online}>
                    <Typography style={{fontSize: '18px', fontWeight: 700 , marginBottom: '15px'}}>Online Friends</Typography>
                    <Box className={classes.friend}>
                        <img
                            src = "https://images.unsplash.com/photo-1555421689-d68471e189f2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGFkc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                            alt="User Cover"
                            style={{width: '40px', height: '40px' , borderRadius: '50%' , marginBottom: '15px' , objectFit: 'cover'}}
                        />
                        <FiberManualRecordIcon fontSize="small" className={classes.onlineIcon} />
                        <Typography style={{fontSize: '16px' , fontWeight: 500 , marginTop: '10px' , marginLeft: '10px'}} >Jhone Doe</Typography>
                    </Box>
                    <Box className={classes.friend}>
                        <img
                            src = "https://images.unsplash.com/photo-1555421689-d68471e189f2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGFkc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                            alt="User Cover"
                            style={{width: '40px', height: '40px' , borderRadius: '50%' , marginBottom: '15px'}}
                        />
                        <FiberManualRecordIcon fontSize="small" className={classes.onlineIcon} />
                        <Typography style={{fontSize: '16px' , fontWeight: 500 , marginTop: '10px' , marginLeft: '10px'}} >Jhone Doe</Typography>
                    </Box>
                    <Box className={classes.friend}>
                        <img
                            src = "https://images.unsplash.com/photo-1555421689-d68471e189f2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGFkc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                            alt="User Cover"
                            style={{width: '40px', height: '40px' , borderRadius: '50%' , marginBottom: '15px'}}
                        />
                        <FiberManualRecordIcon fontSize="small" className={classes.onlineIcon} />
                        <Typography style={{fontSize: '16px' , fontWeight: 500 , marginTop: '10px' , marginLeft: '10px'}} >Jhone Doe</Typography>
                    </Box>
                    <Box className={classes.friend}>
                        <img
                            src = "https://images.unsplash.com/photo-1555421689-d68471e189f2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGFkc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                            alt="User Cover"
                            style={{width: '40px', height: '40px' , borderRadius: '50%' , marginBottom: '15px'}}
                        />
                        <FiberManualRecordIcon fontSize="small" className={classes.onlineIcon} />
                        <Typography style={{fontSize: '16px' , fontWeight: 500 , marginTop: '10px' , marginLeft: '10px'}} >Jhone Doe</Typography>
                    </Box>
                    <Box className={classes.friend}>
                        <img
                            src = "https://images.unsplash.com/photo-1555421689-d68471e189f2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGFkc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                            alt="User Cover"
                            style={{width: '40px', height: '40px' , borderRadius: '50%' , marginBottom: '15px'}}
                        />
                        <FiberManualRecordIcon fontSize="small" className={classes.onlineIcon} />
                        <Typography style={{fontSize: '16px' , fontWeight: 500 , marginTop: '10px' , marginLeft: '10px'}} >Jhone Doe</Typography>
                    </Box>
                    <Box className={classes.friend}>
                        <img
                            src = "https://images.unsplash.com/photo-1555421689-d68471e189f2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGFkc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                            alt="User Cover"
                            style={{width: '40px', height: '40px' , borderRadius: '50%' , marginBottom: '15px'}}
                        />
                        <FiberManualRecordIcon fontSize="small" className={classes.onlineIcon} />
                        <Typography style={{fontSize: '16px' , fontWeight: 500 , marginTop: '10px' , marginLeft: '10px'}} >Jhone Doe</Typography>
                    </Box>
                    <Box className={classes.friend}>
                        <img
                            src = "https://images.unsplash.com/photo-1555421689-d68471e189f2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGFkc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                            alt="User Cover"
                            style={{width: '40px', height: '40px' , borderRadius: '50%' , marginBottom: '15px'}}
                        />
                        <FiberManualRecordIcon fontSize="small" className={classes.onlineIcon} />
                        <Typography style={{fontSize: '16px' , fontWeight: 500 , marginTop: '10px' , marginLeft: '10px'}} >Jhone Doe</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default RightSide
