
import React from 'react';
import { MY_REQUESTS } from '../../constants';
import { FileText, Clock } from 'lucide-react';

const MyRequestsListScreen: React.FC = () => {
  const getStatusColor = (status: string) => {
      switch(status) {
          case 'approved': return 'bg-green-100 text-green-700 border-green-200';
          case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
          default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      }
  };

  const getStatusLabel = (status: string) => {
      switch(status) {
          case 'approved': return 'APROBADO';
          case 'rejected': return 'RECHAZADO';
          default: return 'PENDIENTE';
      }
  };

  return (
    <div className="bg-gray-50 min-h-full p-4 animate-fadeIn">
        <div className="space-y-3">
            {MY_REQUESTS.map(req => (
                <div key={req.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary-50 p-1.5 rounded text-primary-900">
                                <FileText size={18} />
                            </div>
                            <span className="font-bold text-gray-900 text-sm">{req.type}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded border ${getStatusColor(req.status)}`}>
                            {getStatusLabel(req.status)}
                        </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 pl-8">{req.description}</p>
                    
                    <div className="pl-8 flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={12} />
                        <span>{req.date}</span>
                        <span className="mx-1">•</span>
                        <span>ID: {req.id}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default MyRequestsListScreen;
