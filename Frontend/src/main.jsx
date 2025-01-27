import ReactDOM from "react-dom/client";
import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";
import 'typeface-open-sans';
import router from './router'; 
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(  
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
