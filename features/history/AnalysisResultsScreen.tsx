
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ANALYSIS_RESULTS } from '../../constants';
import { Activity, FileText, Eye } from 'lucide-react';
import Button from '../../components/ui/Button';
import SelectionCard from '../../components/ui/SelectionCard';
import Skeleton from '../../components/ui/Skeleton';
import { useLoading } from '../../hooks/useLoading';

const AnalysisResultsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const isLoading = useLoading('analysis-results', 1000);

  const handleView = () => {
    if (selectedId) {
        navigate('/history/detail');
    }
  };

  return (
    <div className="pb-32 animate-fadeIn bg-gray-50 min-h-full">
        {/* Header Count */}
        <div className="bg-white px-6 py-4 border-b border-gray-100 mb-4 shadow-sm">
            {isLoading ? (
                <Skeleton variant="text" width={150} height={16} />
            ) : (
                <p className="text-sm font-bold text-gray-800">Se encontraron ({ANALYSIS_RESULTS.length}) Resultados</p>
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
                ANALYSIS_RESULTS.map((result) => (
                    <SelectionCard
                        key={result.id}
                        title={result.date}
                        subtitle={`Origen: ${result.origin}`}
                        icon={<Activity size={20} />}
                        isSelected={selectedId === result.id}
                        onClick={() => setSelectedId(result.id)}
                        rightElement={
                            <div className="bg-red-100 p-1.5 rounded-lg text-red-600">
                                <FileText size={16} />
                            </div>
                        }
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
                    <Eye size={20} />
                    VER ANÁLISIS
                </div>
             </Button>
        </div>
    </div>
  );
};

export default AnalysisResultsScreen;
