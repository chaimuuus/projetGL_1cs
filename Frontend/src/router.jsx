import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Layout from "./layouts/layout";
import ClientSignUpPage from "./pages/Client/SignUpPage/SignUp";
import ArtisanSignUpPage from "./pages/Artisan/SignUpPage/SignUp";
import LoginPage from "./pages/Login"
import WelcomePage from "./pages/Welcome";
import ProfileLayout from "./layouts/ProfileLayout";
import EditProfile from "./pages/Artisan/Profile/EditProfile";
import EditProfileUser from "./pages/Client/Profile/EditProfile";
import Portfolio from "./pages/Artisan/Profile/Portfolio";
import Certificate from "./pages/Artisan/Profile/Certificate";
import Messagerie from "./pages/chat/Messagerie";

import Planification from "./pages/planification";
import Agenda from "./pages/Agenda";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <App /> },
      /*
      {
        path: "/profile",
        element: <ProfilePageLayout />,
        children: [
          { path: "Edit-profile", element: <EditProfilePage /> },
        ],
      },
      */
    ],
  },
   { path: "/login", element: <LoginPage /> },
   { path: "/welcome", element: <WelcomePage /> },
   { path: "/messagerie", element: <Messagerie /> },
   { path: "/planification", element: <Planification /> },
   { path: "/agenda", element: <Agenda /> },
   {
    path: "/client",
    children: [
      { path: "sign-up", element: <ClientSignUpPage /> },
      {
        path: "profile",
        element: <ProfileLayout />,
        children: [
          { path: "edit-profile", element: <EditProfileUser /> },
        ],
      },
    ],
  },
  {
    path: "/artisan",
    children: [
      { path: "sign-up", element: <ArtisanSignUpPage /> },
      {
        path: "profile",
        element: <ProfileLayout />,
        children: [
          { path: "edit-profile", element: <EditProfile /> },
          { path: "portfolio", element: <Portfolio /> },
          { path: "certificate", element: <Certificate /> },
        ],
      },
    ],
  },

]);

export default router;