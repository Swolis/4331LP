// client/src/routes/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SystemRegisterationRoute from './SystemRegisterationRoute';
import HomePage from '../components/home';
import LoginPage from '../components/login/loginPage';
import RegisterClient from '../components/webclient/RegisterClient';


function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* <Route path="*" element={<SystemLoginRoute />} /> */}
        <Route path='/' element={<HomePage/>}/>
        <Route path="/register" element={<SystemRegisterationRoute />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/webclient' element={<RegisterClient />} />
        {/* Define your other routes here */}
      </Routes>
    </Router>
  );
}

export default AppRouter;