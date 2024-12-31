import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";



import Services from './Pages/Services.jsx';
import Contact from './Pages/Contact.jsx';
import About from './Pages/About.jsx';

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
  {

    path: "/",
    element: <App />,
  },
  {
    path: "/Services",
    element: <Services/>,
  }
  ,
  {
    path: "/Contact",
    element: <Contact/>,
  }
  ,
  {
    path: "/About",
    element: <About/>,
  }

]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
);
