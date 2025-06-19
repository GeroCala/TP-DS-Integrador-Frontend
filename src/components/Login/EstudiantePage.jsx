import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function EstudiantePage() {
  const [credentials, setCredentials] = useState({
    legajo: '',
    dni: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:3000/alumnos');
      const alumnos = await response.json();
      
      const alumno = alumnos.find(
        a => a.legajo === credentials.legajo && a.dni === credentials.dni
      );
      
      if (alumno) {
        // Guardar toda la información del alumno en sessionStorage
        sessionStorage.setItem('alumnoId', alumno.id);
        sessionStorage.setItem('alumnoLegajo', alumno.legajo);
        sessionStorage.setItem('alumnoNombre', alumno.nombre);
        sessionStorage.setItem('alumnoApellido', alumno.apellido);
        sessionStorage.setItem('alumnoDni', alumno.dni);
        sessionStorage.setItem('alumnoCarrera', alumno.carrera);
        sessionStorage.setItem('alumnoEmail', alumno.email);
        navigate('/estudiante/pasantias');
      } else {
        setError('Legajo o DNI incorrectos');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Acceso Estudiantes</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="legajo">Legajo</label>
            <input
              type="text"
              id="legajo"
              name="legajo"
              value={credentials.legajo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dni">DNI</label>
            <input
              type="password"
              id="dni"
              name="dni"
              value={credentials.dni}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default EstudiantePage;