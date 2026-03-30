

import { createBrowserRouter } from "react-router";
import MainLayout from "../layout";
import Login from "../pages/login";
import Register from "../pages/register";
import NotFound from "../pages/not_found";


const router =createBrowserRouter([
    {
        path:"/",
        Component:MainLayout,
        children:[
            {
                index:true,
                element:"sa"
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