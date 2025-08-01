import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EstudiantePasantias.css';

function EstudiantePasantias() {
  const [pasantias, setPasantias] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const alumnoId = sessionStorage.getItem('alumnoId');
    const alumnoNombre = sessionStorage.getItem('alumnoNombre');
    const alumnoApellido = sessionStorage.getItem('alumnoApellido');
    
    if (!alumnoId) {
      console.log('No hay datos de estudiante en sesión');
      navigate('/estudiante');
      return;
    }

    cargarPasantias();
  }, [navigate]);

  const cargarPasantias = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://tp-ds-integrador-backend.onrender.com/pasantias');
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Pasantías recibidas:', data);

      if (!Array.isArray(data)) {
        throw new Error('Los datos recibidos no son un array');
      }
      
      // Asegurarse de que cada pasantía tenga el nombre de la empresa
      const pasantiasConEmpresa = await Promise.all(data.map(async (pasantia) => {
        if (!pasantia.empresa_nombre && pasantia.empresa_id) {
          try {
            const empresaResponse = await fetch(`https://tp-ds-integrador-backend.onrender.com/empresas/${pasantia.empresa_id}`);
            if (empresaResponse.ok) {
              const empresa = await empresaResponse.json();
              return { ...pasantia, empresa_nombre: empresa.nombre };
            }
          } catch (error) {
            console.error('Error al obtener datos de la empresa:', error);
          }
        }
        return pasantia;
      }));
      
      setPasantias(pasantiasConEmpresa);
      setError('');

    } catch (error) {
      console.error('Error en cargarPasantias:', error);
      setError('Error al cargar las pasantías: ' + error.message);
      setPasantias([]);
    } finally {
      setLoading(false);
    }
  };

  const verDetallePasantia = (id) => {
    navigate(`/estudiante/pasantias/${id}`);
  };

  return (
    <div className="pasantias-container">
      <h2>Pasantías Disponibles</h2>
      <div className="estudiante-info">
        <p>Estudiante: {sessionStorage.getItem('alumnoNombre')} {sessionStorage.getItem('alumnoApellido')}</p>
        <p>Carrera: {sessionStorage.getItem('alumnoCarrera')}</p>
      </div>
      
      {loading && <div className="loading-message">Cargando pasantías...</div>}
      {error && <div className="error-message">{error}</div>}
      
      <div className="pasantias-grid">
        {pasantias.length === 0 && !loading ? (
          <div className="no-pasantias">No hay pasantías disponibles</div>
        ) : (
          pasantias.map((pasantia) => (
            <div 
              key={pasantia.id} 
              className="pasantia-card"
              onClick={() => verDetallePasantia(pasantia.id)}
            >
              <h3>{pasantia.titulo}</h3>
              <div className="empresa-nombre">
                Empresa: {pasantia.empresa_nombre || 'Nombre no disponible'}
              </div>
              <p className="descripcion">{pasantia.descripcion?.substring(0, 150) || ''}...</p>
              <div className="pasantia-footer">
                <span className="duracion">{pasantia.duracion}</span>
                <span className="estado">{pasantia.estado}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EstudiantePasantias;