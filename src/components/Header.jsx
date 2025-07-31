import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import logoSAU from '../picturs/Logo-SAU.png';

function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="header">
      <div className="header-content">
        <img src={logoSAU} alt="Logo SAU" className="logo" />
        
        {/* Menú hamburguesa para móviles */}
        <button 
          className="hamburger-menu"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Navegación desktop */}
        <nav className="nav-desktop">
          <Link to="/" className="nav-button">Información</Link>
          <Link to="/inscripciones" className="nav-button">Inscripciones</Link>
        </nav>

        {/* Botón de tema */}
        <button 
          onClick={toggleTheme} 
          className="theme-toggle-button"
          title={isDarkMode ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Menú móvil */}
      <nav className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-button" onClick={closeMenu}>Información</Link>
        <Link to="/inscripciones" className="nav-button" onClick={closeMenu}>Inscripciones</Link>
      </nav>
    </div>
  );
}

export default Header;