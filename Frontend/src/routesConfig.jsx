// routesConfig.js

import ProfileLayout from "./layouts/ProfileLayout";

import PrivateRoute from "./PrivateRoute.jsx";

import LoginPage from "./pages/Login";
import WelcomePage from "./pages/Welcome";

import Messagerie from "./pages/chat/Messagerie.jsx";
import Agenda from "./pages/Agenda";

import ClientSignUpPage from "./pages/Client/SignUpPage/SignUp";
import EditProfileUser from "./pages/Client/Profile/EditProfile";
import UserProfile from "./pages/Client/Profile/UserProfile.jsx";

import ArtisanSignUpPage from "./pages/Artisan/SignUpPage/SignUp";
import EditProfile from "./pages/Artisan/Profile/EditProfile";
import EditPortfolio from "./pages/Artisan/Profile/EditPortfolio";
import EditCertificate from "./pages/Artisan/Profile/EditCertificate";
import ArtisanProfile from "./pages/Artisan/Profile/ArtisanProfile";
import Portfolio from './pages/Artisan/Profile/Portfolio';
import Certificate from './pages/Artisan/Profile/Certificate';
import Generale from './pages/Artisan/Profile/Generale';
import RqDevis from './pages/client/Profile/RqDevis';
import RpDevis from './pages/Artisan/Profile/RpDevis';
import Facture from './pages/Artisan/Profile/Facture';
import DashBoard from './pages/client/Profile/DashBoard.jsx';

import Homepage from "./Pages/Guest/Homepage"
import Services from './Pages/Guest/Services.jsx';
import Contact from './Pages/Guest/Contact.jsx';
import About from './pages/Guest/About_.jsx';

import Artisandash from './pages/Artisan/Profile/Artisandash.jsx';


import UserDevis from "./pages/Client/Profile/UserDevis.jsx";
import UserDevisRecus from "./pages/Client/Profile/UserDevisRecus.jsx";
import UserDevisrp from "./pages/Client/Profile/UserDevisrp.jsx";

import Devis from "./pages/Artisan/Profile/Devis.jsx";
import DevisRecus from './pages/Artisan/Profile/DevisRecus';
import Devisrp from './pages/Artisan/Profile/Devisrp.jsx';


import NotFoundPage from "./pages/404page.jsx";

// Shared routes for both client and artisan
const sharedRoutes = [
  { path: "messagerie", element: <Messagerie /> },
  { path: "agenda", element: <Agenda /> },
];

export const routes = [
  { path: "/", element: <Homepage /> },
  { path: "/services", element: <Services /> },
  { path: "/contact", element: <Contact /> },
  { path: "/about", element: <About /> },
  { path: "/login", element: <LoginPage /> },
  
  
  { path: "/welcome", element: <WelcomePage /> },
  //Ta123456
  {
    path: "/user",
    children: [
      { path: "signup", element: <ClientSignUpPage /> },
      { path: "", element: <DashBoard /> },
      { path: "devis", element: <RqDevis /> },
      {
        path: "devis",
        element: (
            <UserDevis />
        ),
        children: [
          { path: "", element: <UserDevisRecus /> },
          { path: "userdevisrp", element: <UserDevisrp /> },
        ],
      },
      {
        path: "profile",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <ArtisanProfile />
          </PrivateRoute>
        ),
        children: [
          { path: "", element: <UserProfile /> },
          
        ],
      },
      {
        path: "edit-profile",
        element: (
          <PrivateRoute allowedRoles={["user"]}>
            <ArtisanProfile />
          </PrivateRoute>
        ),
        children: [
          { path: "", element: <EditProfileUser /> },
          
        ],
      },
      ...sharedRoutes, // Include shared routes here
    ],
  },
  {
    path: "/artisan",
    children: [
      { path: "", element: <Artisandash /> },
      { path: "signup", element: <ArtisanSignUpPage /> },
      { path: "devis", element: <RpDevis /> },
      {
        path: "devis",
        element: (
            <Devis />
        ),
        children: [
          { path: "", element: <DevisRecus /> },
          { path: "Devisrp", element: <Devisrp /> },
        ],
      },
      
      {
        path: "edit-profile",
        element: (
          <PrivateRoute allowedRoles={["artisan"]}>
            <ProfileLayout />
          </PrivateRoute>),
        children: [
          { path: "", element: <EditProfile /> },
          { path: "portfolio", element: <EditPortfolio /> },
          { path: "certificate", element: <EditCertificate /> },
        ],
      },
      {
        path: "profile",
        element: (
        <PrivateRoute allowedRoles={["artisan"]}>
          <ArtisanProfile />
        </PrivateRoute>),
        children: [
          { path: "", element: <Generale /> },
          { path: "portfolio", element: <Portfolio /> },
          { path: "certificate", element: <Certificate /> },
        ],
      },
      ...sharedRoutes, // Include shared routes here
    ],
  },
  {
    path: "*", 
    element: <NotFoundPage /> 
  }
];
