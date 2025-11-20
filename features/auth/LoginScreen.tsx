import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 max-w-md mx-auto shadow-2xl bg-white">
      <div className="w-full max-w-sm space-y-8">
        
        {/* Logo Area */}
        <div className="flex flex-col items-center space-y-2">
          <div className="h-20 w-20 bg-primary-900 rounded-2xl flex items-center justify-center shadow-xl shadow-primary-900/20 mb-4">
             <span className="text-4xl font-bold text-white">SC</span>
          </div>
          <h2 className="text-2xl font-bold text-primary-900">Bienvenido</h2>
          <p className="text-gray-500 text-center">Ingresa tus credenciales para acceder a tu plan de salud.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nro. de Cédula</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="Ej: 1.234.567"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button type="button" className="text-sm font-medium text-primary-700 hover:text-primary-900">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <Button type="submit" fullWidth isLoading={loading}>
            INGRESAR
          </Button>
        </form>

        {/* Footer Actions */}
        <div className="space-y-4 pt-4 text-center">
          <button className="block w-full text-sm text-gray-600 hover:text-primary-700 font-medium">
            No tengo cuenta, quiero registrarme
          </button>
          <div className="h-px w-full bg-gray-200"></div>
          <button className="flex items-center justify-center gap-2 w-full text-sm text-secondary-600 font-medium">
            <span>💬</span> Atención online
          </button>
        </div>

         <div className="pt-8 text-center">
            <p className="text-xs text-gray-400">Versión 2.0.0 • Santa Clara Medicina Prepaga</p>
         </div>
      </div>
    </div>
  );
};

export default LoginScreen;