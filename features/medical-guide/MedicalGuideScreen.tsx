
import React, { useState } from 'react';
import { DOCTORS } from '../../constants';
import { Search, X, Phone } from 'lucide-react';
import Button from '../../components/ui/Button';
import ViewToggle from '../../components/ui/ViewToggle';
import Skeleton from '../../components/ui/Skeleton';
import { useLoading } from '../../hooks/useLoading';

const MedicalGuideScreen: React.FC = () => {
  const [view, setView] = useState<'list' | 'map'>('list');
  const isLoading = useLoading('medical-guide', 1200);

  return (
    <div className="bg-gray-50 min-h-full pb-32 relative animate-fadeIn">
       {/* Reusable View Toggle */}
       <ViewToggle view={view} setView={setView} />

       <div className="p-4 space-y-4">
           {/* Search Header */}
           <div className="flex items-center justify-between">
               <div className="flex items-center gap-2 text-lg font-bold text-primary-900">
                   <Search size={20} />
                   <h3>Opciones de búsqueda</h3>
               </div>
               <button>
                   <span className="text-2xl font-bold">^</span> 
               </button>
           </div>

           {/* Search Inputs */}
           <div className="flex gap-2">
               <input 
                 type="text" 
                 placeholder="Buscar profesionales" 
                 className="flex-1 border border-primary-900 rounded-lg px-4 py-3 text-sm focus:outline-none"
               />
               <button className="bg-primary-900 text-white rounded-lg px-4 py-2 flex flex-col items-center justify-center text-xs min-w-[70px]">
                   <Search size={18} />
                   Buscar
               </button>
           </div>
           
           <div className="relative border-b border-primary-900 pb-1">
               <label className="text-xs text-gray-500 block">Especialidad</label>
               <div className="flex items-center justify-between">
                   <span className="text-gray-800 text-sm">Cardiologia</span>
                   <div className="flex items-center gap-2">
                       <X size={16} className="text-gray-500" />
                       <span className="text-xs">▼</span>
                   </div>
               </div>
           </div>

           {!isLoading && (
               <p className="text-sm font-medium text-gray-800">Se encontraron ({DOCTORS.length}) Resultados</p>
           )}

           {/* Results List */}
           <div className="space-y-3">
               {isLoading ? (
                   Array.from({ length: 4 }).map((_, i) => (
                       <div key={i} className="bg-gray-100 rounded-lg p-4 relative space-y-2">
                           <Skeleton variant="text" width="60%" height={16} />
                           <Skeleton variant="text" width="80%" height={12} />
                           <Skeleton variant="text" width="40%" height={12} />
                           <div className="flex justify-between items-center mt-2">
                               <Skeleton variant="rounded" width={80} height={20} />
                               <Skeleton variant="circular" width={32} height={32} />
                           </div>
                       </div>
                   ))
               ) : (
                   DOCTORS.map(doc => (
                       <div key={doc.id} className="bg-gray-100 rounded-lg p-4 relative">
                           <h4 className="font-bold text-gray-900 text-sm">{doc.name}</h4>
                           <p className="text-xs text-gray-500 mt-1">{doc.location}</p>
                           <p className="text-xs text-primary-800 mt-1 font-medium">+595212365636</p>
                           
                           <div className="mt-3 flex items-center justify-between">
                               <span className="bg-gray-300 text-gray-600 text-[10px] px-3 py-1 rounded-full uppercase font-medium">
                                   {doc.specialty}
                               </span>
                               <button className="h-8 w-8 bg-primary-900 rounded-full flex items-center justify-center text-white shadow-lg">
                                   <Phone size={14} />
                               </button>
                           </div>
                       </div>
                   ))
               )}
           </div>
       </div>

       {/* Fixed Bottom Button */}
       <div className="fixed bottom-[85px] left-0 right-0 mx-auto max-w-md p-4 bg-white border-t border-gray-100 z-40 shadow-sm">
            <Button fullWidth disabled={isLoading}>
               CARGAR MAS
            </Button>
       </div>
    </div>
  );
};

export default MedicalGuideScreen;
