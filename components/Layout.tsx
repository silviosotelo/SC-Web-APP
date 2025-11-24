
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Bell, HelpCircle, ChevronLeft, Menu, User, LogOut, Settings, FileText, Ambulance } from 'lucide-react';
import Toast, { ToastMessage } from './ui/Toast';

// Context para Toasts (simplificado para este prototipo)
export const ToastContext = React.createContext<{ showToast: (msg: string, type: 'success'|'error'|'info') => void }>({ showToast: () => {} });

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showBack = location.pathname !== '/dashboard';

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Action Handlers
  const handleAmbulance = () => {
    window.open('tel:+59521123456');
  };

  const handleHelp = () => {
    window.open('https://wa.me/595900000000');
  };

  // Title Mapping
  const titleMap: Record<string, string> = {
    '/appointments': 'AGENDAR TURNO',
    '/my-appointments': 'MIS TURNOS',
    '/digital-card': 'CARNET DIGITAL',
    '/plan': 'MI PLAN',
    '/guide': 'GUIA MEDICA',
    '/centers': 'CENTROS',
    '/requests': 'SOLICITUDES',
    '/my-requests': 'MIS SOLICITUDES',
    '/history': 'ESTUDIOS',
    '/history/upload': 'ESTUDIOS',
    '/history/results': 'RESULTADOS DE ANÁLISIS',
    '/history/studies': 'VER MIS ESTUDIOS',
    '/history/detail': 'ADJUNTOS',
    '/history/study-detail': 'VISOR DE IMÁGENES',
    '/invoices': 'FACTURAS',
    '/payment': 'PAGO ONLINE',
    '/benefits': 'RED DE BENEFICIOS',
    '/face-id': 'RECONOCIMIENTO FACIAL',
    '/notifications': 'RECORDATORIOS'
  };

  const handleBack = () => {
    navigate(-1);
  };

  const currentTitle = titleMap[location.pathname] || 'SANTA CLARA';

  return (
    <ToastContext.Provider value={{ showToast }}>
    <div className="h-[100dvh] bg-white flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden">
      
      {/* SIDE DRAWER / MENU LATERAL */}
      {isDrawerOpen && (
        <div className="absolute inset-0 z-[60] flex">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
                onClick={() => setIsDrawerOpen(false)}
            ></div>
            
            {/* Drawer Content */}
            <div className="relative w-[80%] h-full bg-white shadow-2xl animate-slideRight flex flex-col">
                {/* Drawer Header */}
                <div className="bg-primary-900 p-6 text-white pt-12">
                    <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-primary-900 text-2xl font-bold mb-3">
                        JL
                    </div>
                    <h3 className="font-bold text-lg">Jose Luis Cino</h3>
                    <p className="text-xs text-primary-200">Plan Santa Clara Superior</p>
                </div>

                {/* Drawer Menu */}
                <div className="flex-1 overflow-y-auto py-4">
                    <button onClick={() => { navigate('/my-appointments'); setIsDrawerOpen(false); }} className="w-full px-6 py-4 flex items-center gap-4 text-gray-700 hover:bg-gray-50">
                        <FileText size={20} /> <span className="font-medium">Mis Turnos</span>
                    </button>
                    <button onClick={() => { navigate('/my-requests'); setIsDrawerOpen(false); }} className="w-full px-6 py-4 flex items-center gap-4 text-gray-700 hover:bg-gray-50">
                        <FileText size={20} /> <span className="font-medium">Mis Solicitudes</span>
                    </button>
                    <button className="w-full px-6 py-4 flex items-center gap-4 text-gray-700 hover:bg-gray-50">
                        <User size={20} /> <span className="font-medium">Mi Perfil</span>
                    </button>
                    <button className="w-full px-6 py-4 flex items-center gap-4 text-gray-700 hover:bg-gray-50">
                        <Settings size={20} /> <span className="font-medium">Configuración</span>
                    </button>
                    <div className="border-t my-2"></div>
                    <button onClick={() => navigate('/login')} className="w-full px-6 py-4 flex items-center gap-4 text-red-600 hover:bg-red-50">
                        <LogOut size={20} /> <span className="font-medium">Cerrar Sesión</span>
                    </button>
                </div>

                <div className="p-4 text-center text-xs text-gray-400">
                    v2.0.0
                </div>
            </div>
        </div>
      )}

      {/* TOAST CONTAINER */}
      <div className="absolute top-20 left-0 right-0 z-[70] pointer-events-none px-4">
         {toasts.map(toast => (
             <div key={toast.id} className="pointer-events-auto">
                 <Toast toast={toast} onClose={removeToast} />
             </div>
         ))}
      </div>

      {/* Header */}
      <header className="bg-white px-5 py-4 flex items-center justify-between sticky top-0 z-50">
        {showBack ? (
          <div className="flex items-center gap-2">
             <button 
               onClick={handleBack}
               className="text-primary-900 flex items-center font-bold"
             >
               <ChevronLeft size={24} className="text-teal-400" /> 
               <span className="text-lg text-primary-900">Volver</span>
             </button>
          </div>
        ) : (
          <button className="text-black" onClick={() => setIsDrawerOpen(true)}>
            <Menu size={28} strokeWidth={2} />
          </button>
        )}

        <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
               <div className="flex items-center gap-1">
                  <div className="h-6 w-6 bg-teal-400 rounded-tr-lg rounded-bl-lg"></div>
                  <div className="flex flex-col">
                    <span className="text-primary-900 font-bold text-sm leading-none">Santa Clara</span>
                    <span className="text-[8px] text-primary-900 leading-none tracking-wider">medicina prepaga</span>
                  </div>
               </div>
            </div>
        </div>
      </header>

      {showBack && currentTitle && (
         <div className="px-5 pb-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800 uppercase flex items-center gap-2">
                 {currentTitle}
              </h2>
              {location.pathname === '/face-id' && (
                <div className="bg-green-500 text-white px-2 py-1 rounded-md shadow-sm flex items-center justify-center">
                    <span className="font-bold text-[10px] tracking-tighter">((•))</span>
                </div>
              )}
            </div>
         </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 no-scrollbar relative">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-6 py-2 flex justify-between items-end pb-6 z-50">
        <NavItem 
            icon={<Home size={24} />} 
            label="Inicio" 
            active={location.pathname === '/dashboard'} 
            onClick={() => navigate('/dashboard')}
        />
        <NavItem 
            icon={<AmbulanceIcon />} 
            label="Ambulancia" 
            active={false}
            onClick={handleAmbulance}
        />
        <NavItem 
            icon={<Bell size={24} />} 
            label="Recordatorios" 
            active={location.pathname === '/notifications'}
            onClick={() => navigate('/notifications')}
        />
        <NavItem 
            icon={<HelpCircle size={24} />} 
            label="Ayuda" 
            active={false}
            onClick={handleHelp}
        />
      </nav>
    </div>
    </ToastContext.Provider>
  );
};

const NavItem = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 ${active ? 'text-teal-400' : 'text-gray-400'}`}
  >
    <div className={active ? 'text-teal-400' : 'text-teal-100'}>
      {React.cloneElement(icon as React.ReactElement<any>, { 
          color: active ? '#26A69A' : '#B2DFDB', 
          strokeWidth: 1.5 
      })}
    </div>
    <span className={`text-[10px] ${active ? 'text-teal-500 font-medium' : 'text-gray-500'}`}>{label}</span>
  </button>
);

const AmbulanceIcon = (props: any) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="1" y="6" width="22" height="12" rx="2" />
        <path d="M12 10v4" />
        <path d="M10 12h4" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
    </svg>
)

export default Layout;
