// import Buttons from "views/Components/Buttons.jsx";
// import Calendar from "views/Calendar/Calendar.jsx";
// import Charts from "views/Charts/Charts.jsx";
// import Dashboard from "views/Dashboard/Dashboard.jsx";
// import ErrorPage from "views/Pages/ErrorPage.jsx";
// import ExtendedForms from "views/Forms/ExtendedForms.jsx";
// import ExtendedTables from "views/Tables/ExtendedTables.jsx";
// import FullScreenMap from "views/Maps/FullScreenMap.jsx";
// import GoogleMaps from "views/Maps/GoogleMaps.jsx";
// import GridSystem from "views/Components/GridSystem.jsx";
// import Icons from "views/Components/Icons.jsx";
import LockScreenPage from "views/Pages/LockScreenPage.jsx";
import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
import ResetPage from "views/Pages/ResetPage.jsx";
import Pipepro from "views/Pages/Pipepro.jsx";
import ListaPipepro from "views/Pages/ListaPipepro.jsx";
import Organizacao from "views/Pages/Organizacao.jsx";
import Usuario from "views/Pages/Usuario.jsx";
import Pipe from "views/Pages/Pipe.jsx";
import UsuarioOrganizacao from "views/Pages/UsuarioOrganizacao.jsx";
import PipeUsuario from "views/Pages/PipeUsuario.jsx";
// import Notifications from "views/Components/Notifications.jsx";
// import Panels from "views/Components/Panels.jsx";
// import PricingPage from "views/Pages/PricingPage.jsx";
// import RTLSupport from "views/Pages/RTLSupport.jsx";
// import ReactTables from "views/Tables/ReactTables.jsx";
// import RegularForms from "views/Forms/RegularForms.jsx";
// import RegularTables from "views/Tables/RegularTables.jsx";
// import SweetAlert from "views/Components/SweetAlert.jsx";
// import TimelinePage from "views/Pages/Timeline.jsx";
// import Typography from "views/Components/Typography.jsx";
import UserProfile from "views/Pages/UserProfile.jsx";
import UserPassword from "views/Pages/UserPassword.jsx";
// import ValidationForms from "views/Forms/ValidationForms.jsx";
// import VectorMap from "views/Maps/VectorMap.jsx";
// import Widgets from "views/Widgets/Widgets.jsx";
// import Wizard from "views/Forms/Wizard.jsx";

// @material-ui/icons
// import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
// import DateRange from "@material-ui/icons/DateRange";
// import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
// import Place from "@material-ui/icons/Place";
// import Timeline from "@material-ui/icons/Timeline";
// import WidgetsIcon from "@material-ui/icons/Widgets";
// import { Hidden } from "@material-ui/core";

// import firebase from "firebaseConfig";

var dashRoutes = [
    {
        path: "/user-page",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: DashboardIcon,
        component: UserProfile,
        layout: "/admin",
        display: false
    }, {
        path: "/login-page",
        name: "Access Pipepro",
        rtlName: "هعذاتسجيل الدخول",
        mini: "L",
        rtlMini: "هعذا",
        component: LoginPage,
        layout: "/auth",
        display: false
    }, {
        path: "/register-page",
        name: "Register",
        rtlName: "هعذاتسجيل الدخول",
        mini: "L",
        rtlMini: "هعذا",
        component: RegisterPage,
        layout: "/auth",
        display: false
    }, {
        path: "/reset-page",
        name: "Reset Password",
        rtlName: "هعذاتسجيل الدخول",
        mini: "L",
        rtlMini: "هعذا",
        component: ResetPage,
        layout: "/auth",
        display: false
    }, {
        path: "/pipepro/:id",
        name: "Pipepro",
        rtlName: "تسجيل",
        mini: "PP",
        rtlMini: "صع",
        component: Pipepro,
        layout: "/admin",
        display: false
    }, {
        path: "/listapipepro",
        name: "Pipe List",
        rtlName: "تسجيل",
        mini: "PL",
        rtlMini: "صع",
        component: ListaPipepro,
        layout: "/admin",
        display: true
    }, {
        path: "/lock-screen-page",
        name: "Lock Screen Page",
        rtlName: "اقفل الشاشة",
        mini: "LS",
        rtlMini: "هذاع",
        component: LockScreenPage,
        layout: "/auth",
        display: false
    }, {
        path: "/user-password",
        name: "Change Password",
        rtlName: "ملف تعريفي للمستخدم",
        mini: "TS",
        rtlMini: "شع",
        component: UserPassword,
        layout: "/admin",
        display: false
    }, {
        collapse: true,
        name: "Admin",
        rtlName: "صفحات",
        icon: Image,
        state: "pageCollapse",
        views: [
            {
                path: "/Usuario",
                name: "Users",
                rtlName: "تسجيل",
                mini: "US",
                rtlMini: "صع",
                component: Usuario,
                layout: "/admin",
                display: true
            }, {
                path: "/Organizacao",
                name: "Organizations",
                rtlName: "تسجيل",
                mini: "OR",
                rtlMini: "صع",
                component: Organizacao,
                layout: "/admin",
                display: true
            }, {
                path: "/Pipe",
                name: "Pipes",
                rtlName: "تسجيل",
                mini: "PI",
                rtlMini: "صع",
                component: Pipe,
                layout: "/admin",
                display: true
            }, {
                path: "/xUsuarioOrganizacao",
                name: "Users X Organizations",
                rtlName: "تسجيل",
                mini: "UO",
                rtlMini: "صع",
                component: UsuarioOrganizacao,
                layout: "/admin",
                display: true
            }, {
                path: "/xPipeUsuario",
                name: "Pipes X Users",
                rtlName: "تسجيل",
                mini: "PU",
                rtlMini: "صع",
                component: PipeUsuario,
                layout: "/admin",
                display: true
            },
        ]
    },


];
export default dashRoutes;
