import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Layout from "./layouts/layout";
import ClientSignUpPage from "./pages/Client/SignUpPage/SignUp";
import ArtisanSignUpPage from "./pages/Artisan/SignUpPage/SignUp";
import LoginPage from "./pages/Login"
import ProfileLayout from "./layouts/ProfileLayout";
import EditProfile from "./pages/Artisan/Profile/EditProfile";
import EditProfileUser from "./pages/Client/Profile/EditProfile";
import Portfolio from "./pages/Artisan/Profile/Portfolio";
import Certificate from "./pages/Artisan/Profile/Certificate";

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
  { path: "/Login", element: <LoginPage /> }
]);

export default router;
