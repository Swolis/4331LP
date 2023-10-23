
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import AppRouter from './routes/AppRouter';

// import components

//import SystemLogin from './components/Login/SystemLogin';



function App() {
  // system login
  return (
    <div className='App'>
      <AppRouter /> {/* Render the Login component here. */}
    </div>
  );
}

export default App;
