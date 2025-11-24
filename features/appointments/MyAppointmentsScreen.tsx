
import React, { useState, useContext } from 'react';
import { MY_APPOINTMENTS } from '../../constants';
import { Calendar, Clock, MapPin, User, XCircle } from 'lucide-react';
import { ToastContext } from '../../components/Layout';

const MyAppointmentsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [appointments, setAppointments] = useState(MY_APPOINTMENTS);
  const { showToast } = useContext(ToastContext);

  const filteredApps = appointments.filter(app => {
    if (activeTab === 'upcoming') return app.status === 'confirmed';
    return app.status !== 'confirmed';
  });

  const handleCancel = (id: string) => {
    if (window.confirm('¿Estás seguro que deseas cancelar este turno?')) {
        setAppointments(prev => prev.map(app => 
            app.id === id ? { ...app, status: 'cancelled' } : app
        ));
        showToast('Turno cancelado correctamente', 'info');
    }
  };

  return (
    <div className="bg-gray-50 min-h-full pb-6 animate-fadeIn">
      {/* Tabs */}
      <div className="bg-white flex border-b border-gray-200">
        <button 
           onClick={() => setActiveTab('upcoming')}
           className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === 'upcoming' ? 'border-primary-900 text-primary-900' : 'border-transparent text-gray-400'}`}
        >
           PRÓXIMOS
        </button>
        <button 
           onClick={() => setActiveTab('history')}
           className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === 'history' ? 'border-primary-900 text-primary-900' : 'border-transparent text-gray-400'}`}
        >
           HISTORIAL
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
         {filteredApps.length === 0 ? (
             <div className="text-center py-12">
                 <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Calendar size={32} className="text-gray-300" />
                 </div>
                 <p className="text-gray-500 font-medium">No tienes turnos en esta sección</p>
             </div>
         ) : (
             filteredApps.map(app => (
                 <div key={app.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
                     {/* Left color strip */}
                     <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${app.status === 'confirmed' ? 'bg-green-500' : app.status === 'cancelled' ? 'bg-red-400' : 'bg-gray-300'}`}></div>

                     <div className="flex justify-between items-start mb-3">
                         <div>
                             <span className="bg-primary-50 text-primary-900 text-[10px] font-bold px-2 py-1 rounded uppercase">
                                 {app.specialty}
                             </span>
                             <h3 className="font-bold text-gray-900 mt-2">{app.doctorName}</h3>
                         </div>
                         {app.status === 'confirmed' && (
                            <button 
                                onClick={() => handleCancel(app.id)}
                                className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
                            >
                                <XCircle size={20} />
                            </button>
                         )}
                     </div>

                     <div className="space-y-2 text-sm text-gray-600">
                         <div className="flex items-center gap-2">
                             <Calendar size={16} className="text-gray-400" />
                             <span>{app.date}</span>
                         </div>
                         <div className="flex items-center gap-2">
                             <Clock size={16} className="text-gray-400" />
                             <span>{app.time}</span>
                         </div>
                         <div className="flex items-center gap-2">
                             <MapPin size={16} className="text-gray-400" />
                             <span>{app.location}</span>
                         </div>
                         <div className="flex items-center gap-2">
                             <User size={16} className="text-gray-400" />
                             <span className="text-xs">Paciente: {app.patientName}</span>
                         </div>
                     </div>

                     <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                         {app.status === 'confirmed' ? (
                             <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">CONFIRMADO</span>
                         ) : app.status === 'cancelled' ? (
                             <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">CANCELADO</span>
                         ) : (
                             <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">FINALIZADO</span>
                         )}
                     </div>
                 </div>
             ))
         )}
      </div>
    </div>
  );
};

export default MyAppointmentsScreen;
