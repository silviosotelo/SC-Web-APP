import React from 'react';
import { List, Map } from 'lucide-react';

interface ViewToggleProps {
    view: 'list' | 'map';
    setView: (view: 'list' | 'map') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => {
  return (
    <div className="absolute -top-[4.5rem] right-4 flex gap-2 z-10">
        <button 
          onClick={() => setView('list')}
          className={`flex flex-col items-center justify-center h-10 w-10 rounded-lg text-[10px] font-medium shadow-md transition-all duration-200 active:scale-95 ${view === 'list' ? 'bg-primary-900 text-white' : 'bg-secondary-400 text-white'}`}
        >
            <List size={18} />
            <span>Lista</span>
        </button>
        <button 
          onClick={() => setView('map')}
          className={`flex flex-col items-center justify-center h-10 w-10 rounded-lg text-[10px] font-medium shadow-md transition-all duration-200 active:scale-95 ${view === 'map' ? 'bg-primary-900 text-white' : 'bg-secondary-400 text-white'}`}
        >
            <Map size={18} />
            <span>Mapa</span>
        </button>
    </div>
  );
};

export default ViewToggle;