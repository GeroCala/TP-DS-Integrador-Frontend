import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasantiasPage.css';

function PasantiasPage() {
  const [pasantias, setPasantias] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const empresaId = sessionStorage.getItem('empresaId');
    const empresaNombre = sessionStorage.getItem('empresaNombre');
    
    console.log('Datos de sesión:', { empresaId, empresaNombre });
    
    if (!empresaId || !empresaNombre) {
      console.log('No hay datos de empresa en sesión');
      navigate('/trabajo');
      return;
    }

    cargarPasantias();
  }, [navigate]);

  const cargarPasantias = async () => {
    try {
      setLoading(true);
      const empresaId = sessionStorage.getItem('empresaId');
      console.log('Cargando pasantías para empresa ID:', empresaId);

      const response = await fetch('http://localhost:3000/pasantias');
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Todas las pasantías recibidas:', data);

      if (!Array.isArray(data)) {
        throw new Error('Los datos recibidos no son un array');
      }

      // Filtrar pasantías por empresa_id
      const pasantiasFiltradas = data.filter(pasantia => 
        pasantia.empresa_id === parseInt(empresaId)
      );
      
      console.log('Pasantías filtradas por empresa_id:', pasantiasFiltradas);
      setPasantias(pasantiasFiltradas);
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
    navigate(`/empresa/pasantias/${id}`);
  };

  return (
    <div className="pasantias-container">
      <h2>Pasantías de {sessionStorage.getItem('empresaNombre')}</h2>
      {loading && <div className="loading-message">Cargando pasantías...</div>}
      {error && <div className="error-message">{error}</div>}
      
      <div className="pasantias-grid">
        {pasantias.length === 0 && !loading ? (
          <div className="no-pasantias">No hay pasantías disponibles para esta empresa</div>
        ) : (
          pasantias.map((pasantia) => (
            <div 
              key={pasantia.id} 
              className="pasantia-card"
              onClick={() => verDetallePasantia(pasantia.id)}
            >
              <h3>{pasantia.titulo}</h3>
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

export default PasantiasPage;