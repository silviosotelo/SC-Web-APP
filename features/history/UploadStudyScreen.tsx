
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Image as ImageIcon, FileText, ChevronDown } from 'lucide-react';
import Button from '../../components/ui/Button';
import StatusFeedback from '../../components/ui/StatusFeedback';

const UploadStudyScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpload = () => {
    setIsLoading(true);
    // Simulate API upload delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
      return (
          <StatusFeedback 
            type="success"
            title="¡Estudio Cargado!"
            message="Tu estudio médico ha sido subido correctamente al historial."
            primaryActionLabel="Volver a Historia Clínica"
            onPrimaryAction={() => navigate('/history')}
          />
      )
  }

  return (
    <div className="p-4 space-y-6 pb-32 animate-fadeIn">
       {/* Header Icon */}
       <div className="flex items-center gap-2 text-primary-900 font-bold text-lg">
           <div className="bg-primary-900 text-white p-1 rounded">
              <Upload size={16} />
           </div>
           <h3>CARGAR ESTUDIO</h3>
       </div>

       <div className="flex items-center gap-2 mb-2">
           <div className="text-primary-900"><FileText size={20} /></div>
           <h4 className="font-bold text-gray-800 text-md">Datos del estudio</h4>
       </div>

       <form className="space-y-4">
           {/* Tipo Estudio */}
           <div className="relative border border-primary-900 rounded-xl px-4 py-3">
               <label className="text-xs text-gray-500 absolute -top-2 left-3 bg-white px-1">Tipo Estudio</label>
               <div className="flex items-center justify-between text-sm text-gray-800">
                   <span>Análisis Laboratoriales</span>
                   <ChevronDown size={16} className="text-gray-500" />
               </div>
           </div>

           {/* Descripcion */}
           <div className="relative">
               <input 
                 type="text" 
                 placeholder="Nombre o descripción del estudio"
                 className="w-full border border-primary-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary-900" 
               />
           </div>

           {/* Observacion */}
           <div className="relative">
               <textarea 
                 placeholder="Observación o comentario adicional de la solicitud"
                 className="w-full border border-primary-900 rounded-xl px-4 py-3 text-sm h-32 resize-none focus:outline-none focus:ring-1 focus:ring-primary-900"
               ></textarea>
           </div>

           {/* Adjuntos Section */}
           <div className="pt-2">
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-primary-900 text-white p-0.5 rounded"><Upload size={14} /></div>
                    <h4 className="font-bold text-gray-800 text-sm">Adjuntos</h4>
                </div>
                
                {/* Upload Areas */}
                <div className="space-y-3">
                    <button type="button" className="w-full border border-primary-900 rounded-xl px-4 py-4 text-left hover:bg-gray-50 transition-colors">
                        <p className="text-sm font-medium text-gray-700">Subir un archivo</p>
                        <p className="text-[10px] text-gray-500 mt-1">Admitidos: JPG, PDF, DOC, DOCX, PNG</p>
                    </button>

                    <div className="flex items-center gap-2 text-primary-900 font-medium text-sm pl-1">
                        <ImageIcon size={18} />
                        <span>Ver galería</span>
                    </div>

                    <button type="button" className="w-full border border-primary-900 rounded-xl px-4 py-4 text-left hover:bg-gray-50 transition-colors">
                        <p className="text-sm font-medium text-gray-700">Subir un archivo</p>
                        <p className="text-[10px] text-gray-500 mt-1">Admitidos: JPG, PDF, DOC, DOCX, PNG</p>
                    </button>

                    <div className="flex items-center gap-2 text-primary-900 font-medium text-sm pl-1">
                        <FileText size={18} />
                        <span>Ver documentos</span>
                    </div>
                </div>
           </div>
       </form>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-[85px] left-0 right-0 mx-auto max-w-md p-4 bg-white border-t border-gray-100 z-40 shadow-sm">
             <Button 
               fullWidth 
               onClick={handleUpload}
               isLoading={isLoading}
             >
                CARGAR ESTUDIO
             </Button>
        </div>
    </div>
  );
};

export default UploadStudyScreen;
