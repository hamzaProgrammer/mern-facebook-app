import React , { useEffect , useState} from 'react'
import { Box , IconButton , Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link  } from 'react-router-dom'
import { getNew } from '../../server_api/Api'



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection:'column',
        overflowY : 'scroll',
        height: '88vh',
        position: 'sticky',
        left: 0,
        top: '80px'
    },
    iconsBox : {
        display :'flex',
        flexDirection: 'column',
        marginLeft: '-25px'
    },
    iconText : {
        
        paddingLeft: '10px',
        color: '#2d3436'
    },
    icon: {
        fontSize: '27px',
        marginBottom: '14px',
        color: '#2d3436'
    },
    userImage: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginBottom: '7px'
    },
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': '#808080'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#74b9ff',
        },
    }
}))

const Sidebar = () => {
    const classes = useStyles()
    const LoggedUser = JSON.parse(localStorage.getItem('profile'))?.myResult
    const [ findFreinds  , setFriends ] = useState({})

    useEffect(() => {
        const getNewUsers = async() => {
            const { data } = await getNew(LoggedUser?._id)
            setFriends(data?.allFriends)
        }
        getNewUsers()
    }, [LoggedUser?._id])

    return (
        <>
            <Box className={classes.root}>
                <Box className={classes.iconsBox}>
                    <IconButton
                        size="small"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        style={{ marginLeft: '-120px' }}
                        component={Link}
                        to="/"
                        >
                            <RssFeedIcon className={classes.icon} />
                        <Typography className={classes.iconText} style={{fontSize: '18px' , fontWeight: 500 , marginTop: '-10px'}} >Feed</Typography>
                    </IconButton>
                    <IconButton
                        size="small"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        style={{ marginLeft: '-120px' }}
                        component={Link}
                        to={`/${LoggedUser?._id}/followings`}
                        >
                            <ChatIcon className={classes.icon} />
                        <Typography className={classes.iconText} style={{fontSize: '18px' , fontWeight: 500 , marginTop: '-10px'}} >Followings</Typography>
                    </IconButton>
                    <IconButton
                        size="small"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        style={{ marginLeft: '-105px' }}
                        component={Link}
                        to={`/${LoggedUser?._id}/videos`}
                        >
                            <OndemandVideoIcon className={classes.icon} />
                        <Typography className={classes.iconText} style={{fontSize: '18px' , fontWeight: 500 , marginTop: '-10px'}} >Videos</Typography>
                    </IconButton>
                    <IconButton
                        size="small"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        style={{ marginLeft: '-100px' }}
                        component={Link}
                        to={`/${LoggedUser?._id}/followers`}
                        >
                            <GroupIcon className={classes.icon} />
                        <Typography className={classes.iconText} style={{fontSize: '18px' , fontWeight: 500 , marginTop: '-10px'}} >Followers</Typography>
                    </IconButton>
                    <IconButton
                        size="small"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        style={{ marginLeft: '-70px' }}
                        component={Link}
                        to={`/${LoggedUser?._id}/likedPosts`}
                        >
                            <BookmarkBorderIcon className={classes.icon} />
                        <Typography className={classes.iconText} style={{fontSize: '18px' , fontWeight: 500 , marginTop: '-10px'}} >Liked Posts</Typography>
                    </IconButton>
                    <IconButton
                        size="small"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        style={{ marginLeft: '-70px' }}
                        component={Link}
                        to={`/${LoggedUser?._id}/savedPosts`}
                        >
                            <HelpOutlineIcon className={classes.icon} />
                        <Typography className={classes.iconText} style={{fontSize: '18px' , fontWeight: 500 , marginTop: '-10px'}} >Saved Posts</Typography>
                    </IconButton>
                    <IconButton
                        size="small"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        style={{ marginLeft: '-80px' }}
                        component={Link}
                        to={`/${LoggedUser?._id}/findNewFriends`}
                        >
                            <SettingsIcon className={classes.icon} />
                        <Typography className={classes.iconText} style={{fontSize: '18px' , fontWeight: 500 , marginTop: '-10px'}} >Find New Freinds</Typography>
                    </IconButton>
                    <IconButton
                        size="small"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        style={{ marginLeft: '-80px' }}
                        component={Link}
                        to={`/${LoggedUser?._id}/setting`}
                        >
                            <SettingsIcon className={classes.icon} />
                        <Typography className={classes.iconText} style={{fontSize: '18px' , fontWeight: 500 , marginTop: '-10px'}} >Settings</Typography>
                    </IconButton>
                    <hr style={{   marginTop: '10px' , marginBottom : '15px'}} />
                    
                    {
                        findFreinds && (
                            Object.values(findFreinds)?.map((item) => (
                                <IconButton
                                    size="small"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                    style={{ marginLeft: '-60px' }}
                                    component={Link}
                                    to={`/profile/${LoggedUser?._id}/${item?._id}`}
                                    >
                                        <img
                                            className={classes.userImage}
                                            src={item?.profilePic ||  "data:image/png;base64,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" }
                                            alt="User Cover"
                                            style={{objectFit:'cover'}}
                                        />
                                    <Typography className={classes.iconText} style={{fontSize: '18px' , fontWeight: 500 , marginTop: '-10px'}} >{item?.username}</Typography>
                                </IconButton>
                            ))
                        )
                    }

                    </Box>

            </Box>
        </>
    )
}

export default Sidebar
