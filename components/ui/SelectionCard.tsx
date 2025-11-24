import React from 'react';
import { Check, LucideIcon } from 'lucide-react';

interface SelectionCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  rightElement?: React.ReactNode; // Para badges o iconos extra (ej: PDF)
}

const SelectionCard: React.FC<SelectionCardProps> = ({ 
  title, 
  subtitle, 
  icon,
  isSelected = false, 
  onClick, 
  disabled = false,
  rightElement
}) => {
  // Estilos idénticos a BeneficiaryCard para consistencia
  const containerBase = "relative p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 w-full text-left";
  
  const stateStyles = disabled 
    ? "bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed"
    : isSelected
      ? "bg-secondary-50 border-secondary-500 ring-0 shadow-md" // Verde seleccionado
      : "bg-white border-gray-100 hover:border-gray-200 cursor-pointer active:scale-[0.99] shadow-sm"; // Normal

  return (
    <button 
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${containerBase} ${stateStyles}`}
    >
      {/* Icon Container */}
      <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 border transition-colors ${isSelected ? 'bg-secondary-100 border-secondary-200 text-secondary-700' : 'bg-gray-50 border-gray-100 text-primary-900'}`}>
        {icon}
      </div>

      {/* Info Column */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-bold text-sm truncate ${isSelected ? 'text-secondary-900' : 'text-gray-900'}`}>
          {title}
        </h3>
        {subtitle && (
           <p className="text-xs text-gray-500 font-medium mt-0.5">
             {subtitle}
           </p>
        )}
      </div>

      {/* Right Side: Extra Element (PDF icon) + Selection Check */}
      <div className="shrink-0 flex items-center gap-3">
        {rightElement && (
            <div className="opacity-80">
                {rightElement}
            </div>
        )}

        <div className={`
             h-6 w-6 rounded-full flex items-center justify-center transition-all duration-200
             ${isSelected 
                ? 'bg-secondary-500 text-white scale-100 shadow-sm' 
                : 'bg-gray-100 text-gray-300 scale-90'}
           `}>
             <Check size={14} strokeWidth={3} />
        </div>
      </div>
    </button>
  );
};

export default SelectionCard;