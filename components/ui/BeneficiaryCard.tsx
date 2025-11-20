import React from 'react';
import { FamilyMember } from '../../types';
import { User, Check } from 'lucide-react';

interface BeneficiaryCardProps {
  member: FamilyMember;
  isSelected?: boolean;
  onClick?: () => void;
  showStatus?: boolean; // For Digital Card (shows "Active since...")
  variant?: 'display' | 'selection'; // 'display' for Carnet, 'selection' for Booking
}

const BeneficiaryCard: React.FC<BeneficiaryCardProps> = ({ 
  member, 
  isSelected = false, 
  onClick, 
  showStatus = false,
  variant = 'display'
}) => {
  const isSelectionMode = variant === 'selection';
  
  // Determine Active/Selected state visualization
  // In Selection Mode: active if isSelected is true
  // In Display Mode: active if member.status === 'active'
  const isActive = isSelectionMode ? isSelected : member.status === 'active';

  // Container Styles
  // selection mode uses background color when selected.
  // display mode stays white but maintains border consistency.
  const containerClasses = isSelectionMode && isActive
    ? 'bg-secondary-50 border-secondary-500 ring-1 ring-secondary-500' 
    : 'bg-white border-gray-100 shadow-sm hover:border-gray-200';

  return (
    <div 
      onClick={onClick}
      className={`
        relative p-4 rounded-2xl border flex items-center gap-4 transition-all duration-200
        ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}
        ${containerClasses}
      `}
    >
      {/* Avatar */}
      <div className={`
        h-12 w-12 rounded-full flex items-center justify-center border-2 shrink-0
        ${isActive ? 'bg-secondary-100 text-secondary-700 border-secondary-200' : 'bg-primary-50 text-primary-700 border-primary-100'}
      `}>
        <User size={24} />
      </div>

      {/* Info Column */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-bold text-sm truncate ${isActive && isSelectionMode ? 'text-secondary-900' : 'text-gray-900'}`}>
          {member.name}
        </h3>
        <div className="flex flex-col gap-0.5 mt-1">
          <p className="text-xs text-gray-500 font-medium">C.I. {member.documentId}</p>
          {showStatus && member.lastActivation && (
            <p className="text-[10px] text-secondary-600 flex items-center gap-1 font-semibold">
              Activo desde: {member.lastActivation.split(' ')[0]}
            </p>
          )}
        </div>
      </div>

      {/* Right Action/Status Icon - UNIFIED STYLE */}
      <div className="shrink-0">
        <div className={`
             h-7 w-7 rounded-full flex items-center justify-center transition-colors
             ${isActive ? 'bg-secondary-500 text-white shadow-sm' : 'bg-gray-100 text-gray-300'}
           `}>
             <Check size={16} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryCard;