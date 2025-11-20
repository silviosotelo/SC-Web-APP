import React from 'react';
import { PLAN_DETAILS } from '../../constants';
import { Search, Shield } from 'lucide-react';

const PlanScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
       {/* Header info */}
       <div className="flex items-center gap-2 text-gray-700">
           <Shield size={20} />
           <span className="font-medium">Mi plan (cobertura)</span>
       </div>

       {/* Search */}
       <div className="relative">
           <Search className="absolute left-3 top-3 text-gray-400" size={20} />
           <input 
             type="text" 
             placeholder="Buscar"
             className="w-full py-2.5 pl-10 pr-4 border border-gray-400 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary-900"
           />
       </div>

       {/* Plan Title */}
       <div className="py-2">
          <h3 className="font-bold text-sm text-gray-900">PLAN SANTA CLARA SUPERIOR</h3>
       </div>

       {/* Content List */}
       <div className="space-y-6">
           <h4 className="text-sm font-bold text-gray-800 uppercase">ANEXO I</h4>
           <h4 className="text-sm font-bold text-gray-800 uppercase">DETALLE DE COBERTURAS Y CARENCIAS</h4>
           
           <div className="grid grid-cols-2 gap-4 text-xs font-bold text-gray-800 uppercase border-b border-gray-200 pb-2">
               <div>CONCEPTO</div>
               <div>CARENCIAS</div>
           </div>

           <div className="grid grid-cols-1 gap-2 text-xs font-bold text-gray-800 uppercase pt-2">
               <div>LÍMITE</div>
               <div>COBERTURAS</div>
           </div>

           <div className="space-y-6">
               {PLAN_DETAILS.map((item, index) => (
                   <div key={index} className="space-y-1">
                       <div className="flex items-start gap-2">
                           <span className="text-gray-600 text-sm">{index + 1}</span>
                       </div>
                       <p className="text-sm text-gray-700">{item.title}</p>
                       {index === 0 && <p className="text-xs font-bold uppercase mt-1">INMEDIATA</p>}
                       <p className="text-xs text-gray-600 font-light mt-1">{index + 1}.1</p>
                       <p className="text-xs text-gray-500">{item.content}</p>
                   </div>
               ))}
           </div>
       </div>
    </div>
  );
};

export default PlanScreen;