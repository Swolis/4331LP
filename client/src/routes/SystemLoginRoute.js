// SystemLoginRoute.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SystemLogin from '../components/Login/SystemLogin';

const SystemLoginRoute = () => {
  return (
    <Routes>
      <Route path="*" element={<SystemLogin />} />
    </Routes>
  );
};

export default SystemLoginRoute;