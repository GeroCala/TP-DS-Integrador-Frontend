import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function EmpresaPage() {
  const [credentials, setCredentials] = useState({
    nombre: '',
    cuit: ''
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
      const response = await fetch('https://tp-ds-integrador-backend.onrender.com/empresas');
      const empresas = await response.json();
      
      const empresa = empresas.find(
        e => e.nombre === credentials.nombre && e.cuit === credentials.cuit
      );
      
      if (empresa) {
        console.log('Empresa encontrada:', empresa);
        sessionStorage.setItem('empresaId', empresa.id);
        sessionStorage.setItem('empresaNombre', empresa.nombre);
        sessionStorage.setItem('empresaCuit', empresa.cuit);
        navigate('/empresa/pasantias');
      } else {
        console.log('No se encontró la empresa');
        setError('Nombre de empresa o CUIT incorrectos');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Acceso Empresas</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre de la Empresa</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={credentials.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cuit">CUIT</label>
            <input
              type="text"
              id="cuit"
              name="cuit"
              value={credentials.cuit}
              onChange={handleChange}
              placeholder="XX-XXXXXXXX-X"
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

export default EmpresaPage;