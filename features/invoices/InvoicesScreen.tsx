
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INVOICES } from '../../constants';
import { FileText, CheckCircle, CreditCard, Check } from 'lucide-react';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import { useLoading } from '../../hooks/useLoading';

const InvoicesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const isLoading = useLoading('invoices', 1000);

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
        setSelectedIds(prev => prev.filter(i => i !== id));
    } else {
        setSelectedIds(prev => [...prev, id]);
    }
  };

  // Calculate total
  const total = selectedIds.reduce((acc, id) => {
      const inv = INVOICES.find(i => i.id === id);
      return acc + (inv?.rawValue || 0);
  }, 0);

  return (
    <div className="bg-gray-50 min-h-full p-4 pb-32 animate-fadeIn">
        {!isLoading && (
            <h4 className="font-bold text-sm text-gray-800 mb-4">Se encontraron {INVOICES.length} transacciones</h4>
        )}

        <div className="space-y-3">
            {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
                        <Skeleton variant="circular" width={48} height={48} />
                        <div className="flex-1 space-y-2">
                            <Skeleton variant="text" width="50%" height={14} />
                            <Skeleton variant="text" width="30%" height={12} />
                            <Skeleton variant="text" width="40%" height={14} />
                        </div>
                    </div>
                ))
            ) : (
                INVOICES.map((inv) => {
                    const isSelected = selectedIds.includes(inv.id);
                    // Only pending invoices can be selected
                    const isSelectable = inv.pending;

                    return (
                    <div 
                       key={inv.id} 
                       onClick={() => isSelectable && handleToggle(inv.id)}
                       className={`
                         bg-white rounded-2xl p-4 border-2 transition-all duration-200 flex items-center gap-4
                         ${isSelected 
                            ? 'border-secondary-500 bg-secondary-50' // Standard Teal Selection
                            : 'border-gray-100 hover:border-gray-200'} 
                         ${isSelectable ? 'cursor-pointer active:scale-[0.98]' : 'opacity-60 cursor-not-allowed'}
                       `}
                    >
                        {/* Icon */}
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 border transition-colors ${inv.pending ? 'bg-orange-50 border-orange-100 text-orange-500' : 'bg-green-50 border-green-100 text-green-600'}`}>
                            {inv.pending ? <FileText size={24} /> : <CheckCircle size={24} />}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <h5 className="font-bold text-gray-900 text-sm truncate">Nro: {inv.id}</h5>
                                {inv.pending && (
                                    <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-bold whitespace-nowrap ml-2">
                                        PENDIENTE
                                    </span>
                                )}
                            </div>
                            
                            <p className="text-gray-500 text-xs">{inv.date}</p>
                            
                            <div className="mt-2 flex items-center gap-2">
                                <span className={`text-sm font-bold ${inv.pending ? 'text-gray-900' : 'text-green-600'}`}>
                                    ₲ {inv.amount}
                                </span>
                                {!inv.pending && <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">PAGADO</span>}
                            </div>
                        </div>
                        
                        {/* Checkbox (Standardized) */}
                        {isSelectable && (
                            <div className={`
                                h-6 w-6 rounded-full flex items-center justify-center transition-all shrink-0
                                ${isSelected 
                                    ? 'bg-secondary-500 text-white scale-100 shadow-sm' 
                                    : 'bg-gray-100 text-gray-300 scale-90'}
                            `}>
                                <Check size={14} strokeWidth={3} />
                            </div>
                        )}
                    </div>
                )})
            )}
        </div>

        {/* Fixed Bottom Button Bar */}
        <div className="fixed bottom-[85px] left-0 right-0 mx-auto max-w-md p-4 bg-white border-t border-gray-100 z-40 shadow-sm">
             {selectedIds.length > 0 ? (
                 <Button fullWidth onClick={() => navigate('/payment')}>
                    <div className="flex items-center justify-center gap-2">
                        <CreditCard size={18} />
                        PAGAR ₲ {total.toLocaleString()}
                    </div>
                 </Button>
             ) : (
                 <div className="text-center text-xs text-gray-500 font-medium py-2">
                     Selecciona una factura pendiente para pagar
                 </div>
             )}
        </div>
    </div>
  );
};

export default InvoicesScreen;
