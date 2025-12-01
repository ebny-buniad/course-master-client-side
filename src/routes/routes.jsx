import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import LandingPage from "../pages/LandingPage/LandingPage";

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayouts,
        children: [
            {
                index: true, Component: LandingPage
            }
        ]
    }
])

export default router;