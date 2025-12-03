import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import LandingPage from "../pages/LandingPage/LandingPage";
import AuthLayouts from "../layouts/AuthLayouts";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import AdminLayouts from "../layouts/AdminLayouts";
import AdminLogin from "../Dashboard/Admin/AdminLogin";
import CourseManagement from "../Dashboard/Admin/CourseManagement";
import AddCourse from "../Dashboard/Admin/AddCourse";
import UpdateCourse from "../Dashboard/Admin/UpdateCourse";
import CourseDetails from "../pages/Courses/CourseDetails";
import CoursePayment from "../pages/Courses/CoursePayment";
import StudentDashboard from "../pages/StudentDashboard/StudentDashboard";
import WatchClass from "../pages/StudentDashboard/WatchClass";

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayouts,
        children: [
            {
                index: true, Component: LandingPage
            },
            {
                path: 'course-details/:id',
                Component: CourseDetails
            },
            {
                path: 'course-payment/:id',
                Component: CoursePayment
            },
            {
                path: 'student-dashboard',
                Component: StudentDashboard
            },
            {
                path: 'watch-class/:id',
                Component: WatchClass
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