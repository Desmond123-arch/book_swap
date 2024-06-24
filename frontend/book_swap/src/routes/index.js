import React from "react";
import pathConstants from "./pathConstants";
import Post from "../pages/Post.js";

const Home = React.lazy(() => import("../pages/Home.js"));
const Login = React.lazy(() => import("../pages/Login.js"));
const Signup = React.lazy(() => import("../pages/Signup.js"));
const Profile = React.lazy(() => import ("../pages/Profile.js"));
const Browse = React.lazy(() => import("../pages/Browse.js"));
const BookDetail = React.lazy(() => import("../pages/Book.js"));
const Messages = React.lazy(() => import("../pages/Messages.js"));
const MyBooks = React.lazy(() => import("../pages/myBooks.js"))

const routes =[
    {path: pathConstants.HOME, element: <Home/>},
    {path: pathConstants.LOGIN, element: <Login/>},
    {path: pathConstants.SIGNUP, element: <Signup/>},
    {path: pathConstants.PROFILE, element: <Profile/>},
    {path: pathConstants.BROWSE, element: <Browse/>},
    {path: pathConstants.POST, element: <Post/>},
    {path: pathConstants.BOOK_DETAIL, element: <BookDetail />},
    {path: pathConstants.MESSAGES, element: <Messages/>},
    {path: pathConstants.MyBooks, element: <MyBooks/>}
 
]
export default routes