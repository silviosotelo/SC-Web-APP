import React from 'react';
import { INVOICES } from '../../constants';
import { FileText, CheckCircle, Circle, RefreshCw } from 'lucide-react';

const InvoicesScreen: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-full p-4 pb-20">
        <h4 className="font-bold text-sm text-gray-800 mb-4">Se encontraron {INVOICES.length} transacciones</h4>

        <div className="space-y-4">
            {INVOICES.map((inv, index) => (
                <div 
                   key={inv.id} 
                   className={`bg-white rounded-2xl p-4 shadow-sm border ${inv.pending ? 'border-yellow-400 ring-1 ring-yellow-400' : 'border-gray-100'}`}
                >
                    {inv.pending && (
                        <div className="bg-orange-50 text-orange-500 text-xs font-bold px-3 py-2 rounded-lg mb-3 flex items-center gap-2">
                            <span>!</span> Próximo vencimiento
                        </div>
                    )}

                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-2xl ${inv.pending ? 'bg-orange-400' : 'bg-green-500'} text-white`}>
                            {inv.pending ? <FileText size={24} /> : <CheckCircle size={24} />}
                        </div>
                        <div className="flex-1">
                            <h5 className="font-bold text-gray-900 text-sm">Nro: {inv.id}</h5>
                            <p className="text-gray-500 text-xs mt-1">Fecha Emisión: {inv.date}</p>
                            
                            <div className="flex items-center justify-between mt-3">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${inv.pending ? 'bg-orange-100 text-orange-500' : 'bg-green-100 text-green-600'}`}>
                                    {inv.status}
                                </span>
                                <span className={`text-sm font-bold ${inv.pending ? 'text-orange-500' : 'text-green-600'}`}>
                                    Saldo: {inv.amount}
                                </span>
                            </div>
                        </div>
                        <div>
                            <Circle className="text-gray-300" size={24} />
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Floating Refresh Button */}
        <button className="fixed bottom-24 right-4 bg-primary-900 text-white h-14 w-14 rounded-2xl shadow-xl flex items-center justify-center z-40 hover:bg-primary-800 transition-colors">
            <RefreshCw size={24} />
        </button>
    </div>
  );
};

export default InvoicesScreen;