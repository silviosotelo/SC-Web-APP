import React from 'react';
import { Gift } from 'lucide-react';

const BenefitsScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-2 text-gray-800">
            <Gift className="text-yellow-500" />
            <h3 className="font-bold">Red de Beneficios</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
            {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 aspect-square shadow-sm">
                    <div className="h-12 w-12 bg-gray-100 rounded-full"></div>
                    <span className="text-sm font-bold text-gray-700">Comercio {i}</span>
                    <span className="text-xs text-green-600 font-bold">-20% DESC</span>
                </div>
            ))}
        </div>
    </div>
  );
};

export default BenefitsScreen;