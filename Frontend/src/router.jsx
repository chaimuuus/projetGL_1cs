import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Layout from "./layouts/layout";
import ClientSignUpPage from "./pages/Client/SignUpPage/SignUp";
import ArtisanSignUpPage from "./pages/Artisan/SignUpPage/SignUp";
import LoginPage from "./pages/Login"

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
    ],
  },
  {
    path: "/artisan",
    children: [
      { path: "sign-up", element: <ArtisanSignUpPage /> },
    ],
  },
  { path: "/Login", element: <LoginPage /> }
]);

export default router;
