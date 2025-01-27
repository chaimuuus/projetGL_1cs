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
import RqDevis from './pages/Client/Profile/Rqdevis.jsx';
import RpDevis from './pages/Artisan/Profile/RpDevis';
import Facture from './pages/Artisan/Profile/Facture';
import DashBoard from './pages/Client/Profile/dashBoard1.jsx';

import Homepage from "./pages/Guest/HomePage.jsx"
import Services from './pages/Guest/SerVices.jsx';
import Contact from './pages/Guest/ConTact.jsx';
import About from './pages/Guest/About.jsx';

import Artisandash from './pages/Artisan/Profile/Artisandash.jsx';

import UserDevis from "./pages/Client/Profile/UserDevis.jsx";
import UserDevisRecus from "./pages/Client/Profile/UserDevisRecus.jsx";
import UserDevisrp from "./pages/Client/Profile/UserDevisrp.jsx";

import Devis from "./pages/Artisan/Profile/Devis.jsx";
import DevisRecus from './pages/Artisan/Profile/DevisRecus';
import Devisrp from './pages/Artisan/Profile/Devisrp.jsx';

import NotFoundPage from "./pages/404page.jsx";
import ArtisanGeneral from "./pages/Client/VisitArtisan/ArtisanGenerale.jsx"
import ArtisanCertificate from "./pages/Client/VisitArtisan/ArtisanCertificate.jsx"
import ArtisanPortfolio from "./pages/Client/VisitArtisan/ArtisanPortfolio.jsx"

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

  // Client routes
  {
    path: "/user",
    children: [
      { path: "signup", element: <ClientSignUpPage /> },
      { path: "", element: <DashBoard /> },
      { path: "rqdevis/:artisan_id", element: <RqDevis /> },
      {
        path: "devis",
        element: <UserDevis />,
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

  // Artisan routes
  {
    path: "/artisan",
    children: [
      { path: "", element: <Artisandash /> },
      { path: "signup", element: <ArtisanSignUpPage /> },
      { path: "rpdevis/:id_rqdevis", element: <RpDevis /> },
      
      
      {
        path: "devis",
        element: <Devis />,
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
          </PrivateRoute>
        ),
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
          </PrivateRoute>
        ),
        children: [
          { path: "", element: <Generale /> },
          { path: "portfolio", element: <Portfolio /> },
          { path: "certificate", element: <Certificate /> },
        ],
      },
      ...sharedRoutes, // Include shared routes here
    ],
  },

  // Public route for viewing artisan profiles
  {
    path: "/artisans/:artisan_id",
    element: <ArtisanProfile />,
    children: [
      {
        path: "", // Dynamic route for artisan profiles
        element: <ArtisanGeneral />, // Render the Generale component
      },
      {
        path: "portfolio", // Dynamic route for artisan profiles
        element: <ArtisanPortfolio />, // Render the Generale component
      },
      {
        path: "certificate", // Dynamic route for artisan profiles
        element: <ArtisanCertificate />, // Render the Generale component
      }
    ],
  },

  // 404 Page
  {
    path: "*",
    element: <NotFoundPage />,
  },
];