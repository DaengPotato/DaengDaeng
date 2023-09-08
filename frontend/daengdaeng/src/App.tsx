import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/common/NavBar/NavBar';
import MainPage from './pages/MainPage/indes';

function App() {
  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    setScreenSize();
  });

  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
