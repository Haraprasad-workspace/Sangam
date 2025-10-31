import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/ProfilePage'
import NotificationsPage from './pages/NotificationsPage'
import SettingPage from './pages/SettingPage'
import Logout from './pages/Logout'
import PostThoughtPage from './pages/PostThoughtPage'
import EditProfile from './components/EditProfile'
import Userprofile from './pages/Userprofile'
import Dashboard from './pages/Dashboard'
import FollowersListPage from './pages/FollowersListPage'
import FollowingListPage from './pages/FollowingListPage'
import LikeListPage from './pages/LikeListPage'
import FindUser from './pages/FindUser'

const router = createBrowserRouter(
  [{
      path:'/',
      element:<Dashboard/>
  },
    {
      path:'/home',
      element:<HomePage/>
    },
    {
      path:'/login',
      element:<LoginPage/>
    },
    {
      path:'/register',
      element:<RegisterPage/>
    },
    {
      path:'/notfound',
      element:<NotFoundPage/>
    },
    {
      path:'/profile',
      element:<ProfilePage/>
    },
    {
      path:'/notification',
      element:<NotificationsPage/>
    },
    {
      path:'/setting',
      element:<SettingPage/>
    },{
      path:'/logout',
      element:<Logout/>
    }
    ,{
      path:'/postThought',
      element:<PostThoughtPage/>
    },
    {
      path:'/editprofile',
      element:<EditProfile/>
    },
    {
      path:'/profile/:profileid',
      element:<Userprofile/>
    },
    {
      path:'/getfollowers/:profileid',
      element:<FollowersListPage/>
    },
    {
      path:'/getfollowings/:profileid',
      element:<FollowingListPage/>
    },
    
    {
      path:'/getLikes/:postid',
      element:<LikeListPage/>
    },
    
    {
      path:'/findusers',
      element:<FindUser/>
    },
    {
      path:'/*',
      element:<NotFoundPage/>
    }
  ]
)

const App = () => {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App