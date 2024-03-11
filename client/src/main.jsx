import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './routes/Router.jsx';
import AuthProvider from './AuthContext/auth.provider';

ReactDOM.createRoot(document.getElementById('root')).render(
<AuthProvider>
    <RouterProvider router={router} />
</AuthProvider>    
)
