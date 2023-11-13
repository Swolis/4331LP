// SystemRegisterRoute.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SystemRegistration from '../components/registration/SystemRegistration';

const SystemRegisterationRoute = () => {
  return (
    <Routes>
      <Route path="*" element={<SystemRegistration />} />
    </Routes>
  );
};

export default SystemRegisterationRoute;