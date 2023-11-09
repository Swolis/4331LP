// client/src/routes/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SystemLoginRoute from './SystemLoginRoute';
import SystemRegisterRoute from './SystemRegisterRoute';

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* <Route path="*" element={<SystemLoginRoute />} /> */}
        <Route path="*" element={<SystemRegisterRoute />} />
        {/* Define your other routes here */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
