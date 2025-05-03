import { Link } from 'react-router-dom';

function InscripcionesPage() {
  return (
    <div className="registration-container">
      <h2>¿Qué quiere registrar?</h2>
      <div className="button-container">
        <Link to="/estudiante" className="registration-button">Estudiante</Link>
        <Link to="/trabajo" className="registration-button">Puesto de trabajo</Link>
      </div>
    </div>
  );
}

export default InscripcionesPage;