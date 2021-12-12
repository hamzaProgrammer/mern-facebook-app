import React  , {useEffect , useState}  from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { getUserName , like , getLiked  , deletePosts , Save , getSaved } from '../../server_api/Api'
import { format } from 'timeago.js'
import ReactPlayer from 'react-player'
import { Link , useParams } from 'react-router-dom'


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({post  , myUser }) {
  const expanded = false;
  const [ user , setUser ] = useState('')
  const [ totLikes , setTotLikes ] = useState(post?.likes?.length)
  const [ liked , setLiked ] = useState(false)
  const [ likedSelf , setLikedSelf ] = useState(false)
  const [ saved , setSaved ] = useState(false)
  const [ SavedSelf , setSavedSelf ] = useState(false)
  const LoggedUser = JSON.parse(localStorage.getItem('profile'))?.myResult;
  const { userId } = useParams()
  const [ myLikes , setmyLikes ] = useState(0)


    useEffect(() => {
      const getUser = async () => {
        const { data } = await getUserName(myUser)
        setUser(data.gotUser[0])
        getLikedPosts(data?.gotUser[0]?._id)
        getSavedPosts(data?.gotUser[0]?._id)
      }
      getUser();

      // showing liked posts
      const getLikedPosts = async (id) => {
          const { data } = await getLiked( LoggedUser?._id , post?._id);
          if(data?.message === "Founded"){
            setLikedSelf(true)
          }else{
            setLikedSelf(false)
          }
      }

      // showing saved posts
      const getSavedPosts = async (id) => {
          const { data } = await getSaved( LoggedUser?._id , post?._id);
          if(data?.message === "Founded"){
            setSavedSelf(true)
          }else{
            setSavedSelf(false)
          }
      }
    }, [post])



    // liking Post
    const likePost = async () => {
        const { data } = await like(LoggedUser?._id , post?._id)
        if(data?.message === "liked"){
              setLiked(true)
              setTotLikes(data?.totLikes + 1)
        }else{
          setLiked(false)
          setLikedSelf(false)
          if (data?.totLikes === 0){
            setTotLikes(0)
          }else{
            setTotLikes(data?.totLikes - 1)
          }
        }
    }


    // saving Post
    const SavePost = async () => {
      console.log("Called Saved Post")
        const { data } = await Save(LoggedUser?._id , post?._id)
        console.log(data)
        if(data?.message === "Saved"){
              setSaved(true)
        }else{
          setSaved(false)
          setSavedSelf(false)
        }
    }


  return (
      <>
      {
        post && (
            <Card sx={{ maxWidth: '100%'  , marginTop: '35px', boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' ,  color: '#2d3436' }}>
              <CardHeader
                avatar={
                  <Link to={`/profile/${LoggedUser?._id}/${post?.userId}`}>
                  <img
                      src = { user?.profilePic ||  "https://img.favpng.com/17/3/18/computer-icons-user-profile-male-png-favpng-ZmC9dDrp9x27KFnnge0jKWKBs.jpg" }
                      alt="User Cover"
                    width="50px"
                    height="50px"
                    style={{borderRadius: '50%'}}
                  />
                  </Link>
                }
                action={
                  <IconButton aria-label="settings">
                  {
                    userId === LoggedUser?._id ? (
                        <DeleteForeverIcon onClick={() => deletePosts(post?._id)} />
                    ) : (
                      ( saved || SavedSelf ) ? (
                          <BookmarkIcon style={{color: '#3742fa'}} onClick={SavePost} />
                      ) : (
                          <BookmarkBorderIcon onClick={SavePost} />
                      )
                    )
                }
                  </IconButton>
                }
                    title={user?.username}
                    subheader={format(post?.createdAt)}
              />
              <CardContent>
                <Typography variant="body2" style={{color: '#2d3436'}}>
                  {post.desc}
                </Typography>
              </CardContent>
              {
                post?.type === "video" ? (
                      <ReactPlayer
                          url = {post?.video}
                          playing={false}
                          controls={true}
                          playIcon={true}
                          muted={true}
                          width='100%'
                          height="230px"
                          style={{borderRadius: '20px' , padding: '10px' }}
                        />
                ) : (
                    <CardMedia
                        component="img"
                        height="350"
                        style={{padding: '10px'}}
                        image = { post?.img  || "https://jk24x7news.tv/wp-content/plugins/responsive-menu/v4.0.0/assets/images/no-preview.jpeg" }
                        alt="Paella dish"
                      />
                )
              }
              <CardActions disableSpacing>
                {
                  (liked || likedSelf ) ? (
                    <>
                        <IconButton aria-label="add to favorites" onClick={likePost}>
                          <ThumbUpIcon style={{ color:'#ff3f34' }}/>
                      </IconButton>
                      {
                        totLikes === 1 ? (
                            <Typography style={{color: '#808080' , fontSize: '13px' , fontWeight:600}}> You  Liked this</Typography>
                        ) : (
                          <Typography style={{color: '#808080' , fontSize: '13px' , fontWeight:600}}> You and  {totLikes} Liked </Typography>
                        )
                      }
                    </>
                  ) : (
                    <>
                      <IconButton aria-label="add to favorites" onClick={likePost}>
                          <ThumbUpIcon/>
                      </IconButton>
                      <Typography style={{color: '#808080' , fontSize: '13px' , fontWeight:600}}>  {totLikes} Likes </Typography>
                    </>
                  )
                }

                <ExpandMore
                  expand={expanded}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <Typography variant="body2" style={{color: 'black'}} >9 comments</Typography>
                </ExpandMore>
              </CardActions>
            </Card>

        )
      }
      </>
  );
}
