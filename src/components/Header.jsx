import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import logoSAU from '../picturs/Logo-SAU.png';

function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="header">
      <img src={logoSAU} alt="Logo SAU" className="logo" />
      <div className="nav-buttons">
        <Link to="/" className="nav-button">Información</Link>
        <Link to="/inscripciones" className="nav-button">Inscripciones</Link>
      </div>
      <div className="spacer"></div>
      <button 
        onClick={toggleTheme} 
        className="theme-toggle-button"
        title={isDarkMode ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

export default Header;