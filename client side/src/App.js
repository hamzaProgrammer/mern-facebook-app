import React , { useEffect  , useState} from 'react'
import './App.css';
import Home from './pages/home/Home'
import Profile from './pages/profile/ProfilePage'
import SignIn from './pages/siginin/SignIn'
import Register from './pages/register/Register'
import ProfileSetting from './pages/profileSetting/ProfileSetting'
import Videos from './pages/Videos/VideosPage'
import Followers from './pages/Followers/Followers'
import Followings from './pages/Followings/Followings'
import LikedPosts from './pages/LikedPosts/LikedPosts'
import SavedPosts from './pages/SavedPosts/SavedPosts'
import FindNew from './pages/findNew/Followers'
import { Switch , Route  , useLocation} from 'react-router-dom'



function App() {
  const location = useLocation();
  const [User, setUser] = useState({})
  useEffect(() => {
    const GotUser = JSON.parse(localStorage.getItem('profile'))?.myResult;
    setUser(GotUser)
  }, [location])
  return (
    <>
      <Switch>
          <Route exact path="/"  >
            {User ? <Home/> : <SignIn/>}
          </Route>
          <Route path="/profile/:LoggedId/:userId" >
            {User ? <Profile/> : <SignIn/>}
          </Route>
          <Route path="/signin" >
            {User ? <Home/> : <SignIn/>}
          </Route>
          <Route path="/signup" >
            {User ? <Home/> : <Register/>}
          </Route>
          <Route exact path="/:id/setting"  >
            {User ? <ProfileSetting/> : <SignIn/>}
          </Route>
          <Route exact path="/:id/videos"  >
            {User ? <Videos/> : <SignIn/>}
          </Route>
           <Route exact path="/:id/findNewFriends"  >
            {User ? <FindNew/> : <SignIn/>}
          </Route>
          <Route exact path="/:id/followers"  >
            {User ? <Followers/> : <SignIn/>}
          </Route>
          <Route exact path="/:id/followings"  >
            {User ? <Followings/> : <SignIn/>}
          </Route>
          <Route exact path="/:id/likedPosts"  >
            {User ? <LikedPosts/> : <SignIn/>}
          </Route>
          <Route  path="/:id/savedPosts"  >
            {User ? <SavedPosts/> : <SignIn/>}
          </Route>
      </Switch>
    </>
  );
}

export default App;
