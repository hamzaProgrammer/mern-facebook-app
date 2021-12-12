import React , { useEffect , useState } from 'react'
import { Box , Grid , Typography } from '@mui/material'
import { getUserName } from '../../server_api/Api'
import { Link } from 'react-router-dom'

const MutualFriends = ({followerId , LoggedId}) => {
    const [ userInfo , setUserInfo ] = useState([])

    // for getting user info
    useEffect(() => {
    const getUser = async () => {
      const { data } = await getUserName(followerId)
          setUserInfo(data?.gotUser[0])
    }
    getUser();
  }, [followerId])
    return (
        <>
            {
                userInfo && (
                    <>
                        <Box style={{display: 'flex' , flexDirection:'column' , marginTop: '20px'  , color: '#95a5a6' , textDecoration: 'none' , marginLeft: '20px'}} component={Link} to={`/profile/${LoggedId}/${followerId}`} >
                            <img
                            src = { userInfo?.profilePic || "https://images.unsplash.com/photo-1481214110143-ed630356e1bb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW58ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }
                            alt="User Cover"
                            width="110px"
                            height="110px"
                            style={{borderRadius: '10px' , objectFit: 'cover' , marginRight: '20px'}}
                            />
                            <Typography style={{fontSize: '16px' , fontWeight: 600 , marginTop: '5px'}}>{userInfo?.username}</Typography>
                        </Box>
                    </>
                )
            }
        </>
    )
}

export default MutualFriends
