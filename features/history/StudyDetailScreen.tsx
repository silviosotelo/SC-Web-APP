import React from 'react';
import { ZoomIn, ZoomOut, Sun, Share2, Info } from 'lucide-react';

const StudyDetailScreen: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-black animate-fadeIn">
        {/* Metadata Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 text-white">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-sm">RADIOGRAFÍA DE TÓRAX (AP/LAT)</h3>
                    <p className="text-[10px] text-gray-300 mt-1">PACIENTE: Jose Luis Fernando Cino</p>
                    <p className="text-[10px] text-gray-300">FECHA: 15/08/2025 • ID: #IMG-8923</p>
                </div>
                <div className="bg-white/10 p-2 rounded-full">
                    <Info size={16} />
                </div>
            </div>
        </div>

        {/* Main Image Container */}
        <div className="flex-1 flex items-center justify-center overflow-hidden relative">
            {/* Simulated X-Ray Image */}
            <img 
                src="https://images.unsplash.com/photo-1530497610245-94d3c16cda48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="X-Ray" 
                className="max-w-full max-h-full object-contain opacity-90 grayscale contrast-125"
            />
            
            {/* Scale/Ruler Simulation */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1 h-64 bg-gray-700 flex flex-col justify-between py-1">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-3 h-px bg-gray-400"></div>
                ))}
            </div>
             <div className="absolute bottom-24 right-4 text-[10px] text-gray-500 font-mono">
                R
            </div>
             <div className="absolute bottom-24 left-10 text-[10px] text-gray-500 font-mono">
                L
            </div>
        </div>

        {/* Toolbar */}
        <div className="bg-gray-900 p-4 pb-10 flex items-center justify-between border-t border-gray-800">
            <div className="flex gap-6 mx-auto">
                <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
                    <ZoomOut size={24} />
                    <span className="text-[10px]">Alejar</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
                    <ZoomIn size={24} />
                    <span className="text-[10px]">Acercar</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
                    <Sun size={24} />
                    <span className="text-[10px]">Contraste</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors">
                    <Share2 size={24} />
                    <span className="text-[10px]">Compartir</span>
                </button>
            </div>
        </div>
    </div>
  );
};

export default StudyDetailScreen;