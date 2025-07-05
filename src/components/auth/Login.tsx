import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!apiKey.trim()) {
      setError('La API Key es obligatoria');
      setLoading(false);
      return;
    }
    try {
      localStorage.setItem('apiKey', apiKey);
      setError('');
      navigate('/dashboard');
    } catch (e) {
      setError('API Key inválida');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
    setError('');
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="apiKey">API Key:</label>
        <input
          id="apiKey"
          type="text"
          value={apiKey}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 8 }}
        />
        {loading && <div style={{ color: 'blue', marginBottom: 8 }}>Validando...</div>}
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <button type="submit" disabled={loading}>Entrar</button>
      </form>
    </div>
  );
};

export default Login;
