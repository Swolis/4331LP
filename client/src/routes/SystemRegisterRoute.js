// SystemRegisterRoute.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SystemRegister from '../components/Register/SystemRegister';

const SystemRegisterRoute = () => {
  return (
    <Routes>
      <Route path="*" element={<SystemRegister />} />
    </Routes>
  );
};

export default SystemRegisterRoute;