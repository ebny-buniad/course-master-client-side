import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import LandingPage from "../pages/LandingPage/LandingPage";
import AuthLayouts from "../layouts/AuthLayouts";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayouts,
        children: [
            {
                index: true, Component: LandingPage
            }
        ]
    },
    {
        path: '/auth',
        Component: AuthLayouts,
        children: [
            {
                path: 'signUp',
                Component: SignUp
            },
            {
                path: 'login',
                Component: Login
            }
        ]
    }
])

export default router;