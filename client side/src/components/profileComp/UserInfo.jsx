import React from 'react'
import { Box , Grid , Typography } from '@mui/material'


const UserInfo = ({from , relation , city}) => {
    return (
        <>
            <Typography style={{fontSize: '18px' , fontWeight: 600 , marginLeft: '50px' , marginBottom : '10px' , color: '#2f3542'}} >Your Details: </Typography>
            <Grid container style={{paddingLeft: '30px'}}>
                <Grid item xs={1}>
                    <Box style={{display: 'flex' , flexDirection : 'column'}}>
                    <Typography style={{fontSize: '17px' , fontWeight: 600 , color: '#2c3e50' , marginBottom: '5px'}} >City: </Typography>
                    <Typography style={{fontSize: '17px' , fontWeight: 600 , color: '#2c3e50' , marginBottom: '5px'}} >From: </Typography>
                    <Typography style={{fontSize: '17px' , fontWeight: 600 , color: '#2c3e50' , marginBottom: '5px'}} >Relationship: </Typography>
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    <Box style={{display: 'flex' , flexDirection : 'column' , marginLeft: '40px' , marginTop: '2px'}}>
                    <Typography style={{fontSize: '16px' , fontWeight: 600 , color: '#57606f' , marginBottom: '5px'}} >{city} </Typography>
                    <Typography style={{fontSize: '16px' , fontWeight: 600 , color: '#57606f' , marginBottom: '5px'}} >{from} </Typography>
                    <Typography style={{fontSize: '16px' , fontWeight: 600 , color: '#57606f' , marginBottom: '5px' , marginLeft: '50px'}} >{relation} </Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default UserInfo
