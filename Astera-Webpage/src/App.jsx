import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages/home';
import InteractiveDemo from './pages/interactiveDemo';
import DemoVideo from './pages/demoVideo'
import Trial from './pages/trial';

function App() {
  const [showModal, setShowModal] = useState(false);
  const openModalFromHome = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Trial openModal={openModalFromHome} />} />
        <Route path="/demo" element={<InteractiveDemo closeModal={closeModal} showModal={showModal} />} />
        <Route path="/video" element={<DemoVideo closeModal={closeModal}/>} />
      </Routes>
    </Router>
  );
}

export default App;
