import React from 'react';
import { User, Check } from 'lucide-react';
import { FamilyMember } from '../../types';

interface BeneficiaryCardProps {
  member: FamilyMember;
  isSelected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  subtitle?: string; // Texto adicional opcional (ej: "Activo desde...")
  showCheck?: boolean; // Forzar mostrar el check aunque no esté seleccionado (para listas informativas)
  badges?: React.ReactNode; // New prop for custom status badges
}

const BeneficiaryCard: React.FC<BeneficiaryCardProps> = ({ 
  member, 
  isSelected = false, 
  onClick, 
  disabled = false,
  subtitle,
  showCheck = true,
  badges
}) => {
  // Estilos dinámicos basados en selección y estado
  const containerBase = "relative p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 w-full text-left";
  
  const stateStyles = disabled 
    ? "bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed"
    : isSelected
      ? "bg-secondary-50 border-secondary-500 ring-0" // Estilo 'Verde' seleccionado
      : "bg-white border-gray-100 hover:border-gray-200 cursor-pointer active:scale-[0.99]"; // Estilo Normal

  const avatarBase = "h-12 w-12 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors";
  const avatarStyles = isSelected 
    ? "bg-secondary-100 text-secondary-700 border-secondary-200" 
    : "bg-primary-50 text-primary-700 border-primary-100";

  return (
    <button 
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${containerBase} ${stateStyles}`}
    >
      {/* Avatar */}
      <div className={`${avatarBase} ${avatarStyles}`}>
        <User size={24} strokeWidth={2} />
      </div>

      {/* Info Column */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-bold text-sm truncate ${isSelected ? 'text-secondary-900' : 'text-gray-900'}`}>
          {member.name}
        </h3>
        <div className="flex flex-col gap-0.5 mt-1">
          <p className="text-xs text-gray-500 font-medium">C.I. {member.documentId}</p>
          {/* Subtítulo opcional (ej: fechas, relación) */}
          {(subtitle || member.relation) && (
             <p className="text-[11px] text-gray-400 font-medium">
               {subtitle || member.relation}
             </p>
          )}
          {/* Custom Badges */}
          {badges && <div className="mt-1 flex flex-wrap gap-1">{badges}</div>}
        </div>
      </div>

      {/* Selection/Status Indicator */}
      {showCheck && (
        <div className="shrink-0">
          <div className={`
               h-7 w-7 rounded-full flex items-center justify-center transition-all duration-200
               ${isSelected 
                  ? 'bg-secondary-500 text-white shadow-sm scale-100' 
                  : 'bg-gray-100 text-gray-300 scale-90'}
             `}>
               <Check size={16} strokeWidth={3} />
          </div>
        </div>
      )}
    </button>
  );
};

export default BeneficiaryCard;