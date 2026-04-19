

import { createBrowserRouter } from "react-router";
import MainLayout from "../layout";
import Login from "../pages/login";
import Register from "../pages/register";
import NotFound from "../pages/not_found";
import Home from "../pages/home";
import AdminLayout from "../admin/layout";
import AdminHome from "../admin/page/home";
import Books from "../pages/books";
import BookDetail from "../pages/books/detail_book";

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
                path:"book",
                Component:Books
            },
            {
                path:"book/:id",
                Component:BookDetail
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
    },
    {
        path:"/admin",
        Component:AdminLayout,
        children:[
            {
                index:true,
                Component:AdminHome
            },
            {
                path:"book",
                element:"ss"
            }
        ]
    }
])
export default router