import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import LandingPage from "../pages/LandingPage/LandingPage";
import AuthLayouts from "../layouts/AuthLayouts";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import AdminLayouts from "../layouts/AdminLayouts";
import AdminLogin from "../Dashboard/Admin/AdminLogin";
import AdminDashboard from "../Dashboard/Admin/AdminDashboard";
import CourseManagement from "../Dashboard/Admin/CourseManagement";
import AddCourse from "../Dashboard/Admin/AddCourse";
import UpdateCourse from "../Dashboard/Admin/UpdateCourse";

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
    },
    {
        path: '/admin-dashboard',
        Component: AdminLayouts,
        children: [
            {
                path: 'course-management',
                Component: CourseManagement
            },
            {
                path: 'add-course',
                Component: AddCourse
            },
            {
                path: 'update-course/:id',
                Component: UpdateCourse
            },
            {
                path: 'login',
                Component: AdminLogin
            }
        ]
    }
])

export default router;