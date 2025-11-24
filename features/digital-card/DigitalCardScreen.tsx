
import React, { useState } from 'react';
import { FAMILY_MEMBERS } from '../../constants';
import { FamilyMember } from '../../types';
import BeneficiaryCard from '../../components/ui/BeneficiaryCard';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import { QrCode, Download, Share2, ChevronLeft, Shield, Eye } from 'lucide-react';
import { useLoading } from '../../hooks/useLoading';

const DigitalCardScreen: React.FC = () => {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [viewingMember, setViewingMember] = useState<FamilyMember | null>(null);
  
  // Use cached loading for the list
  const isLoading = useLoading('digital-card-list', 1000);

  const handleViewCard = () => {
    const member = FAMILY_MEMBERS.find(m => m.id === selectedMemberId);
    if (member) {
      setViewingMember(member);
    }
  };

  // VISTA DETALLE DEL CARNET
  if (viewingMember) {
    return (
      <div className="p-4 space-y-6 pb-24 animate-fadeIn">
        {/* Internal Navigation */}
        <button 
          onClick={() => setViewingMember(null)}
          className="flex items-center gap-2 text-primary-900 font-bold mb-4"
        >
           <ChevronLeft size={20} />
           <span>Volver a la lista</span>
        </button>

        <h2 className="text-lg font-bold text-gray-800">Carnet Digital</h2>

        {/* THE CARD */}
        <div className="relative w-full aspect-[1.58/1] bg-primary-900 rounded-2xl shadow-xl overflow-hidden p-6 text-white flex flex-col justify-between">
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>

            {/* Card Header */}
            <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-teal-400 rounded-tr-lg rounded-bl-lg"></div>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg leading-none">Santa Clara</span>
                        <span className="text-[10px] tracking-widest uppercase opacity-80">Medicina Prepaga</span>
                    </div>
                </div>
                <div className="bg-teal-500/20 border border-teal-500/50 px-2 py-1 rounded text-[10px] font-bold text-teal-300">
                    ACTIVO
                </div>
            </div>

            {/* Card Body */}
            <div className="relative z-10 flex justify-between items-end">
                <div>
                    <p className="text-[10px] text-white/60 uppercase tracking-wider mb-1">Afiliado</p>
                    <h3 className="font-bold text-lg leading-tight mb-4">{viewingMember.name}</h3>
                    
                    <div className="flex gap-6">
                        <div>
                            <p className="text-[10px] text-white/60 uppercase tracking-wider mb-0.5">Nro. Cédula</p>
                            <p className="font-mono font-medium">{viewingMember.documentId}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-white/60 uppercase tracking-wider mb-0.5">Nro. Cliente</p>
                            <p className="font-mono font-medium">{viewingMember.clientNumber}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Plan Details & QR */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                 <div className="bg-primary-50 p-3 rounded-full text-primary-900">
                    <Shield size={24} />
                 </div>
                 <div>
                    <p className="text-xs text-gray-500">Plan contratado</p>
                    <p className="font-bold text-primary-900">SANTA CLARA SUPERIOR</p>
                 </div>
            </div>

            <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="bg-white p-2 rounded-xl border-2 border-dashed border-gray-200">
                    {/* Simulated QR Code */}
                    <div className="bg-gray-900 h-40 w-40 rounded-lg flex items-center justify-center text-white">
                        <QrCode size={80} />
                    </div>
                </div>
                <p className="text-xs text-gray-400 max-w-[200px]">
                    Escanea este código QR en los centros autorizados para validar tu cobertura.
                </p>
            </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
                <Download size={18} /> Descargar
            </Button>
            <Button variant="primary" className="flex items-center gap-2">
                <Share2 size={18} /> Compartir
            </Button>
        </div>
    </div>
    );
  }

  // VISTA LISTA DE SELECCIÓN
  return (
    <div className="p-4 space-y-6 pb-32">
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-gray-800">Grupo Familiar</h2>
        <p className="text-sm text-gray-500">Seleccione un miembro para ver su carnet digital.</p>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl">
                <Skeleton variant="circular" width={48} height={48} />
                <div className="flex-1 space-y-2">
                    <Skeleton variant="text" width="70%" height={16} />
                    <Skeleton variant="text" width="40%" height={12} />
                </div>
                <Skeleton variant="circular" width={28} height={28} />
            </div>
          ))
        ) : (
          FAMILY_MEMBERS.map((member) => (
            <BeneficiaryCard 
              key={member.id} 
              member={member}
              isSelected={selectedMemberId === member.id}
              onClick={() => setSelectedMemberId(member.id)}
              subtitle={member.lastActivation ? `Activo desde: ${member.lastActivation.split(' ')[0]}` : undefined}
            />
          ))
        )}
      </div>

      {/* Fixed Bottom Button - Action Pattern */}
      <div className="fixed bottom-[85px] left-0 right-0 mx-auto max-w-md p-4 bg-white border-t border-gray-100 z-40 shadow-sm">
        <Button 
            fullWidth 
            disabled={!selectedMemberId || isLoading}
            onClick={handleViewCard}
        >
            <div className="flex items-center justify-center gap-2">
                <Eye size={20} />
                VER CARNET
            </div>
        </Button>
      </div>
    </div>
  );
};

export default DigitalCardScreen;
