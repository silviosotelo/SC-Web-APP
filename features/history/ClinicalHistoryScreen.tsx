import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileSearch, FolderPlus } from 'lucide-react';

const ClinicalHistoryScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6">
        <h3 className="font-bold text-gray-800 text-lg mb-4">Estudios médicos</h3>

        <div className="space-y-4">
            <button 
              onClick={() => navigate('/history/upload')}
              className="w-full bg-gray-100 hover:bg-gray-200 rounded-xl py-8 px-4 flex flex-col items-center justify-center gap-3 shadow-sm transition-colors active:scale-[0.98]"
            >
                <div className="p-2 border border-primary-900/30 rounded-lg bg-white">
                    <Upload className="text-primary-900" size={32} strokeWidth={1.5} />
                </div>
                <span className="text-gray-500 font-medium">Cargar estudio</span>
            </button>

            <button 
              onClick={() => navigate('/history/studies')}
              className="w-full bg-gray-100 hover:bg-gray-200 rounded-xl py-8 px-4 flex flex-col items-center justify-center gap-3 shadow-sm transition-colors active:scale-[0.98]"
            >
                <div className="p-2 border border-primary-900/30 rounded-lg bg-white">
                    <FileSearch className="text-primary-900" size={32} strokeWidth={1.5} />
                </div>
                <span className="text-gray-500 font-medium">Ver mis estudios</span>
            </button>

            <button 
              onClick={() => navigate('/history/results')}
              className="w-full bg-gray-100 hover:bg-gray-200 rounded-xl py-8 px-4 flex flex-col items-center justify-center gap-3 shadow-sm transition-colors active:scale-[0.98]"
            >
                <div className="p-2 border border-primary-900/30 rounded-lg bg-white">
                    <FolderPlus className="text-primary-900" size={32} strokeWidth={1.5} />
                </div>
                <span className="text-gray-500 font-medium">Resultados de análisis</span>
            </button>
        </div>
    </div>
  );
};

export default ClinicalHistoryScreen;