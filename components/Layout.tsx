import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Bell, HelpCircle, ChevronLeft, Menu } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const showBack = location.pathname !== '/dashboard';
  
  // Títulos para las sub-páginas
  const titleMap: Record<string, string> = {
    '/appointments': 'AGENDAR TURNO',
    '/digital-card': 'CARNET DIGITAL',
    '/plan': 'MI PLAN',
    '/guide': 'GUIA MEDICA',
    '/centers': 'CENTROS',
    '/requests': 'SOLICITUDES',
    '/history': 'ESTUDIOS',
    '/invoices': 'FACTURAS',
    '/benefits': 'RED DE BENEFICIOS',
    '/face-id': 'RECONOCIMIENTO FACIAL'
  };

  const currentTitle = titleMap[location.pathname];

  return (
    <div className="h-[100dvh] bg-white flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden">
      {/* Header Fiel al Original */}
      <header className="bg-white px-5 py-4 flex items-center justify-between sticky top-0 z-50">
        {showBack ? (
          <div className="flex items-center gap-2">
             <button 
               onClick={() => navigate(-1)}
               className="text-primary-900 flex items-center font-bold"
             >
               <ChevronLeft size={24} className="text-teal-400" /> 
               <span className="text-lg text-primary-900">Volver</span>
             </button>
          </div>
        ) : (
          // Home Header
          <button className="text-black">
            <Menu size={28} strokeWidth={2} />
          </button>
        )}

        {/* Logo a la derecha */}
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

      {/* Sub-header title si no es dashboard */}
      {showBack && currentTitle && (
         <div className="px-5 pb-2">
            <div className="flex items-center gap-2 mb-1">
                {/* Optional Icon based on screen? Leaving simple for now */}
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800 uppercase flex items-center gap-2">
                 {currentTitle}
              </h2>
              
              {/* Icono verde especifico para Face ID */}
              {location.pathname === '/face-id' && (
                <div className="bg-green-500 text-white px-2 py-1 rounded-md shadow-sm flex items-center justify-center">
                    <span className="font-bold text-[10px] tracking-tighter">((•))</span>
                </div>
              )}
            </div>
         </div>
      )}

      {/* Main Content Area */}
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
            onClick={() => {}}
        />
        <NavItem 
            icon={<Bell size={24} />} 
            label="Recordatorios" 
            active={false}
            onClick={() => {}}
        />
        <NavItem 
            icon={<HelpCircle size={24} />} 
            label="Ayuda" 
            active={false}
            onClick={() => {}}
        />
      </nav>
    </div>
  );
};

// Helper Components
const NavItem = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 ${active ? 'text-teal-400' : 'text-gray-400'}`}
  >
    <div className={active ? 'text-teal-400' : 'text-teal-100'}>
      {React.cloneElement(icon as React.ReactElement<any>, { 
          color: active ? '#26A69A' : '#B2DFDB', // Teal 400 vs Teal 100
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