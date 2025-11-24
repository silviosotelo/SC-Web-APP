
import React from 'react';
import { Check, X, AlertTriangle, Info } from 'lucide-react';
import Button from './Button';

export type StatusType = 'success' | 'error' | 'warning' | 'info';

interface StatusFeedbackProps {
  type: StatusType;
  title: string;
  message: string;
  primaryActionLabel: string;
  onPrimaryAction: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

const StatusFeedback: React.FC<StatusFeedbackProps> = ({
  type,
  title,
  message,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction
}) => {
  
  const config = {
    success: {
      icon: Check,
      color: 'text-green-600',
      bg: 'bg-green-100',
      borderColor: 'border-green-200'
    },
    error: {
      icon: X,
      color: 'text-red-600',
      bg: 'bg-red-100',
      borderColor: 'border-red-200'
    },
    warning: {
      icon: AlertTriangle,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      borderColor: 'border-orange-200'
    },
    info: {
      icon: Info,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      borderColor: 'border-blue-200'
    }
  };

  const style = config[type];
  const Icon = style.icon;

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] p-6 text-center animate-fadeIn">
      <div className={`h-24 w-24 rounded-full flex items-center justify-center mb-6 shadow-lg ${style.bg} ${style.color} border-4 ${style.borderColor} relative`}>
         {/* Pulse effect for success/error */}
         <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${style.bg}`}></div>
         <Icon size={48} strokeWidth={3} className="relative z-10" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
      <p className="text-gray-600 mb-8 max-w-xs mx-auto leading-relaxed">
        {message}
      </p>
      
      <div className="w-full space-y-3 max-w-xs mx-auto">
        <Button fullWidth onClick={onPrimaryAction}>
          {primaryActionLabel}
        </Button>
        
        {secondaryActionLabel && onSecondaryAction && (
          <Button fullWidth variant="outline" onClick={onSecondaryAction}>
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default StatusFeedback;
