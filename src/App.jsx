import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import HomePage from './components/HomePage';
import InscripcionesPage from './components/InscripcionesPage';
import EstudiantePage from './components/Login/EstudiantePage';
import EmpresaPage from './components/Login/EmpresaPage';
import PasantiasPage from './components/Empresa/PasantiasPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inscripciones" element={<InscripcionesPage />} />
          <Route path="/estudiante" element={<EstudiantePage />} />
          <Route path="/trabajo" element={<EmpresaPage />} />
          <Route path="/empresa/pasantias" element={<PasantiasPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
