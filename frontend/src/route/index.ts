

import { createBrowserRouter } from "react-router";
import MainLayout from "../layout";
import Login from "../pages/login";
import Register from "../pages/register";
import NotFound from "../pages/not_found";
import Home from "../pages/home";


const router =createBrowserRouter([
    {
        path:"/",
        Component:MainLayout,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:"/*",
                Component:NotFound
            }
            
        ]
       
    },
    {
        path:"/login",
        Component:Login
        
    },
    {
        path:"/register",
        Component:Register
    }
])
export default router