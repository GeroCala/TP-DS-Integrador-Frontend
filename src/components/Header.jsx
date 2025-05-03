import { Link } from 'react-router-dom';
import logoSAU from '../picturs/Logo-SAU.png';

function Header() {
  return (
    <div className="header">
      <img src={logoSAU} alt="Logo SAU" className="logo" />
      <div className="nav-buttons">
        <Link to="/" className="nav-button">Información</Link>
        <Link to="/inscripciones" className="nav-button">Inscripciones</Link>
      </div>
      <div className="spacer"></div>
    </div>
  );
}

export default Header;