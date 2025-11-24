
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Image as ImageIcon, FolderOpen } from 'lucide-react';
import Button from '../../components/ui/Button';
import SelectionCard from '../../components/ui/SelectionCard';
import Skeleton from '../../components/ui/Skeleton';
import { useLoading } from '../../hooks/useLoading';

const MyStudiesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const isLoading = useLoading('my-studies', 1000);

  // Mock Data for uploaded studies
  const studies = [
    { id: 1, name: 'Radiografía de Tórax', date: '15/08/2025', type: 'image' },
    { id: 2, name: 'Informe Médico General', date: '10/07/2025', type: 'doc' },
    { id: 3, name: 'Ecografía Abdominal', date: '22/06/2025', type: 'image' },
  ];

  const handleView = () => {
      if (selectedId) {
          navigate('/history/study-detail');
      }
  };

  return (
    <div className="pb-32 animate-fadeIn bg-gray-50 min-h-full">
        {/* Header Count */}
        <div className="bg-white px-6 py-4 border-b border-gray-100 mb-4 shadow-sm">
            {isLoading ? (
                 <Skeleton variant="text" width={150} height={16} />
            ) : (
                 <p className="text-sm font-bold text-gray-800">Se encontraron ({studies.length}) Estudios</p>
            )}
        </div>

        {/* List */}
        <div className="px-4 space-y-3">
            {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                        <Skeleton variant="circular" width={48} height={48} />
                        <div className="flex-1 space-y-2">
                            <Skeleton variant="text" width="60%" height={16} />
                            <Skeleton variant="text" width="40%" height={12} />
                        </div>
                        <Skeleton variant="circular" width={24} height={24} />
                    </div>
                ))
            ) : (
                studies.map((study) => (
                    <SelectionCard
                        key={study.id}
                        title={study.name}
                        subtitle={study.date}
                        icon={study.type === 'image' ? <ImageIcon size={20} /> : <FileText size={20} />}
                        isSelected={selectedId === study.id}
                        onClick={() => setSelectedId(study.id)}
                    />
                ))
            )}
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-[85px] left-0 right-0 mx-auto max-w-md p-4 bg-white border-t border-gray-100 z-40 shadow-sm">
             <Button 
               fullWidth 
               disabled={!selectedId || isLoading}
               onClick={handleView}
             >
                <div className="flex items-center justify-center gap-2">
                    <FolderOpen size={20} />
                    VER ESTUDIO
                </div>
             </Button>
        </div>
    </div>
  );
};

export default MyStudiesScreen;
