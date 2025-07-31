import { useState, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import HomePage from './components/HomePage';
import InscripcionesPage from './components/InscripcionesPage';
import EstudiantePage from './components/Login/EstudiantePage';
import EmpresaPage from './components/Login/EmpresaPage';
import PasantiasPage from './components/Empresa/PasantiasPage';
import EstudiantePasantias from './components/Estudiante/EstudiantePasantias';
import './App.css';
import './themes.css';

// Crear contexto para el tema
export const ThemeContext = createContext();

// Hook personalizado para usar el tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <Router>
        <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inscripciones" element={<InscripcionesPage />} />
            <Route path="/estudiante" element={<EstudiantePage />} />
            <Route path="/trabajo" element={<EmpresaPage />} />
            <Route path="/empresa/pasantias" element={<PasantiasPage />} />
            <Route path="/estudiante/pasantias" element={<EstudiantePasantias />} />
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
