
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REQUEST_TYPES } from '../../constants';
import { FileText, Shield, RefreshCw, Plane, Upload, Image as ImageIcon } from 'lucide-react';
import Button from '../../components/ui/Button';

const iconMap: Record<string, any> = { FileText, Shield, RefreshCw, Plane };

const RequestsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  if (!selectedRequest) {
    return (
      <div className="p-4 space-y-4">
         <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-gray-800">Tipos de solicitudes</h3>
            <button 
              onClick={() => navigate('/my-requests')}
              className="bg-teal-50 text-teal-700 border border-teal-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-teal-100 transition-colors"
            >
               <FileText size={14} /> Historial
            </button>
         </div>

         <div className="space-y-3">
            {REQUEST_TYPES.map(type => {
                const Icon = iconMap[type.iconName] || FileText;
                return (
                    <button 
                      key={type.id}
                      onClick={() => setSelectedRequest(type.id)}
                      className="w-full bg-gray-100 hover:bg-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-colors"
                    >
                        <div className="text-primary-900 p-2 border border-primary-900/20 rounded-lg bg-white">
                            <Icon size={28} strokeWidth={1.5} />
                        </div>
                        <span className="text-gray-600 font-medium text-sm text-center">{type.label}</span>
                    </button>
                );
            })}
         </div>
      </div>
    );
  }

  // Form View (Simulated for "Visaciones")
  return (
    <div className="p-4 space-y-6 pb-32 animate-fadeIn">
       <div className="flex items-center gap-2 text-primary-900 font-bold text-lg">
           <div className="bg-primary-900 text-white p-1 rounded">
              <FileText size={16} />
           </div>
           <h3>SOLICITUD DE VISACION</h3>
       </div>

       <div className="flex items-center gap-2 mb-4">
           <div className="text-primary-900"><FileText size={20} /></div>
           <h4 className="font-bold text-gray-800 text-md">Datos de la solicitud</h4>
       </div>

       <form className="space-y-4">
           <div>
               <label className="text-xs text-gray-500 mb-1 block">Nombre y Apellido</label>
               <input type="text" value="Silvio Andres Sotelo Machuca" readOnly className="w-full border border-primary-900 rounded-lg px-3 py-3 text-sm" />
           </div>
           <div>
               <label className="text-xs text-gray-500 mb-1 block">Nro de cédula</label>
               <input type="text" value="4895448" readOnly className="w-full border border-primary-900 rounded-lg px-3 py-3 text-sm" />
           </div>
           <div>
               <label className="text-xs text-gray-500 mb-1 block">Correo Electrónico</label>
               <input type="text" value="silvio.sotelo@hotmail.com" readOnly className="w-full border border-primary-900 rounded-lg px-3 py-3 text-sm" />
           </div>
           <div>
               <label className="text-xs text-gray-500 mb-1 block">Celular o Telefono</label>
               <input type="text" value="0994116214" readOnly className="w-full border border-primary-900 rounded-lg px-3 py-3 text-sm" />
           </div>
           <div>
               <textarea placeholder="Lugar de preferencia para análisis o estudio" className="w-full border border-primary-900 rounded-lg px-3 py-3 text-sm h-24 resize-none"></textarea>
           </div>

           <div className="pt-2">
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-primary-900 text-white p-0.5 rounded"><Upload size={14} /></div>
                    <h4 className="font-bold text-gray-800 text-sm">Adjuntos</h4>
                </div>
                
                <div className="border border-primary-900 rounded-lg p-4 mb-2">
                    <p className="text-xs text-gray-600">Formatos admitidos: JPG, PDF, DOC, DOCX, PNG</p>
                </div>

                <div className="flex gap-4">
                    <button type="button" className="flex items-center gap-2 text-primary-900 text-sm font-medium">
                        <div className="bg-primary-900 p-1 rounded text-white"><ImageIcon size={16} /></div>
                        Ver galería
                    </button>
                    <button type="button" className="flex items-center gap-2 text-primary-900 text-sm font-medium">
                        <div className="bg-primary-900 p-1 rounded text-white"><FileText size={16} /></div>
                        Ver documentos
                    </button>
                </div>
           </div>
       </form>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-[85px] left-0 right-0 mx-auto max-w-md p-4 bg-white border-t border-gray-100 z-40 shadow-sm">
             <Button fullWidth onClick={() => navigate('/my-requests')}>
                ENVIAR SOLICITUD
             </Button>
        </div>
    </div>
  );
};

export default RequestsScreen;
