// client/src/routes/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SystemRegisterationRoute from './SystemRegisterationRoute';


function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* <Route path="*" element={<SystemLoginRoute />} /> */}
        <Route path="/" element={<SystemRegisterationRoute />} />
        {/* Define your other routes here */}
      </Routes>
    </Router>
  );
}

export default AppRouter;