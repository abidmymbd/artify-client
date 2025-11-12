import { createBrowserRouter } from "react-router";
import Home from "../HomeLayout/Home";
import HomeLayout from "../HomeLayout/HomeLayout";
import Login from "../Login & Register/Login";
import SignUp from "../Login & Register/SignUp";
import Error from "../Error/Error";
import AddArtWork from "../AddArtWork/AddArtWork";
import ExploreArtWorks from "../ExploreArtWorks/ExploreArtWorks";
import SingleArtWork from "../SingleArtWork/SingleArtWork";
import MyGallery from "../MyGallery/MyGallery";
import MyFavourites from "../MyFavourites/MyFavourites";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";


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
            {
                path: "/exploreartworks",
                Component: ExploreArtWorks,
            },
            {
                path: "/artworks/:id",
                Component: SingleArtWork,
            },
            {
                element: <PrivateRoutes></PrivateRoutes>,
                children: [
                    {
                        path: "/mygallery",
                        Component: MyGallery,
                    },
                    {
                        path: "/myfavourites",
                        Component: MyFavourites,
                    },
                    {
                        path: "/addartwork",
                        Component: AddArtWork,
                    },
                ]
            }
        ]
    },
    {
        path: "*",
        Component: Error
    },
])

export default router;