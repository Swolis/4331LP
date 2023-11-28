// client/src/routes/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SystemRegisterationRoute from './SystemRegisterationRoute';
import HomePage from '../components/home';
import LoginPage from '../components/login/loginPage';
import RegisterClient from '../components/webclient/RegisterClient';
import DashboardTemplate from '../components/authenticatedUser/dashboard/dashboardTemplate';
import ProductPage from '../components/authenticatedUser/dashboard/productPage/productPage';
import RecipePage from '../components/authenticatedUser/dashboard/recipePage/recipePage';
import WebcClient from '../components/webclient/new/WebClient';


function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* <Route path="*" element={<SystemLoginRoute />} /> */}
        <Route path='/' element={<HomePage/>}/>
        <Route path="/register" element={<SystemRegisterationRoute />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/webclient' element={<RegisterClient />} />
        <Route path='/webclient_2.0' element={<WebcClient />} />
        <Route path='/clientDashboard' element={<DashboardTemplate />} />
        <Route path='/ProductPage' element={<ProductPage />} />
        <Route path='/RecipePage' element={<RecipePage />} />
        {/* Define your other routes here */}
      </Routes>
    </Router>
  );
}

export default AppRouter;