import React from 'react';
import { Upload, FileSearch, FolderPlus } from 'lucide-react';

const ClinicalHistoryScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
        <h3 className="font-bold text-gray-800 text-lg mb-4">Estudios médicos</h3>

        <div className="space-y-4">
            <button className="w-full bg-gray-100 rounded-xl py-8 px-4 flex flex-col items-center justify-center gap-3 shadow-sm">
                <div className="p-2 border border-primary-900/30 rounded-lg">
                    <Upload className="text-primary-900" size={32} strokeWidth={1.5} />
                </div>
                <span className="text-gray-500 font-medium">Cargar estudio</span>
            </button>

            <button className="w-full bg-gray-100 rounded-xl py-8 px-4 flex flex-col items-center justify-center gap-3 shadow-sm">
                <div className="p-2 border border-primary-900/30 rounded-lg">
                    <FileSearch className="text-primary-900" size={32} strokeWidth={1.5} />
                </div>
                <span className="text-gray-500 font-medium">Ver mis estudios</span>
            </button>

            <button className="w-full bg-gray-100 rounded-xl py-8 px-4 flex flex-col items-center justify-center gap-3 shadow-sm">
                <div className="p-2 border border-primary-900/30 rounded-lg">
                    <FolderPlus className="text-primary-900" size={32} strokeWidth={1.5} />
                </div>
                <span className="text-gray-500 font-medium">Resultados de análisis</span>
            </button>
        </div>
    </div>
  );
};

export default ClinicalHistoryScreen;