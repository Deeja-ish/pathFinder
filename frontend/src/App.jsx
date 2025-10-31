import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from './components/PrivateRoute'


function App(){
  return(
    <BrowserRouter>
    <Routes>
      {/* Public routes */}
      <Route path="/" element= {<LandingPage />}/>
      <Route path="/login" element= {<LoginPage />}/>
      <Route path="/register" element= {<RegisterPage />}/>

      {/* Private routes */}
      <Route path="/dashboard" element= {
        <PrivateRoute>
          <DashboardPage/>
        </PrivateRoute>
      }/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;