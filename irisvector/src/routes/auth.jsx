
import LoginPage from "views/Auth/LoginPage.jsx";
import SignupPage from "views/Auth/SignupPage.jsx";

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";

const authRoutes = [
  {
    path: "/auth/register",
    name: "Register Page",
    short: "Register",
    mini: "RP",
    icon: PersonAdd,
    component: SignupPage
  },
  {
    path: "/auth/login",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPage
  },
];

export default authRoutes;
