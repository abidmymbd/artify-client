import { createBrowserRouter } from "react-router";
import Home from "../HomeLayout/Home";
import HomeLayout from "../HomeLayout/HomeLayout";
import Login from "../Login & Register/Login";
import SignUp from "../Login & Register/SignUp";


const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            {
                index: true,
                path: "/",
                Component: Home,
            }, {
                path: "/login",
                Component: Login,
            },
            {
                path: "/signup",
                Component: SignUp,
            },
        ]
    },
])

export default router;