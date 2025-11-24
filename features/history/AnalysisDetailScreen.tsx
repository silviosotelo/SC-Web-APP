import React from 'react';
import { Download, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const AnalysisDetailScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-4 pb-24 animate-fadeIn">
        {/* Action Header */}
        <div className="flex justify-end">
            <Button 
              variant="primary"
              className="flex items-center gap-2 py-2 px-4 h-auto text-xs bg-primary-900 text-white rounded-lg"
            >
                <Download size={16} />
                Descargar
            </Button>
        </div>

        {/* PDF Simulation Container */}
        <div className="bg-white shadow-lg border border-gray-200 rounded-sm overflow-hidden">
            {/* PDF Header */}
            <div className="p-4 border-b border-gray-300 flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-red-700 rounded flex items-center justify-center text-white font-bold text-xl">
                        L
                    </div>
                    <div>
                        <h3 className="font-bold text-red-700 text-xs">CENTRO DE BIOQUIMICA CLINICA</h3>
                        <p className="text-[8px] text-gray-500 max-w-[150px] leading-tight">
                            Casa Central: Parapití N° 1216 - (021) 447878
                        </p>
                    </div>
                </div>
                <div className="bg-gray-500 text-white px-2 py-0.5 text-[10px] font-bold rounded-sm">
                    1/4
                </div>
            </div>

            {/* Patient Info */}
            <div className="bg-gray-50 p-2 text-[8px] grid grid-cols-2 gap-x-4 gap-y-1 border-b border-gray-300">
                <div><span className="font-bold">Fecha Extraccion:</span> 13/06/24 8:01</div>
                <div><span className="font-bold">Paciente:</span> FRANCISCO JAVIER CABALLERO BOGARIN</div>
                <div><span className="font-bold">Sucursal:</span> LABORATORIO CBC - VILLAMORRA</div>
                <div><span className="font-bold">CI:</span> 2484930</div>
                <div><span className="font-bold">Medico:</span> MARIA PANIAGUA</div>
                <div><span className="font-bold">Sexo:</span> MASCULINO</div>
            </div>

            {/* Table Header */}
            <div className="bg-red-900 text-white text-[8px] font-bold flex px-2 py-1">
                <div className="w-1/3">ANALISIS</div>
                <div className="w-1/3 text-center">RESULTADOS</div>
                <div className="w-1/3 text-right">INTERVALO DE REFERENCIA</div>
            </div>

            {/* Table Body */}
            <div className="p-2 text-[9px] space-y-2 font-mono text-gray-800">
                <p className="font-bold underline">HEMATOLOGIA</p>
                <p className="font-bold">HEMOGRAMA</p>
                
                <div className="space-y-1">
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span>Globulos Rojos</span>
                        <span className="font-bold">4.670.000 /mm3</span>
                        <span className="text-gray-500 text-[7px]">4.500.000 - 5.500.000 /mm3</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span>Hemoglobina</span>
                        <span className="font-bold">15.2 g/dL</span>
                        <span className="text-gray-500 text-[7px]">13.0 - 17.0 g/dL</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span>Hematocrito</span>
                        <span className="font-bold">42.6 %</span>
                        <span className="text-gray-500 text-[7px]">40.0 - 50.0 %</span>
                    </div>
                     <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span>VCM</span>
                        <span className="font-bold text-red-600">91.3 u3</span>
                        <span className="text-gray-500 text-[7px]">83 - 101 u3</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span>HCM</span>
                        <span className="font-bold text-red-600">32.6 pg</span>
                        <span className="text-gray-500 text-[7px]">27.0 - 32.0 pg</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span>CMHC</span>
                        <span className="font-bold">35.8 g/dL</span>
                        <span className="text-gray-500 text-[7px]">31.0 - 36.0 g/dL</span>
                    </div>
                </div>
            </div>
            
            {/* Footer Simulation */}
            <div className="border-t border-gray-200 p-2 mt-4">
                <div className="flex justify-between items-end">
                    <div className="text-red-700 font-serif italic text-lg font-bold">cbc</div>
                    <div className="text-[6px] text-center text-gray-600">
                        <div className="h-8 border-b border-gray-400 mb-1 w-20 mx-auto"></div>
                        <p className="font-bold">Dra. Lidia Lorena Marin</p>
                        <p>Bioquimica</p>
                        <p>Registro Prof. N° 3302</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AnalysisDetailScreen;