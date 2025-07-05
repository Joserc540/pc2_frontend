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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700">Iniciar Sesión</h2>
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
            API Key:
          </label>
          <input
            id="apiKey"
            type="text"
            value={apiKey}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            autoFocus
          />
        </div>
        {loading && <div className="text-blue-600 text-sm">Validando...</div>}
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
