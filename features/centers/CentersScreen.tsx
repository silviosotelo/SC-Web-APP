import React, { useState } from 'react';
import { CENTER_TYPES, MEDICAL_CENTERS } from '../../constants';
import { LucideIcon, Ambulance, Hospital, Activity, FlaskConical as Flask, Stethoscope, Search, X, Phone, MapPin } from 'lucide-react';
import Button from '../../components/ui/Button';
import ViewToggle from '../../components/ui/ViewToggle';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Ambulance, Hospital, Activity, Flask, Stethoscope
};

const CentersScreen: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [view, setView] = useState<'list' | 'map'>('list');

  // If no type selected, show category list
  if (!selectedType) {
      return (
          <div className="p-4 space-y-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Tipos de Centros</h3>
              <div className="space-y-3">
                  {CENTER_TYPES.map(type => {
                      const Icon = iconMap[type.iconName] || Activity;
                      return (
                          <button 
                            key={type.id}
                            onClick={() => setSelectedType(type.id)}
                            className="w-full bg-gray-100 hover:bg-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-colors"
                          >
                              <div className="text-primary-900 p-2 border border-primary-900/20 rounded-lg">
                                  <Icon size={32} strokeWidth={1.5} />
                              </div>
                              <span className="text-gray-600 font-medium text-sm">{type.label}</span>
                          </button>
                      );
                  })}
              </div>
          </div>
      )
  }

  // Detail View
  const filteredCenters = MEDICAL_CENTERS.filter(c => c.type === selectedType || selectedType === 'sanatorios');

  return (
    <div className="bg-gray-50 min-h-full pb-20 relative">
       {/* Reusable View Toggle */}
       <ViewToggle view={view} setView={setView} />

       {view === 'map' ? (
           <div className="h-[600px] bg-gray-200 relative overflow-hidden">
               {/* Simulated Map */}
               <div className="absolute inset-0 opacity-50 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Map_of_Asunci%C3%B3n.png')] bg-cover bg-center"></div>
               
               {/* Markers */}
               {filteredCenters.map((center, i) => (
                   <div key={center.id} className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ top: `${40 + (i*10)}%`, left: `${40 + (i*15)}%` }}>
                       <MapPin className="text-primary-900 fill-primary-900" size={32} />
                       <div className="bg-white text-[8px] p-1 rounded shadow font-bold absolute -bottom-8 w-24 text-center">{center.name}</div>
                   </div>
               ))}

               <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-lg">
                    <h4 className="font-bold text-xs">SANATORIO ITALIANO</h4>
               </div>
           </div>
       ) : (
        <div className="p-4 space-y-4">
            {/* Search Box */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-lg font-bold text-primary-900">
                    <Search size={20} />
                    <h3>Opciones de búsqueda</h3>
                </div>

                <div className="flex gap-2">
                    <input 
                        type="text" 
                        placeholder="Buscar centros de atención" 
                        className="flex-1 border border-primary-900 rounded-lg px-4 py-3 text-sm focus:outline-none"
                    />
                    <button className="bg-primary-900 text-white rounded-lg px-4 py-2 flex flex-col items-center justify-center text-xs min-w-[70px]">
                        <Search size={18} />
                        Buscar
                    </button>
                </div>
                
                <div className="relative border-b border-primary-900 pb-1">
                    <label className="text-xs text-gray-500 block">Tipos Centros</label>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-800 text-sm">
                            {CENTER_TYPES.find(t => t.id === selectedType)?.label}
                        </span>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setSelectedType(null)}><X size={16} className="text-gray-500" /></button>
                            <span className="text-xs">▼</span>
                        </div>
                    </div>
                </div>

                <p className="text-sm font-medium text-gray-800">Se encontraron ({filteredCenters.length}) Resultados</p>
            </div>

            {/* List */}
            <div className="space-y-3">
                {filteredCenters.map(center => (
                    <div key={center.id} className="bg-gray-100 rounded-lg p-4 relative">
                        <h4 className="font-bold text-gray-900 text-sm uppercase">{center.name}</h4>
                        <p className="text-xs text-gray-500 mt-1 uppercase">{center.address}</p>
                        <p className="text-xs text-primary-800 mt-1 font-medium">{center.phone}</p>
                        
                        {center.notes && (
                            <div className="mt-2">
                                <p className="text-[10px] text-red-500 font-bold uppercase">*Obs.: {center.notes}</p>
                                <p className="text-[10px] text-red-400 uppercase">NO CUBRE TOMOSINTESIS</p>
                            </div>
                        )}

                        <div className="mt-3">
                             <button className="bg-primary-900 text-white text-[10px] px-4 py-1.5 rounded-full font-medium">
                                 Ver más
                             </button>
                        </div>

                        <div className="absolute bottom-4 right-4 flex gap-2">
                            <button className="h-8 w-8 bg-primary-900 rounded-full flex items-center justify-center text-white shadow-lg">
                                <Phone size={14} />
                            </button>
                            <button className="h-8 w-8 bg-yellow-400 rounded-full flex items-center justify-center text-primary-900 shadow-lg">
                                <MapPin size={14} />
                            </button>
                        </div>

                        <div className="mt-2">
                             <span className="bg-gray-300 text-gray-600 text-[9px] px-3 py-1 rounded-full uppercase font-bold">
                                 {selectedType?.toUpperCase()}
                             </span>
                        </div>
                    </div>
                ))}
            </div>

            <Button fullWidth className="mt-4 bg-primary-900 text-white rounded-full py-3 text-xs uppercase tracking-wider">
               CARGAR MAS
           </Button>
        </div>
       )}
    </div>
  );
};

export default CentersScreen;