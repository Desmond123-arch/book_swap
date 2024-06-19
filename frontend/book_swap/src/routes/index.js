import React from "react";
import pathConstants from "./pathConstants";

const Home = React.lazy(() => import("../pages/Home.js"))
const Login = React.lazy(() => import("../pages/Login.js"))
const Signup = React.lazy(() => import("../pages/Signup.js"))

const routes =[
    {path: pathConstants.HOME, element: <Home/>},
    {path: pathConstants.LOGIN, element: <Login/>},
    {path: pathConstants.SIGNUP, element: <Signup/>}
]
export default routes