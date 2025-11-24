
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_MENU_ITEMS } from '../../constants';
import { LucideIcon, Shield, Users, Stethoscope, MapPin, Calendar, FileText, Activity, CreditCard, Gift, Camera } from 'lucide-react';
import Skeleton from '../../components/ui/Skeleton';
import { useLoading } from '../../hooks/useLoading';

// Map string names to actual components
const iconMap: Record<string, LucideIcon> = {
  Shield, Users, Stethoscope, MapPin, Calendar, FileText, Activity, CreditCard, Gift, Camera
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const isLoading = useLoading('dashboard', 1500);

  return (
    <div className="p-4 space-y-4">
      {/* Greeting Header */}
      <div className="py-2">
         {isLoading ? (
           <div className="space-y-2">
             <Skeleton variant="text" width="60%" height={20} />
             <Skeleton variant="text" width="80%" height={28} />
           </div>
         ) : (
           <h2 className="text-primary-900 text-lg font-medium leading-snug">
             Hola, Jose Luis Fernando <span className="font-bold">¿En qué podemos ayudarte?</span>
           </h2>
         )}
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-2 gap-4">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={112} />
          ))
        ) : (
          HOME_MENU_ITEMS.map((item) => {
            const Icon = iconMap[item.iconName] || Shield;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.route)}
                className="flex flex-col items-center justify-center p-4 bg-[#F3F4F6] rounded-xl hover:bg-gray-200 active:scale-[0.98] transition-all duration-200 h-28"
              >
                <div className="mb-2 text-primary-900">
                   <div className={`p-2 rounded-lg ${item.color.split(' ')[1]} bg-white border border-gray-100`}>
                      <Icon size={24} strokeWidth={1.5} />
                   </div>
                </div>
                <span className="text-xs font-medium text-gray-600 text-center leading-tight px-2">
                  {item.label}
                </span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Dashboard;
